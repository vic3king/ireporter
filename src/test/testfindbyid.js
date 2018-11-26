/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);


describe('GET /records/:id', () => {
  it('should get the matching record', (done) => {
    chai.request(server)
      .get('/api/v1/records/41e914a9-96ba-4bda-a406-f86763b41c89')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 404 if not found', (done) => {
    chai.request(server)
      .get('/api/v1/records/41e914a9-96ba-4bda-a406-f86763b41c')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return 404 path is wrong', (done) => {
    chai.request(server)
      .get('/api/v1/records/:gh')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
