/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const user = {
  firstname: 'akaniru',
  lastname: 'precious',
  othernames: 'vic3king',
  email: `${25555 * Math.random()}@gmail.com`,
  password: '2020ada',
  phoneNumber: '07063212299',
  username: 'veegve',
};
const record = {
  title: 'Dummy Data',
  description: 'Dummy data created for testing',
  created_on: '2018-11-26T15:39:32.548Z',
  type: 'red-flag',
  location: '0.3674, 0.6789',
  status: 'draft',
  comment: 'body of red-flag',
};
let jwToken;
let idD;

describe('Get a specific record by ID', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        jwToken = res.body.data[0].token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .set('x-access-token', jwToken)
      .send(record)
      .end((err, res) => {
        idD = res.body.data.id;
        done();
      });
  });


  it('should return a success status 200', (done) => {
    chai.request(server)
      .get(`/api/v2/incidents/${idD}`)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return correct error message', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/25')
      .end((err, res) => {
        res.body.should.deep.equal({
          status: 400,
          message: 'Token is not provided',
        });
        done();
      });
  });
});
