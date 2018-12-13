/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import db from '../db';

const Validate = {
  validLocation(req, res, next) {
    const longLat = req.body.location.trim();
    if (/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm.test(longLat)) {
      return res.status(400).send({
        status: 400,
        message: 'Invalid location, please ensure you have valid cordinates. e.g 0.00000,0.00000',
      });
    }
    return next();
  },

  async isValidInput(req, res, next) {
    const findOneQuery = 'SELECT * FROM users WHERE username=$1 OR phonenumber=$2 OR email=$3';
    const { rows } = await db.query(findOneQuery, [req.body.username, req.body.phonenumber, req.body.email]);
    if (rows[0]) {
      return res.status(404).send({
        status: 404,
        error: 'username, phonenumber or email already exists',
      });
    }
    return next();
  },
  postRecord(req, res, next) {
    const errorsMessages = [];
    if (!req.body.title || req.body.tile === null) {
      const error = { title: 'Title is required' };
      errorsMessages.push(error);
    }
    if (!req.body.type || req.body.type === null) {
      const error = { type: 'Type is required' };
      errorsMessages.push(error);
    }
    if (!req.body.description || req.body.description === null) {
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
