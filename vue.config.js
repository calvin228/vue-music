module.exports = {
  // devServer: {
  //   proxy: {
  //     '^/search' : {
  //       target: 'http://itunes.apple.com',
  //       changeOrigin: true,
  //       logLevel: 'debug'
  //     }
  //   } // the port your server in running on
  // }
  devServer: {
    disableHostCheck: true
  }
}