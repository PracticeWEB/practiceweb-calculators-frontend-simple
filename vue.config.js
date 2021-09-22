module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.PUBLIC_PATH || '/',
  filenameHashing: true,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      }
    }
  }
}
