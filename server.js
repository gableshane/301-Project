'use strict';
// DEPENDENCIES
const cors = require('cors');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
require('dotenv').config();

// CONFIG
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// GLOBAL VARIABLES
const PORT = process.env.PORT || 3000;

// IMPORT MODULES
const renderHome = require('./modules/home.js');
const getAirQuality = require('./modules/airQuality');
const getLocation = require('./modules/location');
const getReviews = require('./modules/restaurants');
const getCrime = require('./modules/crime');
const mapDisplay = require('./modules/map');
const getAReview = require('./modules/review-detail');

// MAIN ROUTE HANDLER
async function mainHandler ( req , res ) {
  const userName = req.query.name;
  const returnLocation = await getLocation.getLocation( req , res );
  const location = returnLocation.location;
  const aqData = await getAirQuality( location.lat , location.lng );
  const reviews = await getReviews.getReviews( location.lat , location.lng );
  const seattleCrimeData = await getCrime.getCrime();
  const mapData = await mapDisplay.mapDisplay( location.lat , location.lng );
  const render = new Render(returnLocation.name, aqData.data.AQI, aqData.data.Category.Name, reviews.data, seattleCrimeData, mapData, userName);
  res.render('../public/views/pages/results.ejs', { render : render });
}

app.get('/restaurants/:id', getDetail );

async function getDetail( req , res ) {
  const reviewData = await getAReview.getAReview(req.params.id);
  res.render('../public/views/pages/detail.ejs', {reviewData : reviewData});
}

// CONSTRUCTOR FUNCTION FOR RENDER
function Render(location, aqi, aqiCategory, yelpData, crimeData, mapData, username) {
  this.location = location;
  this.aqi = aqi;
  this.aqiCategory = aqiCategory;
  this.yelpData = yelpData;
  this.crimeData = crimeData;
  this.mapData = mapData;
  this.username = username;
}

// ROUTES
app.get('/', renderHome);
app.get('/location', mainHandler );


// SERVER LISTENS
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
