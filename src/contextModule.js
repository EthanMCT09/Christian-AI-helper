/**
 * Context Awareness Module for FaithGPT
 * Tracks conversation history and user context for better responses
 */

export const contextModule = {
  // Store conversation context
  conversationContext: [],

  /**
   * Add user input to context
   * @param {string} userInput - The user's message
   */
  addUserContext(userInput) {
    this.conversationContext.push({
      type: 'user',
      content: userInput,
      timestamp: Date.now(),
    });

    // Keep only last 10 messages for context (memory efficiency)
    if (this.conversationContext.length > 10) {
      this.conversationContext.shift();
    }
  },

  /**
   * Add AI response to context
   * @param {string} response - The AI's response
   */
  addAssistantContext(response) {
    this.conversationContext.push({
      type: 'assistant',
      content: response,
      timestamp: Date.now(),
    });

    if (this.conversationContext.length > 10) {
      this.conversationContext.shift();
    }
  },

  /**
   * Get the last user message
   * @returns {string|null}
   */
  getLastUserMessage() {
    const userMessages = this.conversationContext.filter(msg => msg.type === 'user');
    return userMessages.length > 0 ? userMessages[userMessages.length - 1].content : null;
  },

  /**
   * Get the previous user message
   * @returns {string|null}
   */
  getPreviousUserMessage() {
    const userMessages = this.conversationContext.filter(msg => msg.type === 'user');
    return userMessages.length > 1 ? userMessages[userMessages.length - 2].content : null;
  },

  /**
   * Get full conversation context as a string
   * @returns {string}
   */
  getFullContext() {
    return this.conversationContext
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  },

  /**
   * Clear context
   */
  clearContext() {
    this.conversationContext = [];
  },

  /**
   * Check if user is asking for clarification or continuing a topic
   * @param {string} currentMessage - Current user message
   * @returns {boolean}
   */
  isFollowUp(currentMessage) {
    const clarificationKeywords = [
      'what do you mean',
      'explain',
      'more about',
      'tell me more',
      'continue',
      'what about',
      'can you elaborate',
      'further',
      'more',
      'explain that',
      'how',
      'why',
    ];

    const messageLower = currentMessage.toLowerCase();
    return clarificationKeywords.some(keyword => messageLower.includes(keyword));
  },

  /**
   * Detect emotional intensity in message
   * @param {string} message - User message
   * @returns {string} 'low' | 'medium' | 'high' | 'crisis'
   */
  detectEmotionalIntensity(message) {
    const messageLower = message.toLowerCase();

    // Crisis indicators
    const crisisKeywords = [
      'suicide',
      'self harm',
      'kill myself',
      'end my life',
      'no point in living',
      'overdose',
      'cut myself',
      'die',
      'can\'t take it',
    ];
    if (crisisKeywords.some(keyword => messageLower.includes(keyword))) {
      return 'crisis';
    }

    // High intensity indicators
    const highIntensityKeywords = [
      'desperate',
      'hopeless',
      'can\'t handle',
      'breaking down',
      'falling apart',
      'unbearable',
      'agony',
      'devastated',
      'shattered',
    ];
    if (highIntensityKeywords.some(keyword => messageLower.includes(keyword))) {
      return 'high';
    }

    // Medium intensity indicators
    const mediumIntensityKeywords = [
      'struggling',
      'difficult',
      'hard',
      'sad',
      'worried',
      'anxious',
      'upset',
      'stressed',
      'overwhelmed',
    ];
    if (mediumIntensityKeywords.some(keyword => messageLower.includes(keyword))) {
      return 'medium';
    }

    return 'low';
  },

  /**
   * Generate context-aware follow-up question
   * @param {string} topic - Detected topic
   * @returns {string}
   */
  generateContextQuestion(topic) {
    const questions = {
      mentalHealth: 'How are you feeling about this right now? I\'m here to listen.',
      faith: 'Would you like to explore this question further, or do you have other concerns?',
      purpose: 'What matters most to you as you think about your purpose?',
      relationships: 'How can I better support you through this relationship challenge?',
      media: 'Would any of these resources be helpful to you today?',
      general: 'Is there anything else on your heart you\'d like to share?',
    };

    return questions[topic] || questions.general;
  },

  /**
   * Check if message mentions personal information
   * @param {string} message
   * @returns {boolean}
   */
  containsPersonalInfo(message) {
    const personalKeywords = [
      'my name',
      'i\'m called',
      'my phone',
      'my address',
      'my social',
      'my ssn',
      'my credit card',
      'password',
      'bank account',
    ];

    const messageLower = message.toLowerCase();
    return personalKeywords.some(keyword => messageLower.includes(keyword));
  },
};

export default contextModule;
