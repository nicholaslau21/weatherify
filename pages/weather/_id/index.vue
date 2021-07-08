<template>
  <div v-if="!$fetchState.pending" class="mt-6">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn color="primary" to="/weather"
          ><v-icon left>mdi-chevron-left</v-icon>Back</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto light-blue lighten-4" max-width="400">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ city.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col class="text-h2" cols="6">
                {{ Math.round(data.current.temp) }}&deg;C
              </v-col>
              <v-col cols="6">
                <v-img
                  :src="`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`"
                  alt="Sunny image"
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-list class="transparent">
            <v-list-item v-for="item in forecast" :key="item.day">
              <v-list-item-title>{{ item.day }}</v-list-item-title>

              <v-list-item-icon>
                <v-img :src="item.icon"></v-img>
              </v-list-item-icon>

              <v-list-item-subtitle class="text-right">
                {{ item.temp }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      city: null,
      data: null,
      time: 0,
      forecast: null,
    };
  },
  async fetch() {
    this.city = this.getWeatherByCityId(+this.$route.params.id);

    this.data = await fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${this.city.coord.lat}&lon=${this.city.coord.lon}&exclude=minutely,hourly,alerts&units=metric&appid=ceb54ef9643d2a46bd7e74af4a6f4b99`
    ).then((res) => res.json());

    this.mapForecastData(this.data);
  },
  computed: {
    ...mapGetters('weather', ['getWeatherByCityId']),
  },
  methods: {
    mapForecastData() {
      this.forecast = this.data.daily.slice(1, 6).map((day) => ({
        day: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
          new Date(day.dt * 1000)
        ),
        icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
        temp: `${Math.round(day.temp.max)}\xB0/${Math.round(day.temp.min)}\xB0`,
      }));
    },
  },
};
</script>
