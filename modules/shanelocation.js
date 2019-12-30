'use strict';

const superagent = require('superagent');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

const getLocation = function ( req , res ) {
  let query = req.query.location;
  let name = req.query.name;
  superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GEOCODE_API_KEY}`).then( response => {
    console.log(response.body.results[0].geometry.location);
    return response.body.results[0].geometry.location;
  })
}
module.exports = getLocation;
