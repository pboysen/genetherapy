//const zlib = require("zlib");
const path = require('path');
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  publicPath: "/genetherapy",
  outputDir: "../dist/",
  configureWebpack: {
    resolve: {
       alias: {
         'vue$': 'vue/dist/vue.common.js'
       }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      }),
      new BundleAnalyzerPlugin()
      /*
        new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      })
      */
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
