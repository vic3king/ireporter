/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server').default;

chai.should();
chai.use(chaiHttp);

const redFlag = {
  title: 'title of record',
  description: 'this is a red flag record',
  createdBy: 'victory',
  type: 'intervention',
  location: '0.0000, 0.0000',
  comment: 'body of record',
};


describe('/Post create red-flag', () => {
  it('it should Create a new record with correct status code', (done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .send(redFlag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new record with required fields', (done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .send(redFlag)
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
});
