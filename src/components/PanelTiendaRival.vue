<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupTiendaRival">
      <v-card class="mx-auto my-12" max-width="350">
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Tienda'+randominttienda+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ fruteriarival.name }} en {{ fruteriarival.ciudad }}</v-card-title>
            </v-col>
            <v-col cols="2"  class="d-flex align-center">
              <v-btn rounded class="justify-center ml-auto white--text" elevation="1" outlined small 
                @click="paneloff()">Salir</v-btn>  
              </v-col>
            </v-row>
          </v-container>
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col cols="12" class="py-3" >
              <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                  @click="Robar( usuario.nombre,fruteriarival.ciudad,fruteriarival.name,fruteriarival.propietario)"
                  >Robar</v-btn>
            </v-col>
            <v-col cols="12" class="py-3">
              <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                 @click="Espiar(usuario.nombre,fruteriarival.ciudad,fruteriarival.name,fruteriarival.propietario)"
                 >Espiar</v-btn>
            </v-col>
            <v-col cols="9" class="py-3 text-center">
              <v-btn rounded  color="primary" elevation="1" outlined small
                @click="Oferta(usuario.nombre,fruteriarival.ciudad,fruteriarival.name,fruteriarival.propietario,oferta)"
                >Oferta</v-btn> 
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="oferta" hide-details single-line type="number" label="Cantidad en Euros"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
               <v-card-text v-if="habilitarEspiar">     
                <div> Tamaño: {{ $store.state.tiendapropia.tamaño }} </div>
                <div> Numero Empleados : {{ resultadoEspiar.numeroEmpleados }} ({{ resultadoEspiar.numeroMaximoEmpleados }} maximo)
                  <v-rating background-color="grey" color="green" :empty-icon=mdiAccountHardHatOutline
                  :full-icon=mdiAccountHardHat hover :length="resultadoEspiar.numeroMaximoEmpleados"
                  readonly size="41" :value=" resultadoEspiar.numeroEmpleados"></v-rating>
                </div>
                <div> Nivel Seguridad : {{ resultadoEspiar.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiStarOutline
                  :full-icon=mdiStar hover length="3" readonly
                  size="41" :value="resultadoEspiar.seguridad"></v-rating>
                </div>   
              </v-card-text> 
            
        </v-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; 
export default {
    props: ['usuario', 'fruteriarival', 'ciudad', 'randominttienda'],
    data() {
    return {
        resultadoRobo:{},
        resultadoOferta:false,
        resultadoEspiar:{},
        habilitarEspiar:false,
        oferta:0,
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupTiendaRival=false;
      },
        Robar(nombreusuario,nombreciudad,nombretienda,nombreUsuarioRival) {
            axios
            .get(this.$store.state.baseUrl+"/RobarTienda/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreTienda="+nombretienda+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response => this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',}))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        Oferta(nombreusuario,nombreciudad,nombretienda,nombreUsuarioRival,oferta) {
            axios
            .get(this.$store.state.baseUrl+"/OfertaTienda/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreTienda="+nombretienda+"&nombreUsuarioRival="+nombreUsuarioRival+"&oferta="+oferta)
            .then(response => this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',}))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        Espiar(nombreusuario,nombreciudad,nombretienda,nombreUsuarioRival) {
          axios
            .get(this.$store.state.baseUrl+"/EspiarTienda/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreTienda="+nombretienda+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response => {
              (this.resultadoEspiar = response.data.tienda);
              this.habilitarEspiar=response.data.resultado;
              this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',});
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});

        }
    }
  
}
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>