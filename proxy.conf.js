const PROXY_CONFIG = {
  '/api': {
    target: 'https://localhost:8443',
    secure: false,
    ws: true,
    logLevel: 'debug',
    pathRewrite: {'^/api': ''}
  }
};

module.exports = PROXY_CONFIG;
