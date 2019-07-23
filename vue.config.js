module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.PUBLIC_PATH,
  filenameHashing: true,
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  }
}
