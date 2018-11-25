/* eslint-disable max-len */
import UserModel from '../models/user';

const User = {
  /**
   * Creates a new user.
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  create(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.othernames || !req.body.email || !req.body.phoneNumber || !req.body.username) {
      return res.status(400).send({
        status: 400,
        error: 'Could not create user, All fields are required',
      });
    }
    const user = UserModel.create(req.body);
    return res.status(201).send({
      status: 201,
      data: user,
    });
  },
};


export default User;
