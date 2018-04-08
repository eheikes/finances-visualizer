const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const distPath = 'dist'

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin([distPath]),
    new HtmlWebpackPlugin({
      title: 'VizFin'
    })
  ],
  output: {
    filename: 'main.js',
    path: resolve(__dirname, distPath)
  }
}
