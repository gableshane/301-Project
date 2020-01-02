'use strict';

const superagent = require('superagent');
const pg = require('pg');

// GLOBAL VARIABLES
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// DATABASE
const client = new pg.Client(`${DATABASE_URL}`);
client.on('error', error => console.error(error));
client.connect();


async function getLocation( req , res ) {
  // console.log('-------------------get location!');
  let locationData = {};
  let userId;
  let query = req.query.location;
  let userName = req.query.name;
  let queryUsers = 'SELECT * FROM users WHERE name=$1';
  let queryLocations = 'SELECT * FROM locations WHERE searchquery=$1 AND user_id=$2';
  const data = await client.query( queryUsers , [userName] );
    if (data.rows.length > 0) {
      userId = data.rows[0].id
      await client.query(queryLocations , [ query, userId ] ).then( sql => {
        if (sql.rows.length > 0) {
          locationData.name = sql.rows[0].searchquery;
          locationData.location = { lat : sql.rows[0].latitude, lng : sql.rows[0].longitude }
        }
      })
    } else {
      await client.query('INSERT INTO users (name) VALUES($1) RETURNING id', [userName] ).then( data => {
        userId = data.rows[0].id;
      })
    }
  if (locationData.name) {
    return client.query('SELECT * FROM users LIMIT 1').then( data => {
      console.log('------GET LOCATION VIA DB')
      return locationData;
    })
  }
  return superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GEOCODE_API_KEY}`).then( response => {
    locationData.name = response.body.results[0].address_components[0].short_name.toLowerCase();
    locationData.location = response.body.results[0].geometry.location;
    let values = [locationData.name, locationData.location.lat, locationData.location.lng, userId];
    client.query('INSERT INTO locations (searchquery, latitude, longitude, user_id) VALUES ($1,$2,$3,$4)', values ).then( data => {
      return null;
    })
    console.log('---------GET LOCATION VIA API');
    return locationData;
  })
}

module.exports = getLocation;
