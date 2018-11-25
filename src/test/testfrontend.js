/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);


describe('UI routes', () => {
  it('should send success at /ireporter/v1/front-end', (done) => {
    chai.request(server)
      .get('/ireporter/v1/front-end')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should throw a 400 on other methods', (done) => {
    chai.request(server)
      .post('/ireporter/v1/front-end')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
