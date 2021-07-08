<template>
  <v-card class="light-blue lighten-4">
    <div class="d-flex flex-no-wrap">
      <div>
        <v-card-title class="text-h5" v-text="name"></v-card-title>
        <v-card-subtitle>{{
          isMyLocation ? 'My Location' : ''
        }}</v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <v-avatar class="ma-3" size="80" tile>
        <v-img :src="iconSrc"></v-img>
      </v-avatar>
      <v-avatar class="ma-3" size="80" tile>
        <span class="text-h4">{{ Math.round(temp) }}&deg;C</span>
      </v-avatar>
      <v-card-actions class="ml-6">
        <v-spacer></v-spacer>
        <v-btn large icon @click="deleteWeather(cityId)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn large icon :to="'/weather/' + cityId" nuxt>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    iconSrc: {
      type: String,
      default: '',
    },
    temp: {
      type: Number,
      default: 0,
    },
    cityId: {
      type: Number,
      default: null,
    },
    lat: {
      type: Number,
      default: null,
    },
    lon: {
      type: Number,
      default: null,
    },
    isMyLocation: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions('weather', ['deleteWeather']),
  },
};
</script>
