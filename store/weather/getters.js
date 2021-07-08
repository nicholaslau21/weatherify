export default {
  getCitiesWeather: (state) => state.cities_weather,
  getWeatherByCityId: (state) => (cityId) => {
    return state.cities_weather.find((city) => city.id === cityId);
  },
};
