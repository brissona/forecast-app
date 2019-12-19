var express = require('express');
var router = express.Router();
var axios = require('axios');

function getWeather() {
  return axios.get('https://api.darksky.net/forecast/a55b319b60b5035490f1e8370afbed97/37.8267,-122.4233')
    .then(function (response) {
      // handle success
      return response.data.currently.summary;
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
  getWeather()
    .then(function(sum) {
      res.render('forecast', {
        title: 'A post appeared!' + req.body.zipcode + ' ' + sum
      });
    })
});

module.exports = router;
