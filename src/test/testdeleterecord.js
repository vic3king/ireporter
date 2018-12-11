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

describe('DELETE redflag red-flags', () => {
  let id = 1000;
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
      .delete(`/api/v2/incidents/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .delete('/api/v2/incidents/25')
      .end((err, res) => {
        res.body.should.deep.equal({
          status: 404,
          message: 'record not found',
        });
        done();
      });
  });
});
