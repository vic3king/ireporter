/* eslint-disable no-console */
const {
  Pool,
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, ssl: true,
});

pool.on('connect', () => {
  console.log('connected to the db');
});
const createAdmin = () => {
  const user = ` INSERT INTO
  users(firstname, lastname, othernames, email, phoneNumber, username, password, isadmin)
  VALUES('akaniru', 'victory', 'ifeanyi', 'example@gmail.com', '07063212299','vee', '$2a$08$7e/bWKTSvmvI.34fgssyY.N69EYPjTpYLnWKxPN8NJXDZES9Ol69m', 'true');`;

  pool.query(user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createType = () => {
  const type = `
  CREATE TYPE incidentType AS ENUM('red-flag', 'intervention');
  CREATE TYPE stat AS ENUM('draft', 'under-investigation', 'rejected', 'resolved');
 `;

  pool.query(type)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const dropType = () => {
  const type = `DROP TYPE IF EXISTS incidentType;
  DROP TYPE IF EXISTS stat`;
  pool.query(type)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


/**
 * Create Tables
 */
const createRecordTable = async () => {
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
        images VARCHAR[],
        videos VARCHAR[],
        modefied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner_id serial NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      
      );
      `;

  await pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
/**
 * Create Tables
 */
const createUserTable = async () => {
  const queryText = ` 
     CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        othernames VARCHAR(50) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        phoneNumber VARCHAR(128) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL UNIQUE,
        registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modefied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isAdmin boolean NOT NULL DEFAULT false
      )
      `;

  await pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Drop Tables
 */
const dropTables = async () => {
  const queryText = `DROP TABLE IF EXISTS records;
  DROP TABLE IF EXISTS users`;
  await pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * Create All Tables
 */
const createAllTables = async () => {
  await dropTables();
  await createUserTable();
  await createRecordTable();
  pool.end();
};

module.exports = {
  createAllTables,
  createRecordTable,
  createUserTable,
  dropTables,
  createAdmin,
  createType,
  dropType,
};

require('make-runnable');
