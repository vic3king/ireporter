DROP DATABASE IF EXISTS ireporter;
CREATE DATABASE ireporter;

\c ireporter;

CREATE TYPE incidentType AS ENUM('red-flag', 'intervention');
CREATE TYPE stat AS ENUM('draft', 'under-investigation', 'rejected', 'resolved');

CREATE TABLE IF NOT EXISTS users(
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
);

CREATE TABLE IF NOT EXISTS records(
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
  owner_id int NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, password, isadmin)
      VALUES('akaniru', 'victory', 'ifeanyi', 'example@gmail.com', '07063212299','vee', '$2a$08$7e/bWKTSvmvI.34fgssyY.N69EYPjTpYLnWKxPN8NJXDZES9Ol69m', 'true');