'use strict';

const superagent = require('superagent');
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

const mapDisplay = {}

mapDisplay.mapDisplay = function (latitude, longitude) {
  console.log('-----------mapDisplay!!');
  return superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},
  ${longitude}&key=${GEOCODE_API_KEY}`).then(response => {
    let city = response.body.results[0].address_components[4].short_name;
    return {url: `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=600x400&maptype=roadmap&key=${GEOCODE_API_KEY}`}
  });
};  

module.exports = mapDisplay;