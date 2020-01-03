'use strict';

const superagent = require('superagent');
const AQ_API_KEY = process.env.AQ_API_KEY;

async function getAirQuality ( lat , lng ) {
  console.log('-----------getAirQuality!!');
  let aqData = await superagent.get(`http://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${lat}&longitude=${lng}&distance=50&API_KEY=${AQ_API_KEY}`);
  getAirQuality.data = aqData.body[0];
  return getAirQuality;
}
module.exports = getAirQuality;
