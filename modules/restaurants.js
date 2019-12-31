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

const getReviews = [];

getReviews.getReviews = function(latitude, longitude) {
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&limit=50&offset=101`;
  // const url = 'https://api.yelp.com/v3/businesses/search?location=seattle&limit=50&offset=101';

  return superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).then(data => {
    const parsedData = JSON.parse(data.text);
    // console.log('LENGTH :', parsedData.businesses.length);
    parsedData.businesses.map(business => {
      if (parseInt(business.rating) < 3.1) {
        // console.log(business.name);
        // console.log(parseInt(business.rating));
        getReviews.push(business);
      }
    })
    return getReviews;
    // console.log('yelpData :', yelpData);
  })
};

{/* <ul>
<% yelpData.forEach(review => { %>
  <div>
    <li><img src="<%= review.image_url %>" alt="yelp image" height="100" width="100" ></li>
    <li><h2><%= review.name %></h2></li>
    <li><p><%= review.rating %></p></li>
  </div>
<% }) %>
</ul> */}

module.exports = getReviews;