<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupCasaRival">
      <v-card class="mx-auto my-12" max-width="350">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Casa'+randomintcasa+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ $store.state.casarival.name }} en {{ $store.state.casarival.ciudad }}</v-card-title>
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
                  @click="robar( usuario.nombre,$store.state.casarival.ciudad,$store.state.casarival.name,$store.state.casarival.propietario)"
                  >Robar</v-btn>
            </v-col>
            <v-col cols="12" class="py-3">
              <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small block
                 @click="espiar(usuario.nombre,$store.state.casarival.ciudad,$store.state.casarival.name,$store.state.casarival.propietario)"
                 >Espiar</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-card-text v-if="habilitarEspiar">     
          <div> Prestigio : {{ resultadoEspiar.prestigio }} </div>
          <div> Seguridad : {{ resultadoEspiar.seguridad }} </div>
        </v-card-text>     
      </v-card>
    </div>
</template>
  
<script>
  import axios from 'axios'; 
export default {
    props: ['usuario', 'ciudad','randomintcasa'],
    data() {
    return {
        resultadoRobo:false,
        resultadoOferta:false,
        resultadoEspiar:{},
        habilitarEspiar:false,
        oferta:0,
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupCasaRival=false;
      },
        robar(nombreusuario,nombreciudad,nombrecasa,nombreUsuarioRival) {
            axios
            .get(this.$store.state.baseUrl+"/robarCasa/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreCasa="+nombrecasa+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response =>{ (this.resultadoRobo = response.data);
            this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',});
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        espiar(nombreusuario,nombreciudad,nombrecasa,nombreUsuarioRival) {
            axios
            .get(this.$store.state.baseUrl+"/espiarCasa/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreCasa="+nombrecasa+"&nombreUsuarioRival="+nombreUsuarioRival)
            .then(response =>{ (this.resultadoEspiar = response.data); this.habilitarEspiar=true;
            this.$notify({group: 'foo',title: 'Espiar',text: response.data.mensaje,type: 'success',});
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        }
    }
  
}
  </script>