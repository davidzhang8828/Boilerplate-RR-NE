const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
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
    }
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
  }
};
