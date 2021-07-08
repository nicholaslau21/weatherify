<template>
  <v-app>
    <TopNav />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
    <v-snackbar
      :value="show"
      :multi-line="true"
      :right="true"
      :top="true"
      :timeout="6000"
      :color="$store.state.snackbar.variant"
    >
      {{ $store.state.snackbar.message }}
      <v-btn
        dark
        text
        @click="$store.commit('UPDATE_SNACKBAR', { show: false })"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import TopNav from '@/components/TopNav.vue';
import Footer from '@/components/Footer.vue';
import { mapState } from 'vuex';

export default {
  components: {
    TopNav,
    Footer,
  },
  computed: {
    ...mapState({
      show: (state) => state.snackbar.show,
    }),
  },
};
</script>
