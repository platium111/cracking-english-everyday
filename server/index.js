const services = require('./services/makeRequest');
const express = require('express');
const bodyParser = require('body-parser');
const pinoLib = require('express-pino-logger');
const pino = pinoLib();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// req.query.firstName
app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const result = await services.getSentences({ searchValue: 'lan', languageTarget: 'en' });
    // console.log('hey', result);
    res.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));
