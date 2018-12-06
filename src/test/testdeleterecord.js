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
  createdOn: '2018-11-26T15:39:32.548Z',
  type: 'redflag',
  location: '23674, 56789',
  status: 'draft',
  Videos: [],
  comment: 'body of record',
};

describe('DELETE redflag record', () => {
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/record')
      .send(redFlag)
      .end(() => {
        done();
      });
  });
  it('should return a success status 200', (done) => {
    chai.request(server)
      .delete('/api/v1/record/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .delete('/api/v1/record/25')
      .end((err, res) => {
        res.body.should.deep.equal({
          status: 404,
          error: 'Record not found, Enter a valid id',
        });
        done();
      });
  });
});
