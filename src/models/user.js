import uuid from 'uuid';

class Ireporter {
  /**
   * class constructor
   * @param {object} userInfo
   */
  constructor() {
    this.users = [];
    this.records = [
      {
        id: '41e914a9-96ba-4bda-a406-f86763b41c89',
        title: 'Dummy Data',
        description: 'Dummy data created for testing',
        createdOn: '2018-11-26T15:39:32.548Z',
        type: 'redflag',
        location: '23674, 56789',
        status: 'draft',
        Images: [],
        Videos: [],
        comment: 'body of record',
      },
    ];
  }

  /**
   *
   * @returns {object} user object
   */
  createUser(userInfo) {
    const newUser = {
      id: uuid.v4(),
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      othernames: userInfo.othernames,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      username: userInfo.username,
      registered: new Date(),
      isAdmin: false,
    };
    this.users.push(newUser);
    return newUser;
  }

  createRecord(recordInfo) {
    const createRecord = {
      id: uuid.v4(),
      message: 'Created red-flag record',
      title: recordInfo.title,
      description: recordInfo.description,
      createdOn: new Date(),
      createdBy: recordInfo.createdBy,
      type: recordInfo.type,
      location: recordInfo.location,
      status: 'draft',
      Images: [],
      Videos: [],
      comment: recordInfo.comment,
    };
    this.records.push(createRecord);
    return createRecord;
  }

  /**
   * @returns {object} returns all reflections
   */
  findAllRecords() {
    return this.records;
  }

  findById(id) {
    return this.records.find(record => record.id === id);
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  updateLocation(id, userInfo) {
    const record = this.findById(id);
    const index = this.records.indexOf(record);
    this.records[index].message = 'Updated red-flag record\'s location';
    this.records[index].location = userInfo.location;
    this.records[index].modefiedOn = new Date();
    return this.records[index];
  }
}
export default new Ireporter();
