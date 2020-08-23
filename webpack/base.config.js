const path = require('path')
require('dotenv').config({
   path: path.resolve(__dirname, '../.env'),
})

// Here come the parts of config that are the same for development and production

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
if (!process.env.NOTE_API_URL)
   throw new Error(
      'You must provide the environment variable NOTE_API_URL, see README.md for more details.'
   )

module.exports = {
   entry: {
      app: './src/index.js', // where webpack looks first
   },

   module: {
      rules: [
         {
            test: /\.(js|ts)x?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.scss$/,
            use: [
               {
                  loader: 'style-loader',
               },
               {
                  loader: 'css-loader',
               },
               {
                  loader: 'sass-loader',
               },
            ],
         },
      ],
   },

   plugins: [
      new HtmlWebpackPlugin({
         // takes index.html from src, adds the script reference to it, and places it into the output path
         template: path.resolve(__dirname, '../src/index.ejs'),
         filename: './index.html',
         minify: {
            collapseWhitespace: true, // remove whitespace
            removeComments: true,
         },
         inlineSource: '.(js|css)$',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.EnvironmentPlugin(['NOTE_API_URL']),
   ],

   resolve: {
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      alias: {
         _: path.resolve(__dirname, '../src/'),
         'react-dom': '@hot-loader/react-dom',
      },
   },
}
