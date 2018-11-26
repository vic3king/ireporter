/* eslint-disable max-len */
import UserModel from '../models/user';

const Ireporter = {
  /**
   * Creates a new user.
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  createUser(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.othernames || !req.body.email || !req.body.phoneNumber || !req.body.username) {
      return res.status(400).send({
        status: 400,
        error: 'Could not create user, All fields are required',
      });
    }
    const user = UserModel.createUser(req.body);
    return res.status(201).send({
      status: 201,
      data: user,
    });
  },

  createRecord(req, res) {
    if (!req.body.title || !req.body.type || !req.body.location || !req.body.description) {
      return res.status(400).send({
        status: 400,
        error: 'Could not create the record, Kindly enter required fields',
      });
    }
    const record = UserModel.createRecord(req.body);
    return res.status(201).send({
      status: 201,
      data: record,
    });
  },
};


export default Ireporter;
