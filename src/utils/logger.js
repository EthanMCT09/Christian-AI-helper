// Lightweight logger that only prints in development
export const logger = {
  log: (...args) => {
    if (import.meta.env.DEV) console.log(...args);
  },
  warn: (...args) => {
    if (import.meta.env.DEV) console.warn(...args);
  },
  error: (...args) => {
    if (import.meta.env.DEV) console.error(...args);
  },
};

export default logger;
