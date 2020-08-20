const path = require('path')
require('dotenv').config({
   path: path.resolve(__dirname, '../.env'),
})

// Here come the parts of config that are the same for development and production

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            test: /\.(gif|png|jpe?g|svg|ttf|eot|woff2?)$/i,
            use: [
               {
                  loader: 'url-loader',
                  options: {},
               },
            ],
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
   ],

   resolve: {
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      alias: {
         _: path.resolve(__dirname, '../src/'),
         'react-dom': '@hot-loader/react-dom',
      },
   },
}
