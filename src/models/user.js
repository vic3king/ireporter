import uuid from 'uuid';

class User {
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
  create(userInfo) {
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
}
export default new User();
