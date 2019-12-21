const express = require('express');
const router = express.Router();
const request = require('./shared/request');
const { modifyWeatherData, getTownAndState } = require('./shared/data');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Welcome',
    subhead: 'To view this week\'s weather, please provide your zip code in the form below.'
  });
});

// Handle POST on home page
router.post('/', function(req, res) {
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.zipcode}&key=${process.env.GOOGLE_KEY}`)
    .then(data => data.results)
    .then((location) => {
      const locationObj = location[0];
      const { lat, lng } = locationObj.geometry.location;
      const { town, state } = getTownAndState(locationObj);

      // Pass latitude and longitude properties to Dark Sky request.
      request(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`)
        .then((weather) => {
          // Render forecast view with response data from Dark Sky API.
          res.render('forecast', {
            title: `${town}, ${state} Weather`,
            locationHeading: `7 Day Weather Forecast for ${town}, ${state}`,
            forecast: {
              days: modifyWeatherData(weather.daily.data)
            }
          });
        });
    })
});

module.exports = router;
