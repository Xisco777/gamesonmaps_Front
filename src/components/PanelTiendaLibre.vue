<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupTiendaLibre">
      <v-card class="mx-auto my-12" max-width="350">
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Tienda'+randominttienda+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ fruteria.name }} en {{ ciudad.name }}</v-card-title>
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
                @click="comprarTienda(usuario.nombre,ciudad.name,fruteria.name,fruteria.precio)"
                >Comprar</v-btn> 
            </v-col>
          </v-row>
        </v-container>
               <v-card-text>
                <div> Precio: {{ fruteria.precio }} Euros</div>     
                <div> Tamaño: {{ fruteria.tamano }} secciones </div>
              </v-card-text>   
      </v-card>
    </div>
</template>
  
  <script>
  import axios from 'axios'; 
export default {
    props: ['usuario', 'fruteria','ciudad', 'randominttienda'],
    data() {
    return {
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupTiendaLibre=false;
      },
        comprarTienda(nombreusuario,nombreciudad,nombretienda,precio) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
          .get(this.$store.state.baseUrl+"/comprarTienda/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreTienda="+nombretienda+"&precio="+precio)
          .then(response => {this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje, type: response.data.tipo,})
            axios
              .get(this.$store.state.baseUrl+"/ciudadesUsuario/?nombreCiudad="+nombreciudad+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.ciudadPropia = response.data.resultado);
              this.$store.dispatch('actualizarToken', response.data.token.access_token);
              })
              .catch((error) => {
              this.$router.push("/login");
              this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
              });

              axios
                .get(this.$store.state.baseUrl+"/Fruterias/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
                .then(response => (this.$store.state.fruterias = response.data))
                .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            this.$store.state.showPopupTiendaLibre=false;
        })
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});})
        }
    }
  
}
</script>
  