<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupParcelaRival">
      <v-card class="mx-auto my-12" max-width="350">
        <v-img height="250" :src="$store.state.baseUrl + '/static/Parcela'+randomintparcela+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ parcelarival.name }} en {{ parcelarival.ciudad }}</v-card-title>
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
                  @click="Robar( usuario.nombre,parcelarival.ciudad,parcelarival.name,parcelarival.propietario)"
                  >Robar</v-btn>
            </v-col>
            <v-col cols="12" class="py-3">
              <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                 @click="Espiar(usuario.nombre,parcelarival.ciudad,parcelarival.name,parcelarival.propietario)"
                 >Espiar</v-btn>
            </v-col>
            <v-col cols="9" class="py-3 text-center">
              <v-btn rounded  color="primary" elevation="1" outlined small
                  @click="Oferta(usuario.nombre,parcelarival.ciudad,parcelarival.name,parcelarival.propietario,oferta)"
                  >Oferta</v-btn> 
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="oferta" hide-details single-line type="number" label="Cantidad en Euros"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
               <v-card-text v-if="habilitarEspiar">
                <div> Numero Plantaciones :                
                  <v-rating background-color="grey" color="green" :empty-icon=mdiLandPlots
                  :full-icon=mdiLandPlots hover :length="resultadoEspiar.numeroplantaciones"
                  readonly size="41" :value="resultadoEspiar.numeroplantaciones"></v-rating> 
                </div>
                <div> Tamaño Plantaciones: {{ resultadoEspiar.tamaño }} </div>
                <div> Numero Empleados : {{ resultadoEspiar.numeroEmpleados }} ({{ resultadoEspiar.numeroMaximoEmpleados }} maximo)
                  <v-rating background-color="grey" color="green" :empty-icon=mdiAccountHardHatOutline
                  :full-icon=mdiAccountHardHat hover :length="resultadoEspiar.numeroMaximoEmpleados"
                  readonly size="41" :value="resultadoEspiar.numeroEmpleados"></v-rating>
                </div>
                <div> Calidad del Terreno : {{ resultadoEspiar.calidadterrenofrase }} 
                  <v-rating
                  background-color="grey" color="green" :empty-icon=mdiStarOutline 
                  :full-icon=mdiStar hover length="3"
                  readonly size="41" :value="resultadoEspiar.calidadterrenofrase"></v-rating>
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
import {
      mdiStarOutline,
      mdiStar,
      mdiStarHalfFull,
      mdiAccountHardHatOutline,
      mdiAccountHardHat,
      mdiLandPlots,
  } from '@mdi/js'; 
export default {
    props: ['usuario', 'parcelarival', 'randomintparcela'],
    data() {
    return {
        mdiStarOutline: mdiStarOutline,
        mdiStar:mdiStar,
        mdiStarHalfFull:mdiStarHalfFull,
        mdiAccountHardHatOutline:mdiAccountHardHatOutline,
        mdiAccountHardHat:mdiAccountHardHat,
        mdiLandPlots:mdiLandPlots,
        resultadoEspiar:{},
        habilitarEspiar:false,
        oferta:0,
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupParcelaRival=false;
      },
        Robar(nombreusuario,nombreciudad,nombreparcela,nombreUsuarioRival) {
            axios
            .get(this.$store.state.baseUrl+"/RobarParcela/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreParcela="+nombreparcela+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response => this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',}))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        Oferta(nombreusuario,nombreciudad,nombreparcela,nombreUsuarioRival,oferta) {        
            axios
            .get(this.$store.state.baseUrl+"/OfertaParcela/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreParcela="+nombreparcela+"&nombreUsuarioRival="+nombreUsuarioRival+"&oferta="+oferta)
            .then(response => this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',}))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        Espiar(nombreusuario,nombreciudad,nombreparcela,nombreUsuarioRival) {
            axios
            .get(this.$store.state.baseUrl+"/EspiarParcela/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreParcela="+nombreparcela+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response => {
              (this.resultadoEspiar = response.data.parcela);
              this.habilitarEspiar=response.data.resultado;
              this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',});
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        }
    }
  
}
</script>
  