import CryptoJS from 'crypto-js';

// Secret key for encryption (uses environment variable in production)
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'faithgpt-secret-key-change-in-production-2025';

/**
 * Encrypt a string using AES-256
 * @param {string} text - Text to encrypt
 * @returns {string} - Encrypted text (Base64)
 */
export const encryptConversation = (text) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    // Log in dev only
    import('./utils/logger').then(({ logger }) => logger.error('Encryption error:', error)).catch(() => {});
    return text; // Return unencrypted as fallback
  }
};

/**
 * Decrypt a string using AES-256
 * @param {string} encryptedText - Encrypted text (Base64)
 * @returns {string} - Decrypted text
 */
export const decryptConversation = (encryptedText) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    import('./utils/logger').then(({ logger }) => logger.error('Decryption error:', error)).catch(() => {});
    return encryptedText; // Return as-is if decryption fails
  }
};

/**
 * Encrypt entire conversation history
 * @param {Array} messages - Array of message objects
 * @returns {string} - Encrypted conversation
 */
export const encryptConversationHistory = (messages) => {
  try {
    const json = JSON.stringify(messages);
    return encryptConversation(json);
  } catch (error) {
    import('./utils/logger').then(({ logger }) => logger.error('Error encrypting conversation history:', error)).catch(() => {});
    return '';
  }
};

/**
 * Decrypt entire conversation history
 * @param {string} encryptedHistory - Encrypted conversation
 * @returns {Array} - Decrypted messages array
 */
export const decryptConversationHistory = (encryptedHistory) => {
  try {
    const decrypted = decryptConversation(encryptedHistory);
    return JSON.parse(decrypted);
  } catch (error) {
    import('./utils/logger').then(({ logger }) => logger.error('Error decrypting conversation history:', error)).catch(() => {});
    return [];
  }
};

/**
 * Store encrypted conversation in localStorage
 * @param {string} key - Storage key
 * @param {Array} messages - Messages to store
 */
export const storeEncryptedConversation = (key, messages) => {
  try {
    const encrypted = encryptConversationHistory(messages);
    localStorage.setItem(key, encrypted);
  } catch (error) {
    import('./utils/logger').then(({ logger }) => logger.error('Error storing conversation:', error)).catch(() => {});
  }
};

/**
 * Retrieve encrypted conversation from localStorage
 * @param {string} key - Storage key
 * @returns {Array} - Decrypted messages
 */
export const retrieveEncryptedConversation = (key) => {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return [];
    return decryptConversationHistory(encrypted);
  } catch (error) {
    import('./utils/logger').then(({ logger }) => logger.error('Error retrieving conversation:', error)).catch(() => {});
    return [];
  }
};

export default {
  encryptConversation,
  decryptConversation,
  encryptConversationHistory,
  decryptConversationHistory,
  storeEncryptedConversation,
  retrieveEncryptedConversation,
};
