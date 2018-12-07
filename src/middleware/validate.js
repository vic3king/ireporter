/* eslint-disable max-len */
import Record from '../models/record';

const Validate = {
  postRecord(req, res, next) {
    const errorsMessages = [];
    if (!req.body.title) {
      const error = { title: 'Title is required' };
      errorsMessages.push(error);
    }
    if (!req.body.type) {
      const error = { type: 'Type is required' };
      errorsMessages.push(error);
    }
    if (!req.body.description) {
      const error = { description: 'A Description is required' };
      errorsMessages.push(error);
    }
    if (!req.body.location) {
      const error = { location: 'Location is required' };
      errorsMessages.push(error);
    }
    if (errorsMessages.length !== 0) {
      return res.status(400).json({
        status: 400,
        error: errorsMessages,
      });
    }
    return next();
  },

  isNotValid(req, res, next) {
    const record = Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({
        status: 404,
        error: 'red-flags not found, Enter a valid id',
      });
    }
    return next();
  },
};


export default Validate;
