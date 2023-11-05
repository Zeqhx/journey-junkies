CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Create the User table
CREATE TABLE "User" (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255),
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  nationality VARCHAR(255),
  activedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  joindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  birthdate DATE, 
  image TEXT,
  isadmin BOOLEAN NOT NULL DEFAULT FALSE,
  viewcount INTEGER,
  verified BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create the Post table
CREATE TABLE Post (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author VARCHAR(255) REFERENCES "User"(id),
  title VARCHAR(255),
  content TEXT,
  description TEXT,
  image TEXT,
  rating FLOAT
);

-- Create the Rating table
CREATE TABLE Rating (
  post uuid REFERENCES Post(id),
  author VARCHAR(255) REFERENCES "User"(id),
  rate FLOAT
);

-- Create the Comments table
CREATE TABLE Comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post uuid REFERENCES Post(id),
  author VARCHAR(255) REFERENCES "User"(id),
  comment TEXT
);