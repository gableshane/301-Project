// CRYSTAL
'use strict';

const superagent = require('superagent');
require('dotenv').config();

function Yelp(name, yelp_id, image_url, price, rating) {
  this.name = name;
  this.yelp_id = yelp_id;
  this.image_url = image_url;
  this.price = price;
  this.rating = rating;
}

const getReviews = function(request, response) {
  // const url = `https://api.yelp.com/v3/businesses/search?latitude=${request.query.data.latitude}&longitude=${request.query.data.longitude}`;
  const url = 'https://api.yelp.com/v3/businesses/search?location=seattle&limit=50&offset=101';

  // const url = 'https://api.yelp.com/v3/businesses/dxNm-lRgIxN96pEn1OJSlQ/reviews';
  superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).then(data => {
    const parsedData = JSON.parse(data.text);
    console.log('LENGTH :', parsedData.businesses.length);
    // for (let i = 0; i < parsedData.businesses.length; i ++) {
    //   if (parseInt(parsedData.businesses[i].rating) < 3.1) {
    //     console.log(parsedData.businesses[i].name);
    //     console.log(parseInt(parsedData.businesses[i].rating));
    //   }
    // }
    const yelpData = parsedData.businesses.map(business => {
      if (parseInt(business.rating) < 3.1) {
        console.log(business.name);
        console.log(parseInt(business.rating));
        const name = business.name;
        const yelp_id = business.id;
        const image_url = business.image_url;
        const price = business.price;
        const rating = business.rating;
        return new Yelp(name, yelp_id, image_url, price, rating);
      }
    })
    console.log('yelpData :', yelpData);
    response.render('../public/views/pages/results', { yelpData : yelpData });
    // response.status(200).send(yelpData);
  }).catch(err => {
    console.error(err);
    response.status(500).send('Status 500: Internal Server Error');
  })
};

module.exports = getReviews;
