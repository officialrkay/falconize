const path = require( 'path' )
const webpack = require( 'webpack' )
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSCSS = new ExtractTextPlugin('triscss.min.css')

module.exports = {
  mode: 'development',
  entry: {
    main: [
      './src/scss/main.scss',
      './src/js/main.js'
    ]
  },
  output: {
    path: path.resolve('./dist/assets/'),
    filename: "falconize.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSCSS.extract( {
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        } )
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      verbose: true
    } ),
    extractSCSS,
    new HtmlWebpackPlugin({
      title: 'Falconize',
      filename: '../../index.html',
      template: 'src/index.html'
    })
  ]
}
