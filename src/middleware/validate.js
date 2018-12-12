/* eslint-disable max-len */
import { isLatLong } from 'validator';
import jwt from 'jsonwebtoken';


const Validate = {
  validLocation(req, res, next) {
    const longLat = req.body.location.trim();
    if (!isLatLong(longLat)) {
      return res.status(400).send({
        status: 400,
        message: 'Invalid location, please ensure you have valid cordinates. e.g 0.00000,0.00000',
      });
    }
    return next();
  },

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

  async isAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded.isAdmin === false) {
      return res.status(400).json({
        status: 400,
        error: 'only admin users have access to this route',
      });
    }
    return next();
  },
};


export default Validate;
