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
      data: [record],
    });
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} records array
   */
  getAllRecords(req, res) {
    const records = UserModel.findAllRecords();
    return res.status(200).send({
      status: 200,
      data: records,
    });
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} record object
   */
  getOneRecord(req, res) {
    const record = UserModel.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    return res.status(200).send({
      status: 200,
      data: [record],
    });
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated record
   */
  update(req, res) {
    const record = UserModel.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    const updatedLocation = UserModel.updateLocation(req.params.id, req.body);
    return res.status(200).send({
      status: 200,
      data: [updatedLocation],
    });
  },
};


export default Ireporter;
