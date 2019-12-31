// CRYSTAL
'use strict';

const superagent = require('superagent');
require('dotenv').config();

// function Yelp(name, yelp_id, image_url, price, rating) {
//   this.name = name;
//   this.yelp_id = yelp_id;
//   this.image_url = image_url;
//   this.price = price;
//   this.rating = rating;
// }

const getReviews = {};

getReviews.getReviews = function(latitude, longitude) {
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&limit=50&offset=101`;
  // const url = 'https://api.yelp.com/v3/businesses/search?location=seattle&limit=50&offset=101';

  return superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).then(data => {
    const parsedData = JSON.parse(data.text);
    // console.log('LENGTH :', parsedData.businesses.length);
    const yelpData = parsedData.businesses.map(business => {
      if (parseInt(business.rating) < 3.1) {
        console.log(business.name);
        console.log(parseInt(business.rating));
        getReviews.name = business.name;
        getReviews.yelp_id = business.id;
        getReviews.image_url = business.image_url;
        getReviews.price = business.price;
        getReviews.rating = business.rating;
        return getReviews;
      }
    })
    console.log('yelpData :', yelpData);
  })
};


module.exports = getReviews;
