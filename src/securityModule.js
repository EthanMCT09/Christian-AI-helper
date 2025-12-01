/**
 * Security Module for FaithGPT
 * Provides protection against common web vulnerabilities
 */

export const securityModule = {
  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - User input to sanitize
   * @returns {string} - Sanitized input
   */
  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} - { isStrong: boolean, message: string }
   */
  validatePasswordStrength(password) {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };

    const isStrong = Object.values(checks).filter(Boolean).length >= 3; // At least 3 checks
    const message = isStrong
      ? 'Strong password'
      : 'Password must have at least 8 characters with uppercase, lowercase, and numbers';

    return { isStrong, checks, message };
  },

  /**
   * Check for injection attacks
   * @param {string} input - Input to check
   * @returns {boolean} - true if potentially dangerous
   */
  detectInjectionAttempt(input) {
    const injectionPatterns = [
      /<script/gi,
      /javascript:/gi,
      /on\w+\s*=/gi, // Event handlers like onclick=
      /eval\(/gi,
      /alert\(/gi,
      /onerror=/gi,
    ];

    return injectionPatterns.some(pattern => pattern.test(input));
  },

  /**
   * Rate limiting helper
   * @param {string} identifier - User identifier (IP, user ID, etc.)
   * @param {number} maxRequests - Maximum requests allowed
   * @param {number} timeWindow - Time window in milliseconds
   * @returns {boolean} - true if within limit
   */
  checkRateLimit(identifier, maxRequests = 100, timeWindow = 60000) {
    const key = `rateLimit_${identifier}`;
    const current = JSON.parse(sessionStorage.getItem(key) || '{"count":0,"resetTime":0}');
    const now = Date.now();

    if (now > current.resetTime) {
      current.count = 0;
      current.resetTime = now + timeWindow;
    }

    current.count++;

    if (current.count > maxRequests) {
      import('./utils/logger').then(({ logger }) => logger.warn(`Rate limit exceeded for ${identifier}`)).catch(() => {});
      return false;
    }

    sessionStorage.setItem(key, JSON.stringify(current));
    return true;
  },

  /**
   * Generate security token for CSRF protection
   * @returns {string}
   */
  generateCSRFToken() {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    sessionStorage.setItem('csrfToken', token);
    return token;
  },

  /**
   * Verify CSRF token
   * @param {string} token - Token to verify
   * @returns {boolean}
   */
  verifyCSRFToken(token) {
    const stored = sessionStorage.getItem('csrfToken');
    return stored === token;
  },

  /**
   * Encrypt sensitive data (basic)
   * @param {string} data - Data to encrypt
   * @param {string} key - Encryption key
   * @returns {string}
   */
  encryptData(data, key) {
    try {
      return btoa(data); // Basic Base64 encoding (use proper encryption in production)
    } catch (e) {
      import('./utils/logger').then(({ logger }) => logger.error('Encryption error:', e)).catch(() => {});
      return data;
    }
  },

  /**
   * Decrypt sensitive data (basic)
   * @param {string} encrypted - Encrypted data
   * @param {string} key - Decryption key
   * @returns {string}
   */
  decryptData(encrypted, key) {
    try {
      return atob(encrypted); // Basic Base64 decoding
    } catch (e) {
      import('./utils/logger').then(({ logger }) => logger.error('Decryption error:', e)).catch(() => {});
      return encrypted;
    }
  },

  /**
   * Validate file upload
   * @param {File} file - File to validate
   * @param {object} options - Validation options
   * @returns {boolean}
   */
  validateFileUpload(file, options = {}) {
    const {
      maxSize = 5242880, // 5MB
      allowedTypes = ['application/json', 'text/plain'],
    } = options;

    if (file.size > maxSize) {
      import('./utils/logger').then(({ logger }) => logger.warn('File size exceeds limit')).catch(() => {});
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      import('./utils/logger').then(({ logger }) => logger.warn('File type not allowed')).catch(() => {});
      return false;
    }

    return true;
  },

  /**
   * Add security headers (for backend/middleware)
   * @returns {object}
   */
  getSecurityHeaders() {
    return {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    };
  },

  /**
   * Verify HTTPS (production only)
   * @returns {boolean}
   */
  isHTTPSEnabled() {
    return window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  },

  /**
   * Clear sensitive data from memory
   * @param {string} variable - Variable name to clear
   */
  clearSensitiveData(variable) {
    if (typeof window[variable] !== 'undefined') {
      window[variable] = null;
      delete window[variable];
    }
  },
};

export default securityModule;
