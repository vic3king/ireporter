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
  phoneNumber: '07063002299',
  username: 'veesae',
};
const record = {
  title: 'Dummy Data',
  description: 'Dummy data created for testing',
  created_on: '2018-11-26T15:39:32.548Z',
  type: 'intervention',
  location: '0.3674, 0.6789',
  status: 'draft',
  comment: 'body of red-flag',
};
let jwToken;

describe('CREATE a record', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        jwToken = res.body.data[0].token;
        done();
      });
  });

  it('should return a success status 200', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(record)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('it should Create a new record with required fields', (done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .set('x-access-token', jwToken)
      .send(record)
      .end((err, res) => {
        res.body.data.should.have.include.key('title');
        res.body.data.should.have.include.key('created_on');
        res.body.data.should.have.include.key('type');
        res.body.data.should.have.include.key('location');
        res.body.data.should.have.include.key('description');
        res.body.data.should.have.include.key('comment');
        done();
      });
  });


  it('should return correct error on wrong route', (done) => {
    chai.request(server)
      .post('/api/v2/incident')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
