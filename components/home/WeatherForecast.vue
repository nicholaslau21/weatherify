<template>
  <v-container class="fill-height mb-12">
    <v-row>
      <v-col>
        <span class="text-h4">Current forecast</span>
        <v-spacer></v-spacer>
      </v-col>
      <v-col>
        <v-autocomplete
          dense
          :items="getCities"
          item-text="name"
          item-value="id"
          hide-selected
          placeholder="Add more city"
          @change="getSelectedCityWeather"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-carousel v-model="model" :show-arrows="false" height="150">
          <v-carousel-item
            v-for="weather in getCitiesWeather"
            :key="weather.name"
          >
            <WeatherCard
              class="fill-height px-5"
              :name="weather.name"
              :icon-src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
              :temp="weather.main.temp"
              :city-id="weather.id"
              :lat="weather.coord.lat"
              :lon="weather.coord.lon"
              :is-my-location="weather.isMyLocation"
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WeatherCard from '@/components/weather/WeatherListCard.vue';

export default {
  components: {
    WeatherCard,
  },
  data: () => ({
    model: 0,
  }),
  computed: {
    ...mapGetters('weather', ['getCitiesWeather']),
    ...mapGetters(['getCities']),
  },
  beforeMount() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
  },
  mounted() {
    this.fetchCities();
  },
  methods: {
    ...mapActions('weather', ['getUserCityWeather', 'getSelectedCityWeather']),
    ...mapActions(['fetchCities']),
    success(position) {
      this.getUserCityWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    },
    error() {
      this.$store.commit('UPDATE_SNACKBAR', {
        show: true,
        message: 'Unable to retrieve your location',
      });
    },
  },
};
</script>
