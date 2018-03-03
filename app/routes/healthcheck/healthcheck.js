module.exports = app => {
  app.get('/_health/liveness', (req, res) => {
    res.sendStatus(200);
  });
  app.get('/_health/readiness', (req, res) => {
    res.sendStatus(200);
  });
};
