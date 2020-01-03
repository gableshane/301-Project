'use strict';
// DEPENDENCIES
const superagent = require('superagent');
const pg = require('pg');


// GLOBAL VARIABLES
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const getLocation = {};

// DATABASE
const client = new pg.Client(`${DATABASE_URL}`);
client.on('error', error => console.error(error));
client.connect();


// DATABASE QUERY AND API CALL METHOD
getLocation.getLocation = async function ( req , res ) {
  console.log('-------------------get location!');
  let locationData = {};
  let userId;
  let query = req.query.location;
  let userName = req.query.name;
  let queryUsers = 'SELECT * FROM users WHERE name=$1';
  let queryLocations = 'SELECT * FROM locations WHERE searchquery=$1 AND user_id=$2';
  const data = await client.query( queryUsers , [userName] );
  if (data.rows.length > 0) {
    userId = data.rows[0].id
    const sql = await client.query(queryLocations , [ query, userId ] )
      if (sql.rows.length > 0) {
        locationData.name = sql.rows[0].searchquery;
        locationData.location = { lat : sql.rows[0].latitude, lng : sql.rows[0].longitude }
      }
  } else {
    const response = await client.query('INSERT INTO users (name) VALUES($1) RETURNING id', [userName] );
    userId = response.rows[0].id;
  }
  if (locationData.name) {
    console.log('-------Get location via DB');
      return locationData;
    }
  let result = await superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GEOCODE_API_KEY}`);
  locationData.name = result.body.results[0].address_components[0].short_name.toLowerCase();
  locationData.location = result.body.results[0].geometry.location;
  let values = [locationData.name, locationData.location.lat, locationData.location.lng, userId];
  await client.query('INSERT INTO locations (searchquery, latitude, longitude, user_id) VALUES ($1,$2,$3,$4)', values );
  console.log('---------GET LOCATION VIA API');
  return locationData;
}

module.exports = getLocation;
