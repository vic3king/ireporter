/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const dumUser = {
  firstname: 'akaniru',
  lastname: 'victory',
  othernames: 'ifeanyi',
  email: 'vic3king@example.com',
  phoneNumber: '07063212299',
  username: 'vic3king',

};

describe('/Post create user', () => {
  it('it should Create a new user with correct status code', (done) => {
    chai.request(server)
      .post('/ireporter/v2/user')
      .send(dumUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        res.body.data.should.include(dumUser);
        done();
      });
  });

  it('it should Create a new user with required fields', (done) => {
    chai.request(server)
      .post('/ireporter/v2/user')
      .send(dumUser)
      .end((err, res) => {
        res.body.data.should.include(dumUser);
        done();
      });
  });
});
