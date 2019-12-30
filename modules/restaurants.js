// CRYSTAL
'use strict';

const superagent = require('superagent');
require('dotenv').config();

const getReviews = {}

getReviews.getReviews = function(lat, long) {
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}`;
  // const seattle_url = 'https://api.yelp.com/v3/businesses/search?location=seattle&limit=50&offset=101';

  superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).then(data => {
    const parsedData = JSON.parse(data.text);
    console.log('LENGTH :', parsedData.businesses.length);
    const yelpData = parsedData.businesses.map(business => {
      if (parseInt(business.rating) < 3.1) {
        console.log(business.name);
        console.log(parseInt(business.rating));
        getReviews.name = business.name;
        getReviews.yelp_id = business.id;
        getReviews.image_url = business.image_url;
        getReviews.price = business.price;
        getReviews.rating = business.rating;
      }
    })
    console.log('yelpData :', yelpData);
    // response.render('../public/views/pages/results', { yelpData : yelpData });
  })
};

module.exports = getReviews;


// <!-- FIX -->
// <p>Yelp Review</p>
// <ul>
//  <% yelpData.forEach(data => { %>
//    <% if (data !== undefined) { %>
//      <li><%= data.name %></li>
//      <li><%= data.rating %></li>
//    <% } %>
//  <% }) %>
// </ul>
// <!-- FIX -->