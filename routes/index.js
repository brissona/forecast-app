const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEYS = {
  darkSky: 'a55b319b60b5035490f1e8370afbed97',
  smartyStreets: {
    id: 'e950acc4-dc2f-7b75-c68a-b642500c2df7',
    token: 'c8IsiCHDi1jtsNWSK9Nz'
  }
};

const request = (url) => {
  return axios.get(url)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const modifyWeatherData = (arr) => {
  return arr.map((item) => {
    const [day, month, date, year] = new Date(item.time * 1000).toDateString().split(' ');
    return Object.assign(item, {
      day,
      month,
      date,
      year,
      humidity: item.humidity * 100,
      precipProbability: item.precipProbability * 100
    })
  });
}

// const getLatLng = (zip) => {
//   return axios.get(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=${API_KEYS.smartyStreets.id}&auth-token=${API_KEYS.smartyStreets.token}&zipcode=${zip}`)
//     .then(response => response.data)
//     .catch(error => console.log(error));
// }

// const getWeather = (lat, lng) => {
//   return axios.get('https://api.darksky.net/forecast/' + API_KEYS.darkSky + '/' + lat + ',' + lng)
//     .then(response => response.data)
//     .catch(error => console.log(error));
// };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Welcome',
    subhead: 'To view this week\'s weather, please provide your zip code in the form below.'
  });
});

router.post('/', function(req, res) {
  // getLatLng(req.body.zipcode)
  request(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=${API_KEYS.smartyStreets.id}&auth-token=${API_KEYS.smartyStreets.token}&zipcode=${req.body.zipcode}`)
    .then(data => data[0].zipcodes[0])
    .then((data) => {
      // Pass latitude and longitude properties to getWeather.
      // getWeather(data.latitude, data.longitude)
      request(`https://api.darksky.net/forecast/${API_KEYS.darkSky}/${data.latitude},${data.longitude}`)
        .then((weather) => {
          // Adds converted date properties from Unix timestamps in API response.
          // Overwrite properties here to percentage before rendering.
          // const dailyForecastData = modifyWeatherData(weather.daily.data);

          // Render forecast view with response data from Dark Sky API.
          res.render('forecast', {
            title: `${data.default_city}, ${data.state_abbreviation} Weather`,
            locationHeading: `7 day weather forecast for ${data.default_city}, ${data.state_abbreviation}`,
            forecast: {
              days: modifyWeatherData(weather.daily.data)
            }
          });
        });
    })
});

module.exports = router;
