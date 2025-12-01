/**
 * Analytics Module for FaithGPT
 * Tracks usage patterns and helps improve the AI
 */

export const analyticsModule = {
  events: [],
  sessionStart: Date.now(),

  /**
   * Track user event
   * @param {string} eventName - Name of the event
   * @param {object} eventData - Additional data about the event
   */
  trackEvent(eventName, eventData = {}) {
    const event = {
      name: eventName,
      timestamp: Date.now(),
      data: eventData,
      sessionDuration: Date.now() - this.sessionStart,
    };

    this.events.push(event);

    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events.shift();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      import('./utils/logger').then(({ logger }) => logger.log(`📊 Analytics: ${eventName}`, eventData)).catch(() => {});
    }
  },

  /**
   * Track message sent
   * @param {string} messageLength - Length of message
   * @param {string} detectedTopic - Detected topic
   */
  trackMessageSent(messageLength, detectedTopic) {
    this.trackEvent('message_sent', {
      messageLength,
      detectedTopic,
      timestamp: Date.now(),
    });
  },

  /**
   * Track response generated
   * @param {string} responseType - Type of response (crisis, mentalHealth, faith, etc.)
   * @param {number} responseTime - Time taken to generate response in ms
   */
  trackResponseGenerated(responseType, responseTime) {
    this.trackEvent('response_generated', {
      responseType,
      responseTime,
      timestamp: Date.now(),
    });
  },

  /**
   * Track user engagement
   * @param {string} action - Action performed (export, clear, settings_change, etc.)
   */
  trackUserAction(action) {
    this.trackEvent('user_action', {
      action,
      timestamp: Date.now(),
    });
  },

  /**
   * Track conversation session
   * @param {number} messageCount - Total messages in session
   * @param {number} sessionDuration - Duration of session in ms
   */
  trackSessionEnd(messageCount, sessionDuration) {
    this.trackEvent('session_end', {
      messageCount,
      sessionDuration,
      messagesPerMinute: (messageCount / (sessionDuration / 60000)).toFixed(2),
      timestamp: Date.now(),
    });
  },

  /**
   * Get analytics summary
   * @returns {object}
   */
  getAnalyticsSummary() {
    return {
      totalEvents: this.events.length,
      sessionDuration: Date.now() - this.sessionStart,
      eventsByType: this.events.reduce((acc, event) => {
        acc[event.name] = (acc[event.name] || 0) + 1;
        return acc;
      }, {}),
      averageResponseTime: this.getAverageResponseTime(),
      mostCommonTopic: this.getMostCommonTopic(),
    };
  },

  /**
   * Get average response time
   * @returns {number}
   */
  getAverageResponseTime() {
    const responseEvents = this.events.filter(e => e.name === 'response_generated');
    if (responseEvents.length === 0) return 0;

    const total = responseEvents.reduce((sum, e) => sum + e.data.responseTime, 0);
    return (total / responseEvents.length).toFixed(0);
  },

  /**
   * Get most common topic
   * @returns {string}
   */
  getMostCommonTopic() {
    const messageEvents = this.events.filter(e => e.name === 'message_sent');
    if (messageEvents.length === 0) return 'unknown';

    const topics = messageEvents.reduce((acc, e) => {
      acc[e.data.detectedTopic] = (acc[e.data.detectedTopic] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(topics).reduce((a, b) => topics[a] > topics[b] ? a : b, 'unknown');
  },

  /**
   * Export analytics data
   * @returns {string} JSON string of analytics
   */
  exportAnalytics() {
    return JSON.stringify(this.getAnalyticsSummary(), null, 2);
  },

  /**
   * Reset analytics
   */
  resetAnalytics() {
    this.events = [];
    this.sessionStart = Date.now();
  },
};

export default analyticsModule;
