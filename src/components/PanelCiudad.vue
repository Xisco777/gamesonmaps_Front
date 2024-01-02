<!-- <template>
    <div class="columns float" id="panelParcela" v-if="showPopupCiudadStatus">
      <v-card
        class="mx-auto my-12"
        max-width="374"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-img
          height="250"
          src="@/assets/Utiel.png" 
        ></v-img>
        <v-card-title class="text-center">{{ city.name }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>

          <div class="my-4 text-subtitle-1">
            Habitantes {{ city.poblacion }}
          </div>
          <v-divider class="mx-4"></v-divider>
          <div>La agricultura y la viticultura son sectores importantes en la región, con viñedos que producen variedades de uva como la Bobal, muy característica de la zona. </div>
        </v-card-text>


        <div class="text-center">
          <v-btn rounded class="justify-center" color="primary" elevation="1" @click="entrarciudad(city.name,usuario.nombre)">Entrar</v-btn>
        </div> 
        </v-card>
    </div>



</template>

<script>
import axios from 'axios';
export default {
props: ['showPopupCiudadStatus', 'city', 'usuario', 'cities', 'casas', 'fruterias', 'parcelas', 'center', 'zoom', 'mapOptions'],
data() {
return {
        }
    },
    methods:
    {
    entrarciudad(nombreciudad,nombreusuario) {
       // Configuración de los encabezados con el token Bearer
       const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`,
        },
      };
        
       axios
      .get("http://127.0.0.1:8000/Parcelas/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
      .then(response => (this.$store.state.parcelas = response.data))
      console.log(this.$store.state.parcelas)
      axios
       .get("http://127.0.0.1:8000/Fruterias/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
      .then(response => (this.$store.state.fruterias = response.data))
      console.log(this.$store.state.fruterias)
       axios
      .get("http://127.0.0.1:8000/Casas/?ciudad="+nombreciudad+"&nombreUsuario="+nombreusuario)
      .then(response => (this.$store.state.casas = response.data)) 
      console.log(this.$store.state.casas) 
      axios
      .get("http://127.0.0.1:8000/CoordenadasCiudad/?nombreCiudad="+nombreciudad)
      .then(response => {(this.ciudad = response.data);  console.log(this.ciudad.coords); this.$store.state.cities=[];
        this.$store.state.center=this.ciudad.coords; })
        this.$store.state.zoom=13;
        this.$store.state.mapOptions= {
        zoomSnap: 0.5,
        maxZoom: 16,
        minZoom: 10
      }; 
    },
    }
}
</script>
  
<style scoped>
/* Estilos específicos para este componente si es necesario */
</style> -->