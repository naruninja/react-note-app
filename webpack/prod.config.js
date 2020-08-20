require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const baseConfig = require('./base.config.js')

const isDev = process.env.NODE_ENV === 'development'

module.exports = merge(baseConfig, {
   mode: isDev ? 'development' : 'production',

   stats: process.env.AVIEE_WEBAPP_BUILD_STATS || 'normal',
   devtool: false,

   plugins: [
      new HtmlWebpackInlineSourcePlugin(), // injects source javascript and css directly into html
      new webpack.DefinePlugin({
         testReports: JSON.stringify({
            v4: require('../test-files/report_v4_0.json'),
            v5: require('../test-files/report_v5_0.json'),
         }),
         'process.env': { NODE_ENV: JSON.stringify('production') },
      }),
      process.env.ANALYZE_BUNDLE === 'true' ? new BundleAnalyzerPlugin() : null,
      new webpack.SourceMapDevToolPlugin({
         append: '\n//# sourceMappingURL=/thesourcemap',
         filename: 'app.bundle.js.map',
      }),
   ].filter(x => !!x),

   optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [new TerserPlugin({ sourceMap: true })],
   },

   output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'app.bundle.js',
   },
})
