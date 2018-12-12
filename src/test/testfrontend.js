/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);


describe('UI routes', () => {
  it('should send success at /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should throw a 400 on bad request', (done) => {
    chai.request(server)
      .post('/')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should throw a 404 when not found', (done) => {
    chai.request(server)
      .get('/ui')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
