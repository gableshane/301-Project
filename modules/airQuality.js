'use strict';

const superagent = require('superagent');

const AQ_API_KEY = process.env.AQ_API_KEY;
const lat = 47.60;
const lon = -122.33;

const getAirQuality = function ( req , res ) {
  superagent.get(`http://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${lat}&longitude=${lon}&distance=50&API_KEY=${AQ_API_KEY}`).then( aqData => {
    const airQuality = aqData.body[0];
    res.render('../public/views/pages/results.ejs', { airQuality : airQuality });
  })
}
module.exports = getAirQuality;