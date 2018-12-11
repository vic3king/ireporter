/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import moment from 'moment';
import db from '../db';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async createUser(req, res) {
    const text = `INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, registered)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      req.body.phoneNumber,
      req.body.username,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
};

export default User;
