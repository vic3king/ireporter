/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlag = {
  title: 'DumTitile',
  description: 'this is a red flag record',
  createdBy: 'victory',
  type: 'record',
  location: '0900000 ,988990',
  comment: 'body of a redflag',
};

describe('DELETE redflag record', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .delete('/api/v1/records/41e914a9-96ba-4bda-a406-f86763b41c89')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.deep.equal({
          status: 404,
          error: 'Record deleted successfully',
        });
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .delete('/api/v1/records/41e914a9-96ba-4bda-a407-f86763b41c89/comment')
      .send(redFlag)
      .end((err, res) => {
        res.body.should.deep.equal({
          status: 404,
          error: 'Record not found, Enter a valid id',
        });
        done();
      });
  });
});
