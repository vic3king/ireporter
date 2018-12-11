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
  othernames: 'vic3king',
  email: 'akanidfruxxassv@gmail.com',
  phoneNumber: '07063212299',
  username: 'veee',
};
const dumUser2 = {
  firstname: 'akaniru',
  lastname: 'victory',
  othernames: 'vic3king',
  email: 'akadknirusdxxassv@gmail.com',
  phoneNumber: '07063212299',
  username: 'veee',
};
describe('/Post create new user', () => {
  it('it should Create a new user with correct status code', (done) => {
    chai.request(server)
      .post('/api/v1/user')
      .send(dumUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new record with required fields', (done) => {
    chai.request(server)
      .post('/api/v1/user')
      .send(dumUser2)
      .end((err, res) => {
        res.body.data.should.have.include.key('firstname');
        res.body.data.should.have.include.key('lastname');
        res.body.data.should.have.include.key('othernames');
        res.body.data.should.have.include.key('email');
        res.body.data.should.have.include.key('phonenumber');
        res.body.data.should.have.include.key('username');
        done();
      });
  });
});
