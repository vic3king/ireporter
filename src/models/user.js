import uuid from 'uuid';

class IreporterUser {
  /**
   * class constructor
   * @param {object} userInfo
   */
  constructor() {
    this.users = [];
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
      tokens: [],
      isAdmin: false,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * @returns {object} returns all records
   */
  findAllUsers() {
    return this.users;
  }

  /**
   * @param {uuid} id
   * @returns {object} returns a record
   */
  findByToken(token) {
    return this.users.find(user => user.token === token);
  }
}
export default new IreporterUser();
