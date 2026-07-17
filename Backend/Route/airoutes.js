import express from 'express';
import { generateBasicText, summarizeArticle, extractTakeaways, continueWriting, fixGrammar, suggestTitles } from '../Services/aiService.js';

const airoutes = express.Router();

// POST: /api/ai/test
airoutes.post('/test', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Please provide a prompt.' });
    }

    // Call our clean service layer
    const textResult = await generateBasicText(prompt);

    res.status(200).json({
      success: true,
      text: textResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process AI request.',
      details: error.message
    });
  }
});
// POST: /api/ai/summarize
airoutes.post('/summarize', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required parameters.' });
    }

    const summary = await summarizeArticle(title, content);

    res.status(200).json({
      success: true,
      summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate article summary.',
      details: error.message
    });
  }
});
// POST: /api/ai/takeaways
airoutes.post('/takeaways', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required parameters.' });
    }

    const takeaways = await extractTakeaways(title, content);

    res.status(200).json({
      success: true,
      takeaways
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to extract key takeaways.',
      details: error.message
    });
  }
});
// POST: /api/ai/continue-writing
airoutes.post('/continue-writing', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content draft is required to continue writing.' });
    }

    const extensionText = await continueWriting(title || 'Untitled Draft', content);

    res.status(200).json({
      success: true,
      extension: extensionText
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to continue writing.',
      details: error.message
    });
  }
});
// POST: /api/ai/suggest-titles
airoutes.post('/suggest-titles', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required to generate titles.' });
    }

    const suggestedTitles = await suggestTitles(content);

    res.status(200).json({
      success: true,
      titles: suggestedTitles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate title suggestions.',
      details: error.message
    });
  }
});
// POST: /api/ai/fix-grammar
airoutes.post('/fix-grammar', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Text content is required to run grammar check.' });
    }

    const correctedText = await fixGrammar(content);

    res.status(200).json({
      success: true,
      corrected: correctedText
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to correct grammar.',
      details: error.message
    });
  }
});

export default airoutes;