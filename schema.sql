DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  searchquery VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  user_id INTEGER REFERENCES users(id)
)