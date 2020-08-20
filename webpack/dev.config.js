const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge').default // used to merge the config with the base config

const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
   mode: 'development',

   devtool: 'eval-source-map',

   devServer: {
      contentBase: path.resolve(__dirname, '../dist'), // from where to server static files
      port: 9000,
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
   },

   plugins: [
      new webpack.EvalSourceMapDevToolPlugin({
         exclude: /vendor\..+\.js/,
      }),
      new webpack.NamedModulesPlugin(),

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
   ].filter(x => !!x),

   optimization: {
      // uses magic to put libraries into vendors chunk
      usedExports: true,
      splitChunks: {
         chunks: 'all',
      },
   },

   output: {
      filename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, '../dist'),
   },
})
