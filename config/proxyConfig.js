module.exports = {
  proxyList: {
    '/api': {
      target: 'http://www.eduvenus.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
