<template>
  <div>
    <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/LandTresure.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Tierra y Tesoro</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarLandAndTreasure()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/WordManager.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Word Manager</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarWordManager()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <div class="grey--text mt-4">LA COMPAÑIA</div>
  <div class="grey--text mt-4" v-on:click="acerca()">Acerca de Games On Maps</div>
  <div class="grey--text mt-4" v-on:click="productos()">Productos</div>
  <div class="grey--text mt-4">ASISTENCIA</div>
  <div class="grey--text mt-4" v-on:click="preguntas()">Preguntas frecuentes</div>
  <div class="grey--text mt-4" v-on:click="contactar()">Contactar con el servicio de asistencia</div>
  <div class="grey--text mt-4">RECURSOS</div>
  <div class="grey--text mt-4" v-on:click="proteccion()">Protección de datos</div>
  <div class="grey--text mt-4" v-on:click="cookies()">Configuracion de Cookies</div>
  <div class="grey--text mt-4">SIGUENOS EN:</div>
  <v-row>
    <v-col cols="3">
      
      <v-btn rounded class="mt-4" color="primary" @click="entrarFacebook()">
        <v-icon>{{ icons.mdiFacebook }}</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn rounded class="mt-4" color="primary" @click="entrarTwitter()">
        <v-icon>{{ icons.mdiAlphaX }}</v-icon>
      </v-btn>
    </v-col> 
    <v-col cols="3">
      <v-btn rounded class="mt-4" color="primary" @click="entrarYoutuber()">
        <v-icon>{{ icons.mdiYoutube }}</v-icon>
      </v-btn>
    </v-col> 
  </v-row>
</div>

</template>
  


<script>
import {
  mdiFacebook,
  mdiAlphaX,
  mdiYoutube,
  } from '@mdi/js';
  export default {
    data() {
      return {
        icons: {
          mdiFacebook,
          mdiAlphaX,
          mdiYoutube,
        },
      };
    },
     methods: {
      entrarLandAndTreasure(){
        this.$store.state.titulo="Tierra y Tesoro";
      this.$router.push("/seleccionTierraTesoro");
    },
    entrarWordManager(){
      this.$store.state.titulo="World Manager";
      this.$router.push("/enDesarrollo");
    },
    entrarFacebook(){
      window.location.href = "https://www.facebook.com/pratsquilez";
    },
    entrarTwitter(){
      window.location.href = "https://twitter.com/fpratsquilez";
    },
    entrarYoutuber(){
      window.location.href = "https://www.youtube.com/channel/UCpCyOFMyMF7j8_XriAnEK9A";
    },
    acerca(){
      this.$router.push("/enDesarrollo");
    },
    productos(){
      this.$router.push("/enDesarrollo");
    },
    preguntas(){
      this.$router.push("/enDesarrollo");
    },
    contactar(){
      this.$router.push("/enDesarrollo");
    },
    proteccion(){
      this.$router.push("/enDesarrollo");
    },
    cookies(){
      this.$router.push("/enDesarrollo");
    }
    }, 
  };
</script>

