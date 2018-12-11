/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlag = {
  title: 'Dummy Data',
  description: 'Dummy data created for testing',
  created_on: '2018-11-26T15:39:32.548Z',
  type: 'red-flag',
  location: '0.3674, 0.6789',
  status: 'draft',
  comment: 'body of red-flag',
};
describe('/PUT Update comment', () => {
  let id = 180;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .send(redFlag)
      .end((err, res) => {
        id = res.body.data.id;
        done();
      });
  });
  it('should return a success status 200', (done) => {
    chai.request(server)
      .put(`/api/v2/incidents/${id}/comment`)
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return an error 404 if record not found', (done) => {
    chai.request(server)
      .put('/api/v2/incidents/1/comment')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return correct error message when route does not exist', (done) => {
    chai.request(server)
      .put('/api/v2/red-flags/41/comment')
      .send(redFlag)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          message: 'invalid route',
        });
        done();
      });
  });
});
