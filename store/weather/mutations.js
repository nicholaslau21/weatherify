export default {
  INIT_CITIES_WEATHER(state, payload) {
    state.cities_weather = payload;
  },
  SET_CITIES_WEATHER(state, payload) {
    const cityWeather = state.cities_weather.findIndex(
      (weather) => weather.id === payload.id
    );

    if (cityWeather > -1) {
      state.cities_weather[cityWeather] = payload;
    } else {
      state.cities_weather.push(payload);
    }

    localStorage.setItem('savedWeathers', JSON.stringify(state.cities_weather));
  },
  REMOVE_WEATHER(state, payload) {
    const cityWeather = state.cities_weather.findIndex(
      (weather) => weather.id === payload
    );

    if (cityWeather > -1) {
      state.cities_weather.splice(cityWeather, 1);
    }

    localStorage.setItem('savedWeathers', JSON.stringify(state.cities_weather));
  },
};
