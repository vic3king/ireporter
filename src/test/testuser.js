/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const user = {
  firstname: 'akani',
  lastname: 'precious',
  othernames: 'vic3king',
  email: 'akannirxu@gmail.com',
  password: '2020ada',
  phoneNumber: '09063212299',
  username: 'veeee',
};

let jwToken;

describe('CREATE a user', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        jwToken = res.body.data[0].token;
        res.should.have.status(201);
        done();
      });
  });


  it('should return correct error when created without token', (done) => {
    chai.request(server)
      .post('/api/v2/signup')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
