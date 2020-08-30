require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge').default

const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./base.config.js')

const isDev = process.env.NODE_ENV === 'development'

module.exports = merge(baseConfig, {
   mode: isDev ? 'development' : 'production',

   stats: process.env.AVIEE_WEBAPP_BUILD_STATS || 'normal',
   devtool: false,

   plugins: [
	   new HtmlWebpackInlineSourcePlugin(),
      new webpack.DefinePlugin({
         'process.env': { NODE_ENV: JSON.stringify('production') },
      }),
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
