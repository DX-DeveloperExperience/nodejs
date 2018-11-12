const express = require('express');
const winston = require('winston');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(`${__dirname}/swagger.yaml`);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

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

app.disable('x-powered-by');
app.use(require('morgan')('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.type('text/plain');
  res.end('Hello World');
});

require('./routes/healthcheck/healthcheck')(app);

process.on('unhandledRejection', reason => {
  logger.log(`Unhandled Rejection at: ${reason.stack || reason}`);
});

const server = app.listen(port, () =>
  logger.info(`Server running on port ${port}`)
);

process.on('SIGTERM', () => {
  logger.info('shutdown started');
  server.close();
});

module.exports = server;
