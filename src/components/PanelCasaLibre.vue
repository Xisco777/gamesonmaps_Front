<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupCasaLibre">
      <v-card class="mx-auto my-12" max-width="350">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Casa'+randomintcasa+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ casa.name }} en {{ ciudad.name }}</v-card-title>
            </v-col>
            <v-col cols="2"  class="d-flex align-center">
              <v-btn rounded class="justify-center ml-auto white--text" elevation="1" outlined small 
                @click="paneloff()">Salir</v-btn>  
              </v-col>
            </v-row>
          </v-container>
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col cols="12" class="py-3 text-center">
              <v-btn rounded  class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                @click="comprarCasa(usuario.nombre,ciudad.name,casa.name,casa.precio)"
                >Comprar</v-btn> 
            </v-col>
          </v-row>
        </v-container>
               <v-card-text>
                <div> Precio: {{ casa.precio }} Euros</div>     
              </v-card-text> 
            
        </v-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; 
export default {
    props: ['usuario', 'casa', 'ciudad','randomintcasa'],
    data() {
    return {
        resultadoRobo:false,
        resultadoOferta:false,
        resultadoEspiar:{},
        habilitarEspiar:false,
        oferta:123,
        usuarioo:{}
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupCasaLibre=false;
      },
        comprarCasa(nombreusuario,nombreciudad,nombreCasa,precio) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
          .get(this.$store.state.baseUrl+"/comprarCasa/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreCasa="+nombreCasa+"&precio="+precio)
          .then(response => {
            this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje, type: response.data.tipo,});
            this.$store.state.ciudadPropia=true;
              //1-ObtenerParcelas
            axios
              .get(this.$store.state.baseUrl+"/Parcelas/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
              .then(response => {(this.$store.state.parcelas = response.data); console.log(response.data)})
              .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            //2-ObtenerTiendas
            axios
              .get(this.$store.state.baseUrl+"/Fruterias/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
              .then(response => (this.$store.state.fruterias = response.data))
              .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            //3-ObtenerCasas
            axios
              .get(this.$store.state.baseUrl+"/casas/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
              .then(response => (this.$store.state.casas = response.data))
              .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});})
            this.$store.state.showPopupCasaLibre=false;
          })
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});       
        }

    } 
}
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>