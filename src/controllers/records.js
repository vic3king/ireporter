/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import db from '../db';

const Record = {
  /**
   * Creates A Recod
   * @param {object} req
   * @param {object} res
   * @returns {object} record object
   */
  async createRecord(req, res) {
    const text = `INSERT INTO
      records(title, description, type, owner_id, location, status, comment, message)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.title,
      req.body.description,
      req.body.type,
      req.user.id,
      req.body.location,
      'draft',
      req.body.comment,
      'record created',
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
        error: 'enter a valid type e.g (red-flag, intervention)',
      });
    }
  },
  /**
   * Gets All Records
   * @param {object} req
   * @param {object} res
   * @returns {object} records object
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
        error: error.message,
      });
    }
  },
  /**
   * Get A Record
   * @param {object} req
   * @param {object} res
   * @returns {object} record object
   */
  async getOneRecord(req, res) {
    const text = 'SELECT * FROM records WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'record not found',
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
  async findByType(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE type = $1';
    try {
      const { rows } = await db.query(findOneQuery, [req.params.type]);
      if (!rows) {
        return res.status(404).send({
          status: 404,
          message: 'record not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid type. e.g red-flag, intervention',
      });
    }
  },
  /**
   * Update A Record
   * @param {object} req
   * @param {object} res
   * @returns {object} updated record
   */
  async update(req, res) {
    let type;
    if (req.body.location) {
      type = 'location';
    } else if (req.body.comment) {
      type = 'comment';
    }

    const findOneQuery = 'SELECT * FROM records WHERE id = $1 AND owner_id = $2';
    const updateOneQuery = `UPDATE records
    SET ${type}=$1
    WHERE id=$2 AND owner_id = $3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'record not found',
        });
      }
      const values = [
        req.body.location || req.body.comment || req.body.status,
        req.params.id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({
        status: 200,
        data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
  },
  /**
   * Update A Record
   * @param {object} req
   * @param {object} res
   * @returns {object} updated record
   */
  async updateStatus(req, res) {
    const updateOneQuery = `UPDATE records
    SET status=$1
    WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(updateOneQuery, [req.body.status, req.params.id]);
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
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
  },
  /**
   * Delete A Record
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 200
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM records WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
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
