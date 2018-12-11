/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import moment from 'moment';
import db from '../db';

const Record = {
  /**
   * Create A Recod
   * @param {object} req
   * @param {object} res
   * @returns {object} record object
   */
  async createRecord(req, res) {
    const text = `INSERT INTO
      records(title, description, type, location, status, comment,message, created_on, modefied_on)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      req.body.title,
      req.body.description,
      req.body.type,
      req.body.location,
      'draft',
      req.body.comment,
      'record created',
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'enter a valid type e.g (red-flag, intervention)',
      });
    }
  },
  /**
   * Get All Record
   * @param {object} req
   * @param {object} res
   * @returns {object} records array
   */
  async getAllRecords(req, res) {
    const findAllQuery = 'SELECT * FROM records';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'server error',
      });
    }
  },
  /**
   * Get A Record
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getOneRecord(req, res) {
    const text = 'SELECT * FROM records WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'record not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },
  /**
   * Update A Record
   * @param {object} req
   * @param {object} res
   * @returns {object} updated record
   */
  async updateLocation(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id=$1';
    const updateOneQuery = `UPDATE records
      SET location=$1,modefied_on=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'record not found',
        });
      }
      const values = [
        req.body.location,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({
        status: 200,
        data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },
  async updateComment(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id=$1';
    const updateOneQuery = `UPDATE records
      SET comment=$1,modefied_on=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'record not found',
        });
      }
      const values = [
        req.body.comment,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({
        status: 200,
        data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },
  /**
   * Delete A Record
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM records WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'record not found',
        });
      }
      return res.status(200).send({ message: 'deleted succesfully' });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },
};

export default Record;
