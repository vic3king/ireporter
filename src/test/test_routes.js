/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.should();
chai.use(chaiHttp);
const token = process.env.TEST_TOKEN;
const adminToken = process.env.ADMIN_TOKEN;
let idD;

describe('UI routes', () => {
  it('should send success at /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should throw a 400 on bad request', (done) => {
    chai.request(server)
      .get('/ui')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw a 400 for other methods on /', (done) => {
    chai.request(server)
      .post('/')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


describe('CREATE a user', () => {
  const user = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    phoneNumber: '09063212299',
    username: 'presh',
  };
  const userNoEmail = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    password: '2020ada',
    phoneNumber: '09063212299',
    username: 'preshx',
  };
  const userNoPassword = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'preshxx@gmail.com',
    phoneNumber: '090632122991',
    username: 'preshxx',
  };

  const userBadEmail = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'preshxxgmail.com',
    phoneNumber: '09063212221',
    username: 'preshwx',
  };

  it('should return a success status 201 when created succesfully', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('x-access-token', token)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should return a 400 when created with duplicate data', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('x-access-token', token)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should fail to create user if email is missing', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('x-access-token', token)
      .send(userNoEmail)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should fail to create user if password is missing', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('x-access-token', token)
      .send(userNoPassword)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created without token', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created with invalid email', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('x-access-token', token)
      .send(userBadEmail)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Login user', () => {
  const user = {
    email: 'presh@gmail.com',
    password: '2020ada',
  };

  it('should login user with correct details', (done) => {
    chai.request(server)
      .post('/api/v2/auth/login')
      .set('x-access-token', token)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  const userLogin = {
    email: 'presh@gmail.com',
    password: '2020',
  };
  it('should reject login request with wrong credentials', (done) => {
    chai.request(server)
      .post('/api/v2/auth/login')
      .set('x-access-token', token)
      .send(userLogin)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('CREATE a record', () => {
  const user = {
    firstname: 'akaniru',
    lastname: 'debs',
    othernames: 'vic3king',
    email: 'debs@gmail.com',
    password: '2020ada',
    phoneNumber: '07063002299',
    username: 'debs',
  };
  const recordReflag = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'intervention',
    location: '0.3674, 0.6789',
    comment: 'body of red-flag',
  };
  const recordIntervention = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'intervention',
    location: '0.3674, 0.6789',
    comment: 'body of red-flag',
  };
  const recordUnknown = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'unknown',
    location: '0.3674, 0.6789',
    comment: 'body of red-flag',
  };
  const noLocation = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'unknown',
    comment: 'body of red-flag',
  };
  const noTitle = {
    description: 'Dummy data created for testing',
    type: 'unknown',
    location: '0.3674, 0.6789',
    comment: 'body of red-flag',
  };
  const noType = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    location: '0.3674, 0.6789',
    comment: 'body of red-flag',
  };
  const noDescription = {
    title: 'Dummy Data',
    type: 'unknown',
    location: '0.36d74, 0.6789',
    comment: 'body of red-flag',
  };

  const badLocation = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'unknown',
    location: '0.36d74, 0.6789',
    comment: 'body of red-flag',
  };
  let jwToken;

  before((done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        jwToken = res.body.data[0].token;
        done();
      });
  });

  it('should create a red flag and return correct status code', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(recordReflag)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should create an intervention and return correct status code', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(recordIntervention)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should throw an error on wrong location', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(badLocation)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when location missing', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(noLocation)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when description missing', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(noDescription)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when title is missing', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(noTitle)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when type is missing', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(noType)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when a wrong record type is used', (done) => {
    chai.request(server)
      .post('/api/v2/incidents/')
      .send(recordUnknown)
      .set('x-access-token', jwToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should Create a new record with required fields', (done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .set('x-access-token', jwToken)
      .send(recordReflag)
      .end((err, res) => {
        res.body.data.should.have.include.key('title');
        res.body.data.should.have.include.key('type');
        res.body.data.should.have.include.key('location');
        res.body.data.should.have.include.key('description');
        res.body.data.should.have.include.key('comment');
        done();
      });
  });

  it('should return correct error on bad request', (done) => {
    chai.request(server)
      .post('/api/v2/incident')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error on wrong route', (done) => {
    chai.request(server)
      .post('/apc/v1/incident')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Get all records', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .get('/api/v2/incidents')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        console.log(err)
        res.should.have.status(200);
        done();
      });
  });
});

describe('Get records by type', () => {
  it('should return a all red flags', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/type/red-flag')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return a all intervention records', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/type/intervention')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should throw a 400 when record type is wrong', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/type/unknown')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Get a record by id', () => {
  const record = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'red-flag',
    location: '0.3674, 0.6789',
    status: 'draft',
    comment: 'body of red-flag',
  };

  before((done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .set('x-access-token', token)
      .send(record)
      .end((err, res) => {
        idD = res.body.data.id;
        done();
      });
  });

  it('should return a success status 200', (done) => {
    chai.request(server)
      .get(`/api/v2/incidents/${idD}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should throw error on wrong or invalid id', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/x')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw a 404 when record not found', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/90')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return correct error message when no token is provided', (done) => {
    chai.request(server)
      .get('/api/v2/incidents/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.deep.equal({
          status: 401,
          message: 'Token is not provided',
        });
        done();
      });
  });
});

describe('Update a records comment ', () => {
  const record = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'intervention',
    location: '0.3674, 0.6789',
    status: 'draft',
    comment: 'updated record',
  };

  it('should return a success status 200', (done) => {
    chai.request(server)
      .put(`/api/v2/incidents/${idD}/comment`)
      .set('x-access-token', token)
      .send(record)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should request for a token when not submitted', (done) => {
    chai.request(server)
      .put('/api/v2/incidents/1/comment')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.deep.equal({ status: 401, message: 'Token is not provided' });
        done();
      });
  });

  it('should return correct error message when route does not exist', (done) => {
    chai.request(server)
      .put('/api/v2/incident/1/comment')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw a 404 when record not found', (done) => {
    chai.request(server)
      .put('/api/v2/incidents/90/comment')
      .set('x-access-token', token)
      .send(record)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('Update a records location ', () => {
  const record = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'red-flag',
    location: '0.3674, 0.6789',
    status: 'draft',
    comment: 'body of red-flag',
  };

  before((done) => {
    chai.request(server)
      .post('/api/v2/incidents')
      .set('x-access-token', token)
      .send(record)
      .end((err, res) => {
        idD = res.body.data.id;
        done();
      });
  });

  it('should return a success status 200', (done) => {
    chai.request(server)
      .put(`/api/v2/incidents/${idD}/location`)
      .set('x-access-token', token)
      .send(record)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should request for a token when not submitted', (done) => {
    chai.request(server)
      .put('/api/v2/incidents/1/location')
      .send(record)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.deep.equal({ status: 401, message: 'Token is not provided' });
        done();
      });
  });

  it('should return correct error message when route does not exist', (done) => {
    chai.request(server)
      .put('/api/v2/incident/1/location')
      .send(record)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw a 404 when record not found', (done) => {
    chai.request(server)
      .put('/api/v2/incidents/90/location')
      .set('x-access-token', token)
      .send(record)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('update record status', () => {
  const record = {
    title: 'Dummy Data',
    description: 'Dummy data created for testing',
    type: 'intervention',
    location: '0.3674, 0.6789',
    status: 'draft',
    comment: 'updated record',
  };

  it('should return a success status 200', (done) => {
    chai.request(server)
      .put(`/api/v2/incidents/${idD}/status`)
      .set('x-access-token', adminToken)
      .send(record)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return a  400 for bad request', (done) => {
    chai.request(server)
      .put(`/api/v2/incidents/${idD}/status`)
      .send(record)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should return a  404 when not found', (done) => {
    chai.request(server)
      .put('/api/v2/incidents/90/status')
      .set('x-access-token', adminToken)
      .send(record)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});


describe('DELETE a record', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .delete(`/api/v2/incidents/${idD}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return correct error message when no token is provided', (done) => {
    chai.request(server)
      .delete('/api/v2/incidents/25')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.deep.equal({
          status: 401,
          message: 'Token is not provided',
        });
        done();
      });
  });
});
