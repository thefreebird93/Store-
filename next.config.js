const path = require('path');

let existing = {};
try {
  existing = require('./next.config.js') || {};
} catch(e) {
  existing = {};
}

// Remove experimental.appDir if present to avoid warnings
if (existing.experimental && existing.experimental.appDir !== undefined) {
  delete existing.experimental.appDir;
}

module.exports = {
  ...existing,
  webpack: (config, options) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname)
    };
    if (typeof existing.webpack === 'function') {
      return existing.webpack(config, options);
    }
    return config;
  }
};
