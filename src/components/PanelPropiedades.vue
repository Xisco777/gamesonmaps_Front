<template>
<v-bottom-sheet v-model="sheetPropiedades">
    <template v-slot:activator="{ on, attrs }">
      <v-btn  style="font-size: 8px; padding: 5px 10px;" v-bind="attrs" v-on="on">
        <span>Propiedades</span>
        <v-icon>{{ icons.mdiHomeGroup }}</v-icon>
      </v-btn>
    </template>
      <v-list>
        <div v-for="ciudad in usuario.listaciudades"  :key="ciudad.nombre" @click="sheetPropiedades = false">
          <v-list-item>
            <v-row no-gutters>
              <v-col cols="2">
                <v-list-item-avatar>
                  <v-avatar size="32px" tile>
                    <img :src="$store.state.baseUrl + '/static/casa.png'">
                  </v-avatar>
                </v-list-item-avatar>   
              </v-col>
              <v-col cols="7"  class="d-flex align-center">
                <v-list-item-title style="font-size: 12px;"> Casa en {{ ciudad.nombre }} </v-list-item-title>  
              </v-col>
              <v-col cols="3"  class="d-flex align-center">
                <v-btn rounded color="primary" elevation="1" outlined small @click="entrarCasa(ciudad.nombre,ciudad)">Entrar</v-btn>  
              </v-col>
            </v-row>
          </v-list-item>
          <div v-for="parcela in ciudad.listaparcelas" :key="parcela.nombre"  @click="sheetPropiedades = false">
          <v-list-item>
            <v-row no-gutters>
              <v-col cols="2">
                <v-list-item-avatar>
                  <v-avatar size="32px" tile>
                    <img :src="$store.state.baseUrl + '/static/iconoparcela.png'">
                  </v-avatar>
                </v-list-item-avatar>   
              </v-col>
              <v-col cols="7"  class="d-flex align-center">
                <v-list-item-title style="font-size: 12px;">{{ parcela.nombre }} en {{ ciudad.nombre }}</v-list-item-title>  
              </v-col>
              <v-col cols="3"  class="d-flex align-center">
                <v-btn rounded color="primary" elevation="1" outlined small @click="entrarParcela(parcela)">Entrar</v-btn>  
              </v-col>
            </v-row>
          </v-list-item>
        </div>     
        <div
          v-for="tienda in ciudad.listatiendas" :key="tienda.nombre" @click="sheetPropiedades = false">
          <v-list-item>
            <v-row no-gutters>
              <v-col cols="2">
                <v-list-item-avatar>
                  <v-avatar size="32px" tile>
                    <img :src="$store.state.baseUrl + '/static/fruteria.png'">
                  </v-avatar>
                </v-list-item-avatar>   
              </v-col>
              <v-col cols="7"  class="d-flex align-center">
                <v-list-item-title style="font-size: 12px;">{{ tienda.nombre }} en {{ ciudad.nombre }}</v-list-item-title> 
              </v-col>
              <v-col cols="3"  class="d-flex align-center">
                <v-btn rounded color="primary" elevation="1" outlined small @click="entrarTienda(ciudad,tienda)">Entrar</v-btn>  
              </v-col>
            </v-row>
          </v-list-item>
        </div>
        </div>    
      </v-list>
      
  </v-bottom-sheet>
</template>

<script>
import axios from 'axios';
import {
  mdiHomeGroup,
  } from '@mdi/js';
export default {
    props: ['usuario'],
    data() {
    return {
        sheetPropiedades:false,
        icons: {
        mdiHomeGroup,
      },
      }
    },
    methods:{
      entrarCasa(nombre,ciudad) {

        this.$store.state.showPopupCasaPropia= true;
/*          //1-ObtenerParcelas ****hacer
        axios
          .get(this.$store.state.baseUrl+"/Parcelas/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.parcelas = response.data))
        //2-ObtenerTiendas
        axios
          .get(this.$store.state.baseUrl+"/Fruterias/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.fruterias = response.data))
        //3-ObtenerCasas
        axios
          .get(this.$store.state.baseUrl+"/Casas/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.casas = response.data)) 
        //4-ObtenerCoordenadasCiudad
        axios
          .get(this.$store.state.baseUrl+"/CoordenadasCiudad/?nombreCiudad="+nombre)
          .then(response => {(this.ciudad = response.data); this.cities=[]; this.center=this.ciudad.coords; }) */
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
          .get(this.$store.state.baseUrl+"/obtenerCasaPropietario/?nombreCiudad="+nombre+"&nombreCasa="+ciudad.casa.nombrecasa+"&nombreUsuario="+this.$store.state.usuario,config)
          .then(response => {(this.$store.state.casapropia = response.data.casa)
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
          })
          .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
          });  
        },
        entrarParcela(parcela) {
          
          /*          //1-ObtenerParcelas ****hacer
        axios
          .get(this.$store.state.baseUrl+"/Parcelas/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.parcelas = response.data))
        //2-ObtenerTiendas
        axios
          .get(this.$store.state.baseUrl+"/Fruterias/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.fruterias = response.data))
        //3-ObtenerCasas
        axios
          .get(this.$store.state.baseUrl+"/Casas/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.casas = response.data)) 
        //4-ObtenerCoordenadasCiudad
        axios
          .get(this.$store.state.baseUrl+"/CoordenadasCiudad/?nombreCiudad="+nombre)
          .then(response => {(this.ciudad = response.data); this.cities=[]; this.center=this.ciudad.coords; }) */
          this.$store.state.showPopupParcelaPropia= true;
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+parcela.ciudadParcela+"&nombreParcela="+parcela.nombre+"&nombreUsuario="+this.$store.state.usuario,config)
            .then(response => {(this.$store.state.parcelapropia = response.data.parcela)
              this.$store.dispatch('actualizarToken', response.data.token.access_token);
            })
            .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
            });    
          axios
            .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+parcela.ciudadParcela)
            .then(response => (this.$store.state.itemsEmpleadosParados = response.data))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});   
          axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaItems/?nombreCiudad="+parcela.ciudadParcela+"&nombreParcela="+parcela.nombre+"&nombreUsuario="+this.$store.state.usuario)
            .then(response => (this.$store.state.selects = response.data))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
        },

        entrarTienda(ciudad,tienda) {
         this.$store.state.showPopupTiendaPropia= true;
         /*          //1-ObtenerParcelas ****hacer
        axios
          .get(this.$store.state.baseUrl+"/Parcelas/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.parcelas = response.data))
        //2-ObtenerTiendas
        axios
          .get(this.$store.state.baseUrl+"/Fruterias/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.fruterias = response.data))
        //3-ObtenerCasas
        axios
          .get(this.$store.state.baseUrl+"/Casas/?ciudad="+nombre+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.casas = response.data)) 
        //4-ObtenerCoordenadasCiudad
        axios
          .get(this.$store.state.baseUrl+"/CoordenadasCiudad/?nombreCiudad="+nombre)
          .then(response => {(this.ciudad = response.data); this.cities=[]; this.center=this.ciudad.coords; }) */
          
        const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
        axios
          .get(this.$store.state.baseUrl+"/obtenerTiendaPropietario/?nombreCiudad="+ciudad.nombre+"&nombreTienda="+tienda.nombre+"&nombreUsuario="+this.$store.state.usuario,config)
          .then(response => {(this.$store.state.tiendapropia = response.data.tienda);             
            this.$store.dispatch('actualizarToken', response.data.token.access_token);
            })
            .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
            });   
        axios
          .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+ciudad.nombre)
          .then(response => (this.$store.state.itemsEmpleadosParados = response.data))
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});  
        axios
          .get(this.$store.state.baseUrl+"/obtenerTiendaItems/?nombreCiudad="+ciudad.nombre+"&nombreTienda="+tienda.nombree+"&nombreUsuario="+this.$store.state.usuario)
          .then(response => (this.$store.state.selectsTienda = response.data))
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
    }
  
}
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>