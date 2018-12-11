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
  comment: 'body of record',
};

describe('GET /records/:id', () => {
  let id = 9000;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .send(redFlag)
      .end((err, res) => {
        id = res.body.data.id;
        done();
      });
  });
  it('should get the matching record', (done) => {
    chai.request(server)
      .get(`/api/v2/incidents/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 404 if not found', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/1000')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return 400 path is wrong', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/:gh')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
