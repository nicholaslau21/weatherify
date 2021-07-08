export default {
  initCitiesWeather({ commit, dispatch }) {
    if (localStorage.getItem('savedWeathers')) {
      commit(
        'INIT_CITIES_WEATHER',
        JSON.parse(localStorage.getItem('savedWeathers'))
      );
    }

    [6697380, 1732738, 1732752, 1732869, 1732903].forEach((cityId) => {
      dispatch('getSelectedCityWeather', cityId);
    });
  },
  async getUserCityWeather({ commit }, payload) {
    let data = await this.$axios.$get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${payload.lat}&lon=${payload.lon}&units=metric&appid=ceb54ef9643d2a46bd7e74af4a6f4b99`
    );

    data = { ...data, isMyLocation: true };

    commit('SET_CITIES_WEATHER', data);
  },
  async getSelectedCityWeather({ commit }, payload) {
    let data = await this.$axios.$get(
      `http://api.openweathermap.org/data/2.5/weather?id=${payload}&units=metric&appid=ceb54ef9643d2a46bd7e74af4a6f4b99`
    );

    data = { ...data, isMyLocation: false };

    commit('SET_CITIES_WEATHER', data);
  },
  deleteWeather({ commit }, payload) {
    commit('REMOVE_WEATHER', payload);
  },
};
