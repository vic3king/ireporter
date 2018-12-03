/* eslint-disable max-len */
import Record from '../models/record';

const RecordController = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} record object
   */
  createRecord(req, res) {
    const record = Record.createRecord(req.body);
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
    const records = Record.findAllRecords();
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
    const record = Record.findById(req.params.id);
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
    const updatedLocation = Record.updateLocation(req.params.id, req.body);
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
    const updatedComment = Record.updateComment(req.params.id, req.body);
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
    const data = Record.deleteById(req.params.id);
    return res.status(200).send(data);
  },
};


export default RecordController;
