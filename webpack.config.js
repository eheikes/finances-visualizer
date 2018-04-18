const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const distPath = 'dist'

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin([distPath]),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      title: 'VizFin'
    })
  ],
  output: {
    filename: 'main.js',
    path: resolve(__dirname, distPath)
  }
}
