<template>
  <div>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrlhttps+'/static/España.jpg'">
  </v-img>
      <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">España</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarEspaña()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/Alemania.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Alemania</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarAlemania()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/Francia.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Francia</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarFrancia()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/Italia.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Italia</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarItalia()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/EstadosUnidos.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Estados Unidos</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarEstadosUnidos()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/China.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">China</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarChina()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
  <v-card
    class="mx-auto"
    max-width="350"
  >
  <v-img max-height="350" max-width="350" :src="$store.state.baseUrl+'/static/ReinoUnido.jpg'">
  </v-img>
  <v-row>
        <v-col cols="7">
          <v-card-title class="text--primary text-center">Reino Unido</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-btn class="mt-4" color="primary" @click="entrarReinoUnido()">Jugar</v-btn>
        </v-col>
      </v-row>
  </v-card>
  <v-divider vertical></v-divider>
</div>
</template>
  


<script>

  export default {
    data() {
      return {
        
      };
    },
     methods: {
      entrarEspaña(){
      this.$router.push("/guiaTierraTesoro");
    },
    entrarItalia(){
      this.$router.push("/enDesarrollo");
    },
    entrarFrancia(){
      this.$router.push("/enDesarrollo");
    },
    entrarAlemania(){
      this.$router.push("/enDesarrollo");
    },
    entrarReinoUnido(){
      this.$router.push("/enDesarrollo");
    },
    entrarEstadosUnidos(){
      this.$router.push("/enDesarrollo");
    },
    entrarChina(){
      this.$router.push("/enDesarrollo");
    }
    }, 
  };
</script>

