const express = require('express');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: []
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(require('morgan')('dev'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Hello World');
});

process.on('unhandledRejection', reason => {
  logger.log(`Unhandled Rejection at: ${reason.stack || reason}`);
});

app.listen(port, () => logger.info(`Server running on port ${port}`));
