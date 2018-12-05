/* eslint-disable max-len */
import Record from '../models/record';

const Validate = {
  postRecord(req, res, next) {
    if (!req.body.title || !req.body.type || !req.body.location || !req.body.description || !req.body.comment) {
      return res.status(400).send({
        status: 400,
        error: {
          title: 'Title is required',
          type: 'Type is required',
          location: 'Location is required',
          description: 'Description is required',
          comment: 'comment is required',
        },
      });
    }
    return next();
  },

  isNotValid(req, res, next) {
    const record = Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found, Enter a valid id',
      });
    }
    return next();
  },
};


export default Validate;
