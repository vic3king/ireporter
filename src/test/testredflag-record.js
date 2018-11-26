/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlag = {
  createdOn: new Date(),
  createdBy: 'victory',
  type: 'redflag',
  location: [45.002440, -90.810480],
  status: [],
  Images: [],
  Videos: [],
  comment: 'this is a red flag record',
};


describe('/Post create red-flag', () => {
  it('it should Create a new redflag record with correct status code', (done) => {
    chai.request(server)
      .post('/ireporter/v3/redflag')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new record with required fields', (done) => {
    chai.request(server)
      .post('/ireporter/v3/redflag')
      .send(redFlag)
      .end((err, res) => {
        res.body.data.should.include(redFlag);
        done();
      });
  });

  it('it should create record with properties of specific type', (done) => {
    chai.request(server)
      .post('/ireporter/v3/redflag')
      .send(redFlag)
      .end((err, res) => {
        res.body.data.location.to.be.an('array');
        res.body.data.status.to.be.an('array');
        res.body.data.images.to.be.an('array');
        res.body.data.location.to.be.an('array');
        done();
      });
  });
});
