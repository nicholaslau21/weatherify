<template>
  <div class="mt-6">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <WeatherForecast />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WeatherForecast from '@/components/home/WeatherForecast.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    WeatherForecast,
  },
  beforeMount() {
    this.initCitiesWeather();
  },
  methods: {
    ...mapActions('weather', ['initCitiesWeather']),
  },
};
</script>
