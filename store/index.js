export const state = () => ({
  cities: [],
  snackbar: {
    show: false,
    variant: 'success',
    message: '',
  },
});

export const actions = {
  async fetchCities({ commit }) {
    await this.$axios.get('/cities.json').then((res) => {
      commit(
        'SET_CITIES',
        res.data.filter((city) => city.country === 'MY')
      );
    });
  },
};

export const mutations = {
  SET_CITIES(state, payload) {
    state.cities = payload;
  },
  UPDATE_SNACKBAR(state, settings) {
    state.snackbar = {
      ...state.snackbar,
      ...settings
    }
  }
};

export const getters = {
  getCities: (state, getters) => {
    return state.cities.filter(
      (city) => !getters['weather/getWeatherByCityId'](city.id)
    );
  },
};
