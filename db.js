/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createType = () => {
  const type = `
  CREATE TYPE incidentType AS ENUM('red-flag', 'intervention');
  CREATE TYPE stat AS ENUM('draft', 'under-investigation', 'rejected', 'resolved');
 `;

  pool.query(type)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropType = () => {
  const type = `DROP TYPE IF EXISTS incidentType;
  DROP TYPE IF EXISTS stat`;
  pool.query(type)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create Tables
 */
const createRecordTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
      records(
        id serial PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        description VARCHAR(128) NOT NULL,
        type incidenttype NOT NULL,
        location VARCHAR(50) NOT NULL,
        status stat NOT NULL,
        comment VARCHAR(128) NOT NULL,
        message VARCHAR(50) NOT NULL,
        images VARCHAR[] DEFAULT '{}',
        videos VARCHAR[] DEFAULT '{}',
        modefied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner_id serial NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      
      );
      `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err.message);
      pool.end();
    });
};
/**
 * Create Tables
 */
const createUserTable = () => {
  const queryText = ` 
     CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        othernames VARCHAR(50) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        phoneNumber VARCHAR(128) NOT NULL,
        username VARCHAR(50) NOT NULL,
        registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modefied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isAdmin boolean NOT NULL DEFAULT false
      )
      `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err.message);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = `DROP TABLE IF EXISTS records;
  DROP TABLE IF EXISTS users`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createRecordTable();
};
module.exports = {
  createAllTables,
  createRecordTable,
  createUserTable,
  dropTables,
  createType,
  dropType,
};

require('make-runnable');
