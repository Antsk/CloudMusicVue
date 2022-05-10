//@符号指向src配置
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //关闭语法检查
  lintOnSave: false,
  //跨域处理
  devServer:{
    port:8888,
    proxy: {
      '/api': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://1.12.236.169:3000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  },
  //@符号指向src
  configureWebpack: {
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': resolve('src'),
      },
    },
  },
}
