<template>
  <v-app id="vcrm">
      <v-navigation-drawer
      class="blue lighten-5" mini-variant-width="70" width="250" light v-model="drawer" app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="item in AppMenu" :key="item.title" @click="handleNavigtiion(item.link)" router>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>

          <v-list-item  v-if="$store.state.partida" @click="partidasFuncion(partidas.link)">
            <v-list-item-title>{{partidas.title}}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app elevation=1 color="indigo darken-4">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-row>
            <v-col cols="3">
              <v-img max-height="50" max-width="50" :src="$store.state.baseUrl+'/static/icono50.png'"></v-img>
            </v-col>
            <v-col cols="9" style="font-style: italic;" class=" headline  white--text pt-6">{{ $store.state.titulo }}</v-col>
          </v-row>
        </v-app-bar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <notifications group="foo" />
  </v-app>
  
</template>

<script>
import Vue from 'vue';
import Notifications from 'vue-notification';
Vue.use(Notifications)
import {
  mdiMessage,
  mdiStore,
  mdiEyeRefreshOutline,
  mdiHomeGroup,
  mdiCounter,
  mdiCastAudioVariant,
  mdiCurrencyEur,
  mdiMenu,
  } from '@mdi/js';



export default Vue.extend({
  name: 'App',

  data: () => ({
    mdiMenu :mdiMenu,
    mdiCurrencyEur:mdiCurrencyEur,
    drawer: false,
    group: null,
    collapseOnScroll:true,
    signedIn:true,
    icons: {
        mdiMessage,
        mdiStore,
        mdiEyeRefreshOutline,
        mdiHomeGroup,
        mdiCounter,
      },
      registrado:false,
      partidas:{
      icon: 'mdi-account-group',
      title: 'Partidas',
      vertical: 'Partidas',
      link: '/partidas'
    },
    AppMenu: [
    {
      icon: 'mdi-view-dashboard',
      title: 'Principal',
      vertical: 'Principal',
      link: '/'
    },
    {
      icon: 'mdi-view-dashboard',
      title: 'Guía',
      vertical: 'Guía',
      link: '/guiaTierraTesoro'
    },
    {
      icon: 'mdi-account-group',
      title: 'Login',
      vertical: 'Login',
      link: '/login'
    },
    {
      icon: 'mdi-book-multiple',
      title: 'Registrarse',
      vertical: 'Registrarse',
      link: '/register'
    },
    {
      icon: 'mdi-information-outline',
      title: 'Foro',
      vertical: 'Foro',
      link: '/foro'
    }
    ],
  }),
  methods: {

    handleNavigtiion(item){
      console.log(item)
    this.$router.push(item);

  },
  partidasFuncion(item){

      console.log(item)
    this.$router.push(item);
  }
  },
  watch: {
      group () {
        this.drawer = false
      },
    },
  components: {
      
    },
});
</script>

<style>
.message {
  color: white;
  background-color: green;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
}
</style>
