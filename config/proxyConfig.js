module.exports = {
  proxyList: {
    '/account': {
      target: 'http://www.eduvenus.com/',
      changeOrigin: true,
      pathRewrite: {'^/account': '' }
    }
  }
}
