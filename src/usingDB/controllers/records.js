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
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
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
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
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
        return res.status(404).send({ message: 'record not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Update A Record
   * @param {object} req
   * @param {object} res
   * @returns {object} updated record
   */
  async updateRecord(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id=$1';
    const updateOneQuery = `UPDATE records
      SET location=$1,comment=$2,modified_date=$3
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'record not found' });
      }
      const values = [
        req.body.location || rows[0].location,
        req.body.comment || rows[0].comment,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
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
        return res.status(404).send({ message: 'record not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Record;
