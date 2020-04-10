const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/client/index.js', 'webpack-hot-middleware/client'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /(node_modules)/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    { // for plain css
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    ]
  },
  devServer: {
    publicPath: '/build/',
    port: 8080,
    proxy: {
      '/client': 'http://localhost:8080'
    },
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
