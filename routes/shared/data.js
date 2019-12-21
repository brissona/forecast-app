// @prop arr: daily forecast array (8 days) from Dark Sky API response.
// 
// Adds converted date properties from Unix timestamps in API response.
// Overwrites humidity and precipProbability properties to percentage before rendering.
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
};

const getTownAndState = (data) => {
  return data.address_components
    .filter(ele => ele.types.includes("administrative_area_level_1") || ele.types.includes("locality"))
    .reduce((acc, curr) => {
      if (curr.types.includes("administrative_area_level_1")) acc.state = curr.short_name;
      else acc.town = curr.short_name;
      return acc;
    },{});
};

module.exports = {
  modifyWeatherData,
  getTownAndState
};
