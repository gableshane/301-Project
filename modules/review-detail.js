'use strict';

const superagent = require('superagent');
require('dotenv').config();


const getAReview = {};

getAReview.getAReview = function(id) {
  // id = '-wYVSpfXpqojw3WjoUFIUQ';
  // const url = `https://api.yelp.com/v3/businesses/-wYVSpfXpqojw3WjoUFIUQ/reviews`;
  // console.log('----------getAReview -id :', id)
  const url = `https://api.yelp.com/v3/businesses/${id}/reviews`;

  return superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).then(data => {
    const parsedData = JSON.parse(data.text);
    const worstReview = parsedData.reviews.sort((a, b) => {
      if( a.rating > b.rating ) {
        return 1;
      } else if ( a.rating < b.rating) {
        return -1;
      } else {
        return 0;
      }
    })
    return worstReview[0];
    // res.render('../public/views/pages/detail.ejs', { reviewData : worstReview[0] });
  })
}

module.exports = getAReview;
