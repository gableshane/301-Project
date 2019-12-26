'use strict';

const superagent = require('superagent');

const AQ_API_KEY = process.env.AQ_API_KEY;
const lat = 47.60; // test data
const lon = 122.33; // test data

const getAirQuality = function (req , res ) {
  superagent.get(``).then( airData => { // NEED API URL...
    console.log(airData);
  }).catch( error => {
    console.log('The getAirQuality API call failed:', error);
  })
  res.render('../public/views/pages/results.ejs');
}

module.exports = getAirQuality;
