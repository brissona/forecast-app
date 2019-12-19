var express = require('express');
var router = express.Router();
var axios = require('axios');

var API_KEYS = {
  darkSky: 'a55b319b60b5035490f1e8370afbed97',
  smartyStreets: {
    id: 'e950acc4-dc2f-7b75-c68a-b642500c2df7',
    token: 'c8IsiCHDi1jtsNWSK9Nz'
  }
};

function getLatLng(zip) {
  return axios.get('https://us-zipcode.api.smartystreets.com/lookup?auth-id=' + API_KEYS.smartyStreets.id + '&auth-token=' + API_KEYS.smartyStreets.token + '&zipcode=' + zip)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function getWeather(lat, lng) {
  return axios.get('https://api.darksky.net/forecast/' + API_KEYS.darkSky + '/' + lat + ',' + lng)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express'
  });
});

router.post('/', function(req, res) {
  getLatLng(req.body.zipcode)
    .then(function(data) {
      return data[0].zipcodes[0];
    })
    .then(function(data) {
      // If successful pass latitude and longitude properties to getWeather function.
      getWeather(data.latitude, data.longitude)
        .then(function(sum) {
          // Render forecast view with response data from Dark Sky API.
          res.render('forecast', {
            title: 'A post appeared! ' + sum.summary,
            forecast: {
              summary: sum.summary,
              icon: sum.icon,
              days: sum.daily
            }
          });
        });
    })
});

module.exports = router;
