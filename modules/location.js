// JOSHUA

'use strict';

const superagent = require('superagent');
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
var locationInfo = 0;

const getLocation = function ( req , res ) {
  let query = req.query.location;
  let name = req.query.name;
  superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GEOCODE_API_KEY}`).then( response => {
    //console.log(response.body.results[0].geometry.location);
    return response.body.results[0].geometry.location;
  })
}

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData.formatted_address;
  this.latitude = geoData.geometry.location.lat;
  this.longitude = geoData.geometry.location.lng;
}

function displayMap(location) {
  $('#map').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
  &markers=color:blue%7Clabel:S%${location.latitude},${location.longitude}&key=${GEOCODE_API_KEY}`);
}

function setEventListeners() {
  $('#homeForm').on('submit', function (event) {
    event.preventDefault();
  displayMap().render(event);
  });

module.exports = getLocation;
