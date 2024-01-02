<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupParcelaLibre">
      <v-card class="mx-auto my-12" max-width="350">
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Parcela'+randomintparcela+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ parcela.name }} en {{ parcela.ciudad }}</v-card-title>
            </v-col>
            <v-col cols="2"  class="d-flex align-center">
              <v-btn rounded class="justify-center ml-auto white--text" elevation="1" outlined small 
                  @click="paneloff()">Salir</v-btn>   
              </v-col>
            </v-row>
          </v-container>
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col cols="12" class="py-3 text-center" >
              <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                @click="Robar(usuario.nombre,parcela.ciudad,parcela.name,parcela.propietario)"
                  >Robar</v-btn>
            </v-col>
            <v-col cols="12" class="py-3 text-center">
              <v-btn rounded  class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                @click="comprarParcela(usuario.nombre,parcela.ciudad,parcela.name, parcela.precio)"
                >Comprar</v-btn> 
            </v-col>
          </v-row>
        </v-container>
               <v-card-text>
                <div> Precio: {{ parcela.precio }} </div>     
                <div> Tamaño Plantaciones: {{ parcela.tamano }} </div>
              </v-card-text>   
        </v-card>
    </div>
  </template>
  
<script>
import axios from 'axios'; 
export default {
    props: ['usuario', 'parcela', 'randomintparcela'],
    data() {
    return {
        resultadoRobo:false,
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupParcelaLibre=false;
      },
        Robar(nombreusuario,nombreciudad,nombreparcela,nombreUsuarioRival) {//revisar nombreUsuarioRival, seria parcela libre
          axios
            .get(this.$store.state.baseUrl+"/RobarParcela/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreParcela="+nombreparcela+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response => this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje, type: response.data.tipo,}))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
        },
        comprarParcela(nombreusuario,nombreciudad,nombreparcela,precio) {
          axios
          .get(this.$store.state.baseUrl+"/comprarParcela/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreParcela="+nombreparcela+"&precio="+precio)
          .then(response => {
            this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje, type: response.data.tipo,});
            axios
              .get(this.$store.state.baseUrl+"/Parcelas/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
              .then(response => (this.$store.state.parcelas = response.data))
              .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            this.$store.state.showPopupParcelaLibre=false;
          })
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});  
        }
    }
  
}
</script>
  