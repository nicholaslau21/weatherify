<template>
  <div>
    <v-app-bar fixed app>
      <v-toolbar-title>Weatherify</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-sm-and-up">
        <v-btn @click.stop="drawer = !drawer"> Menu </v-btn>
      </span>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/" text nuxt>
          <v-icon small left>mdi-home</v-icon>
          Home
        </v-btn>
        <v-btn to="/weather" text nuxt>
          <v-icon small left>mdi-cloud</v-icon>
          Weather
        </v-btn>
        <v-btn to="/about" text nuxt>
          <v-icon small left>mdi-information</v-icon>
          About
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          nuxt
          link
        >
          <v-list-item-icon>
            <v-icon small>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
        items: [
          { title: 'Home', link: '/', icon: 'home' }, 
          { title: 'Weather', link: '/weather', icon: 'cloud' }, 
          { title: 'About', link: '/about', icon: 'information' }
        ],
    }
  },
}
</script>
</script>
