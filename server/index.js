const services = require('./services/makeRequest');
const express = require('express');
const bodyParser = require('body-parser');
const pinoLib = require('express-pino-logger');
const pino = pinoLib();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// proxy
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*'); // this makes it word
  next();
});

// req.query.firstName
app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { searchValue, languageTarget } = req?.query || {};
    const result = await services.getSentences({ searchValue, languageTarget });
    // res.send(util.inspect(result.data, { showHidden: false, depth: null }));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result.data));
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));
