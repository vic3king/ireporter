/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import db from '../db';
import Helper from '../middleware/helper';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const text = `INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, password)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning id,firstname,lastname,username,isadmin`;
    const values = [
      req.body.firstname.toString().trim(),
      req.body.lastname.toString().trim(),
      req.body.othernames.toString().trim(),
      req.body.email.toString().trim(),
      req.body.phoneNumber.toString().trim(),
      req.body.username.toString().trim(),
      hashPassword,
    ];

    try {
      const { rows } = await db.query(text, values);
      const token = Helper.generateToken(rows[0].id, rows[0].isAdmin);
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error.message);
    }
  },

  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
    if (!req.body.email.toString().trim() || !req.body.password.toString().trim()) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      const {
        firstname, lastname, othernames, email, phoneNumber, username,
      } = rows[0];
      const user = {
        firstname,
        lastname,
        othernames,
        email,
        phoneNumber,
        username,
      };
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user,
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },


};

export default User;
