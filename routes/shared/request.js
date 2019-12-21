const axios = require('axios');

const request = (url) => {
  return axios.get(url)
    .then(response => response.data)
    .catch(error => console.log(error));
};

module.exports = request;
