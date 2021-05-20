const webpack = require('webpack')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/genetherapy/../'
    : '/',
  outputDir: "docs",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      })
    ],
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `
      }
    }
  }
};
