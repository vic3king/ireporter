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

describe('/Post Update location', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .put('/api/v1/41e914a9-96ba-4bda-a406-f86763b41c89/location')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.status.should.be.equal(201);
        done();
      });
  });

  it('should return an error 404 if record not found', (done) => {
    chai.request(server)
      .put('/api/v1/41e914a9-96ba-4bda-a407-f86763b41c89/location')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .put('/api/v1/41e914a9-96ba-4bda-a407-f86763b41c89/location')
      .send(redFlag)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 404,
          error: 'Record not found, Enter a valid id',
        });
        done();
      });
  });
});
