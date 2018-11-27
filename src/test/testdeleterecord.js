/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlagDelete = {
  id: '2b3b4aee-4c86-4ea6-a45c-1a9c4d7713d6',
  title: 'Dummy Data2',
  description: 'Dummy data created for testing',
  createdOn: '2018-11-26T15:39:32.548Z',
  type: 'redflag',
  location: '23674, 56789',
  status: 'draft',
  Images: [],
  Videos: [],
  comment: 'body of record',
};

describe('DELETE redflag record', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .delete('/api/v1/record/2b3b4aee-4c86-4ea6-a45c-1a9c4d7713d6')
      .send(redFlagDelete)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .delete('/api/v1/record/2b3b4aee-4c86-4ea6-a45c-1a9c4d7713d3')
      .send(redFlagDelete)
      .end((err, res) => {
        res.body.should.deep.equal({
          status: 404,
          error: 'Record not found',
        });
        done();
      });
  });
});
