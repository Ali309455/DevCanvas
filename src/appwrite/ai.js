import axios from "axios";

class AIService {
  constructor() {
    // Dynamically set baseURL (looks for Vite env variable, defaults to local port)
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAISummary(title, content) {
    if (!title || !content) {
      return { data: null, error: 'Title and content are required to generate a summary.' };
    }

    try {
      const response = await this.api.post('/api/ai/summarize', { title, content });
      return { data: response.data.summary, error: null };
    } catch (error) {
      return { data: null, error: this._parseError(error)};
    }
  
  }

  async getAITakeaways(title, content) {
    if (!title || !content) {
      return { data: null, error: 'Title and content are required to extract takeaways.' };
    }

    try {
      const response = await this.api.post('/api/ai/takeaways', { title, content });
      return { data: response.data.takeaways, error: null };
    } catch (error) {
      return { data: null, error: this._parseError(error) };
    }
  }
 
  // author Ai Services

  async continueWriting(title, content) {
    if (!content) {
      return { data: null, error: 'Content is required to continue writing.' };
    }

    try {
      const response = await this.api.post('/api/ai/continue-writing', { 
        title: title || 'Untitled Draft', 
        content 
      });
      return { data: response.data.extension, error: null };
    } catch (error) {
      return { data: null, error: this._parseError(error) };
    }
  }

  async fixGrammar(content) {
    if (!content) {
      return { data: null, error: 'Text content is required to fix grammar.' };
    }

    try {
      const response = await this.api.post('/api/ai/fix-grammar', { content });
      return { data: response.data.corrected, error: null };
    } catch (error) {
      return { data: null, error: this._parseError(error) };
    }
  }

  async suggestTitles(content) {
    if (!content) {
      return { data: null, error: 'Draft content is required to suggest titles.' };
    }

    try {
      const response = await this.api.post('/api/ai/suggest-titles', { content });
      return { data: response.data.titles, error: null };
    } catch (error) {
      return { data: null, error: this._parseError(error) };
    }
  }

  _parseError(error) {
    // 1. Check if the server responded with a custom error message (e.g. res.status(500).json({ error }))
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    // 2. Check if the server responded with details
    if (error.response?.data?.details) {
      return error.response.data.details;
    }
    // 3. Network connection issues (backend is offline)
    if (error.request && !error.response) {
      return 'Cannot connect to the backend server. Is it running?';
    }
    // 4. Fallback message
    return error.message || 'An unexpected error occurred.';
  }
}

// Export a single pre-configured instance
const aiService = new AIService();
export default aiService;
