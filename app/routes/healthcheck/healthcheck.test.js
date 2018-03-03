const request = require('supertest');
const server = require('../../index');

describe('loading express', () => {
  after(done => {
    server.close(done);
  });
  it('responds to /_health/liveness', done => {
    request(server)
      .get('/_health/liveness')
      .expect(200, done);
  });
  it('responds to /_health/readiness', done => {
    request(server)
      .get('/_health/readiness')
      .expect(200, done);
  });
});
