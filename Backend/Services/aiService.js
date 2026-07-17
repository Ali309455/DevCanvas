import { GoogleGenAI } from '@google/genai';
import { configDotenv } from 'dotenv';
import { SYSTEM_INSTRUCTIONS, PROMPT_TEMPLATES } from '../Prompts/readersprompt.js';

configDotenv();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "FATAL: GEMINI_API_KEY is not defined in your environment variables. " +
    "Check that your .env file exists and dotenv is initialized at the top of your entry file."
  );
}

// Explicitly configure the client with the validated API key
const ai = new GoogleGenAI({ apiKey });

// Production Model Hierarchy to survive 503 Overloads
const PRIMARY_MODEL = 'gemini-3.5-flash';
const FALLBACK_MODEL = 'gemini-3.1-flash-lite'; // Highly available, ultra-fast workhorse

/**
 * Clean wrapper that attempts to call the primary model first.
 * If Google throws a 503 (or mentions "high demand"), it seamlessly retries using the fallback model.
 */
const executeWithFallback = async (formattedPrompt, systemInstruction, customConfig = {}) => {
  try {
    // 1. Try Primary Model
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: formattedPrompt,
      config: {
        systemInstruction,
        ...customConfig
      }
    });
    return response.text;
  } catch (primaryError) {
    const isServiceUnavailable = primaryError.status === 503 || 
                                 primaryError.message?.includes('503') || 
                                 primaryError.message?.includes('high demand');

    if (isServiceUnavailable) {
      console.warn(`[AI Warning] ${PRIMARY_MODEL} is currently overloaded. Falling back to ${FALLBACK_MODEL}...`);
      
      try {
        // 2. Try Fallback Model
        const fallbackResponse = await ai.models.generateContent({
          model: FALLBACK_MODEL,
          contents: formattedPrompt,
          config: {
            systemInstruction,
            ...customConfig
          }
        });
        return fallbackResponse.text;
      } catch (fallbackError) {
        console.error(`[AI Fatal] Fallback model ${FALLBACK_MODEL} also failed:`, fallbackError);
        throw fallbackError;
      }
    }

    // Direct throw for standard errors (e.g., bad key, schema errors)
    throw primaryError;
  }
};

/**
 * Basic text completion
 */
export const generateBasicText = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error in generateBasicText:', error);
    throw new Error(`AI Service Error: ${error.message}`);
  }
};

/**
 * Summarizes an article given its title and body content.
 */
export const summarizeArticle = async (title, content) => {
  try {
    const formattedPrompt = PROMPT_TEMPLATES.SUMMARIZER(title, content);
    return await executeWithFallback(formattedPrompt, SYSTEM_INSTRUCTIONS.SUMMARIZER);
  } catch (error) {
    console.error('Error inside summarizeArticle service:', error);
    throw new Error(`Summarizer Service Failed: ${error.message}`);
  }
};

/**
 * Extracts 2-3 bullet point takeaways from an article.
 */
export const extractTakeaways = async (title, content) => {
  try {
    const formattedPrompt = PROMPT_TEMPLATES.TAKEAWAYS(title, content);
    return await executeWithFallback(formattedPrompt, SYSTEM_INSTRUCTIONS.TAKEAWAYS);
  } catch (error) {
    console.error('Error inside extractTakeaways service:', error);
    throw new Error(`Takeaways Service Failed: ${error.message}`);
  }
};

/**
 * Seamlessly continues writing a draft blog post based on what's written so far.
 */
export const continueWriting = async (title, content) => {
  try {
    const formattedPrompt = PROMPT_TEMPLATES.CONTINUE_WRITING(title, content);
    return await executeWithFallback(formattedPrompt, SYSTEM_INSTRUCTIONS.CONTINUE_WRITING);
  } catch (error) {
    console.error('Error inside continueWriting service:', error);
    throw new Error(`Auto-Write Service Failed: ${error.message}`);
  }
};

/**
 * Fixes grammar, spelling, and phrasing in the provided text.
 */
export const fixGrammar = async (content) => {
  try {
    const formattedPrompt = PROMPT_TEMPLATES.FIX_GRAMMAR(content);
    return await executeWithFallback(formattedPrompt, SYSTEM_INSTRUCTIONS.FIX_GRAMMAR);
  } catch (error) {
    console.error('Error inside fixGrammar service:', error);
    throw new Error(`Proofreader Service Failed: ${error.message}`);
  }
};

/**
 * Analyzes article draft content and returns 5 suggested titles in a clean JSON array.
 */
export const suggestTitles = async (content) => {
  try {
    const formattedPrompt = PROMPT_TEMPLATES.SUGGEST_TITLE(content);
    
    // We pass { responseMimeType: 'application/json' } to ensure the fallback model output matches
    const jsonResultString = await executeWithFallback(
      formattedPrompt, 
      SYSTEM_INSTRUCTIONS.SUGGEST_TITLE,
      { responseMimeType: 'application/json' }
    );
    
    return JSON.parse(jsonResultString);
  } catch (error) {
    console.error('Error inside suggestTitles service:', error);
    throw new Error(`Title Suggestion Service Failed: ${error.message}`);
  }
};