const express = require('express');
const router = express.Router();
const request = require('./shared/request');
const API_KEYS = require('./shared/auth');
const modifyWeatherData = require('./shared/data');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Welcome',
    subhead: 'To view this week\'s weather, please provide your zip code in the form below.'
  });
});

// Handle POST on home page
router.post('/', function(req, res) {
  request(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=${API_KEYS.smartyStreets.id}&auth-token=${API_KEYS.smartyStreets.token}&zipcode=${req.body.zipcode}`)
    .then(data => data[0].zipcodes[0])
    .then((data) => {
      // Pass latitude and longitude properties to Dark Sky request.
      request(`https://api.darksky.net/forecast/${API_KEYS.darkSky}/${data.latitude},${data.longitude}`)
        .then((weather) => {
          // Render forecast view with response data from Dark Sky API.
          res.render('forecast', {
            title: `${data.default_city}, ${data.state_abbreviation} Weather`,
            locationHeading: `7 Day Weather Forecast for ${data.default_city}, ${data.state_abbreviation}`,
            forecast: {
              days: modifyWeatherData(weather.daily.data)
            }
          });
        });
    })
});

module.exports = router;
