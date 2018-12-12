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
  username: 'veee',
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
describe('GET all Records', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        jwToken = res.body.data[0].token;
        done();
      });
  });
  it('should get all existing records', (done) => {
    chai.request(server)
      .get('/api/v2/incidents')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
