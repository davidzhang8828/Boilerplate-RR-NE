const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Webpack/ Webpack Compiler */

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

// global error handler:
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT);

module.exports = app;
