<template>

  <!-- <v-carousel
  height="380"
  weight="230"
  >  -->
  <v-container>
      <v-row>
        <v-col cols="6">
        <v-btn class="mt-4" color="primary" @click="logearse()">Login</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="mt-4" color="primary" @click="registrarse()">Registrarse</v-btn>
        </v-col>
      </v-row>
      <div>
        <v-spacer></v-spacer>
        <h1 class="text-center pt-6">
          Guia
        </h1>
        <v-spacer></v-spacer>
        <p class="text-sm-left pa-6">
          El objetivo es conseguir la mayor cantidad de dinero antes que termine la partida.  Podrás robar y realizar ofertas durante la partida.
          Consejos:
          1- Protégete para evitar que te roben.
          2- Comienza produciendo la mayor cantidad de productos en una parcela.
          3- Vende la mayor cantidad de productos en la tienda.
          4- Cuando avances en el juego especializa las parcelas en un tipo de producción (Produce los productos típicos de la ciudad)
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia1.png'"></v-img>
        <p class="text-sm-left pa-6">

          Selecciona una ciudad del mapa
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia2.png'"></v-img>
        <p class="text-sm-left pa-6">

          Dentro de la ciudad, tenemos: 
            Parcelas Libre (azul)
            Parcelas Propias (verde)
            Parcelas del rival (rojo)
            Tiendas (icono tienda)
            Casas (icono casa)
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia3.png'"></v-img>
        <p class="text-sm-left pa-6">

          Para poder trabajar en una ciudad lo primero que tienes que hacer es comprar una casa. Para ello entra a una de las casas
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia4.png'"></v-img>
        <p class="text-sm-left pa-6">

          Compra una plantación y rellena de productos las plantaciones
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia5.png'"></v-img>
        <p class="text-sm-left pa-6">

          Contrata empleados en el apartado EMPLEADOS y mejora la seguridad y la calidad del terreno en los siguientes apartados.
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia6.png'"></v-img>
        <p class="text-sm-left pa-6">

          Compra una tienda y rellena los productos de la tienda, contrata empleados y mejora la seguridad
        </p>
        <v-img max-height="400" max-width="350" :src="$store.state.baseUrl+'/static/guia7.png'"></v-img>
      </div>
    </v-container>
  

    


    <!-- <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
    <template v-slot:prev="{ on, attrs }">
      <v-btn
        color="info"
        v-bind="attrs"
        v-on="on"
        x-small
        rounded
      > &lt; </v-btn>
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-btn
        color="info"
        v-bind="attrs"
        v-on="on"
        x-small
        rounded
      > &gt; </v-btn>
    </template>
  </v-carousel> -->

</template>
  


<script>

  export default {
    data() {
      return {
        items: [
          {
            src: this.$store.state.baseUrl+'/static/guia1.png',
          },
          {
            src: this.$store.state.baseUrl+'/static/guia2.png',
          },
          {
            src: this.$store.state.baseUrl+'/static/guia3.png',
          },
          {
            src: this.$store.state.baseUrl+'/static/guia4.png',
          },
          {
            src: this.$store.state.baseUrl+'/static/guia5.png',
          },
          {
            src: this.$store.state.baseUrl+'/static/guia6.png',
          },
          {
            src: this.$store.state.baseUrl+'/static/guia7.png',
          },
        ],
      };
    },
     methods: {
      registrarse(){
      this.$router.push("/register");
    },
    logearse(){
      this.$router.push("/login");
    }
    }, 
  };
</script>

