/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlag = {
  title: 'gfbfnffg',
  description: 'this is a red flag record',
  createdBy: 'victory',
  type: 'record',
  location: '0900000 ,988990',
};

describe('/PUT Update location', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .put('/api/v1/red-flags/1/location')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return an error 404 if record not found', (done) => {
    chai.request(server)
      .put('/api/v1/red-flags/10/location')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .put('/api/v1/red-flags/11/location')
      .send(redFlag)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 404,
          error: 'red-flags not found, Enter a valid id',
        });
        done();
      });
  });
});
