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
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} record object
   */
  createRecord(req, res) {
    if (!req.body.title || !req.body.type || !req.body.location || !req.body.description || !req.body.comment) {
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
   * @returns {object} records object
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
   * @returns {object} updated record(location)
   */
  updatedLocation(req, res) {
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

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated record(comment)
   */
  updatedComment(req, res) {
    const record = UserModel.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    const updatedComment = UserModel.updateComment(req.params.id, req.body);
    return res.status(200).send({
      status: 200,
      data: [updatedComment],
    });
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   */
  deleteOneRecord(req, res) {
    const record = UserModel.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found',
      });
    }
    const data = UserModel.deleteById(req.params.id);
    return res.status(200).send(data);
  },
};


export default Ireporter;
