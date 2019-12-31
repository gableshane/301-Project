'use strict';

const superagent = require('superagent');
require('dotenv').config();


const getReviews = {};

getReviews.getReviews = function(latitude, longitude) {
  getReviews.data = [];
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&limit=50&offset=101`;
  // const url = 'https://api.yelp.com/v3/businesses/search?location=seattle&limit=50&offset=101';

  return superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).then(data => {
    const parsedData = JSON.parse(data.text);
    // console.log('LENGTH :', parsedData.businesses.length);
    parsedData.businesses.map(business => {
      if (parseInt(business.rating) < 3.1) {
        // console.log(business.name);
        // console.log(parseInt(business.rating));
        getReviews.data.push(business);
      }
    })
    return getReviews;
    // console.log('yelpData :', yelpData);
  })
};


module.exports = getReviews;
