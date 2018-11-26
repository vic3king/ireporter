/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlag = {
  title: 'gfbfnffg',
  description: 'this is a red flag record',
  createdBy: 'victory',
  type: 'record',
  location: '0900000 ,988990',
};


describe('/Post create red-flag', () => {
  it('it should Create a new record with correct status code', (done) => {
    chai.request(server)
      .post('/api/v1/record')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new record with required fields', (done) => {
    chai.request(server)
      .post('/api/v1/record')
      .send(redFlag)
      .end((err, res) => {
        res.body.data.should.have.include.key('title');
        res.body.data.should.have.include.key('createdBy');
        res.body.data.should.have.include.key('type');
        res.body.data.should.have.include.key('location');
        res.body.data.should.have.include.key('description');
        done();
      });
  });
});
