module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'wordpress'
    ? '/wp-content/plugins/practiceweb-calculators/'
    : '/',
  filenameHashing: false	
}
