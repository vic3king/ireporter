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

describe('GET /records/:id', () => {
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .send(redFlag)
      .end(() => {
        done();
      });
  });
  it('should get the matching record', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 404 if not found', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/sv')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return 404 path is wrong', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/:gh')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
