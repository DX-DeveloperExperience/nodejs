const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const logger = require('morgan');
const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  res.end('Hello World');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
