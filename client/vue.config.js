const webpack = require('webpack')
module.exports = {
  publicPath: "/genetherapy/docs/",
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
