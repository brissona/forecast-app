const axios = require('axios');

const request = (url) => {
  return axios.get(url, {
    validateStatus: status => status < 500
  })
    .then(response => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

module.exports = request;
