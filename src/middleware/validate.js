/* eslint-disable max-len */
import Record from '../models/record';

const Validate = {
  postRecord(req, res, next) {
    if (!req.body.title || !req.body.type || !req.body.location || !req.body.description || !req.body.comment) {
      return res.status(400).send({
        status: 400,
        error: 'Could not create the record, Kindly enter required fields',
      });
    }
    return next();
  },

  getArecord(req, res, next) {
    const record = Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    return next();
  },
  updateLocation(req, res, next) {
    const record = Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    return next();
  },
  updateComment(req, res, next) {
    const record = Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    return next();
  },
  deleteOneRecord(req, res, next) {
    const record = Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found',
      });
    }
    return next();
  },
};


export default Validate;
