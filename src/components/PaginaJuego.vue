<template>
  
  <div style="height: 100vh; width: 100%">
      <div class="columns float">
        <div class="columns is-flex is-justify-content-center points-container">
          <div class="points success fraseinicial">{{ usuario.nombre }}</div>
          <div class="points success fraseinicial">{{ $store.state.usuario_websocket.mes }}/{{ $store.state.usuario_websocket.ano }}</div>
          <div class="points success fraseinicial">{{ $store.state.usuario_websocket.dinero.toFixed(1) }} €</div>
          <div class="points success fraseinicial">
            <v-row>
              <v-col cols="3"></v-col>
              <v-col cols="3">{{ $store.state.usuario_websocket.prestigio.toFixed(1) }}</v-col>
              <v-col cols="3">
                <v-icon color="white" size="14">{{ mdiStar }}</v-icon>
                 <!-- <v-rating background-color="green" color="white" :empty-icon="mdiStar" :full-icon="mdiStar" hover length="1" readonly size="20" value="1"></v-rating>  -->
              </v-col>
            </v-row>
          </div>
        </div>  
      </div>
      <parcela-libre :usuario="usuario" :parcela="parcela" :randomintparcela="randomintparcela"/> 
      <parcela-propia  :usuario="usuario" :ciudad="ciudad" :parcela="parcela" :itemsplantacion="itemsplantacion" :randomintparcela="randomintparcela"/>
      <parcela-rival :usuario="usuario" :parcelarival="parcelarival" :randomintparcela="randomintparcela"/>           
      <div class="columns float" id="panelParcela" v-if="showPopupCiudadStatus">
        <v-card  class="mx-auto my-12"  max-width="350">
          <template slot="progress">
            <v-progress-linear color="deep-purple"  height="10"  indeterminate></v-progress-linear>
          </template>
          <v-img  height="250"  :src="$store.state.baseUrl + '/static/' + city.name + '.png'" ></v-img>
            <v-row no-gutters>
              <v-col cols="9">
                <v-card-title class="text-center">{{  city.name }}</v-card-title>
              </v-col>
              <v-col cols="3"  class="d-flex align-center">
                <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small  @click="SalirCiudad()"
                >Salir</v-btn>  
              </v-col>
            </v-row>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <div class="my-4 text-subtitle-1">  Habitantes {{ city.poblacion }}</div>
            <v-divider class="mx-4"></v-divider>
            <div> {{ city.descripcion }} </div>
          </v-card-text>
          <div class="text-center">
            <v-btn rounded class="justify-center" color="primary" elevation="1" @click="entrarCiudad(city.name,usuario.nombre)">Entrar</v-btn>
          </div> 
        </v-card>
      </div>
      <casa-libre :usuario="usuario" :casa="casa" :ciudad="ciudad" :randomintcasa="randomintcasa"/>
      <casa-propia :usuario="usuario" :ciudad="ciudad" :randomintcasa="randomintcasa"/> 
      <casa-rival :usuario="usuario" :ciudad="ciudad" :randomintcasa="randomintcasa"/> 
      <tienda-libre :usuario="usuario" :fruteria="fruteria" :ciudad="ciudad" :randominttienda="randominttienda"/>
      <tienda-propia :usuario="usuario" :ciudad="ciudad" :itemsproductos="itemsproductos" :randominttienda="randominttienda"/> 
      <tienda-rival :usuario="usuario" :fruteriarival="fruteriarival" :ciudad="ciudad" :randominttienda="randominttienda"/>  
      <l-map v-if="showMap"  :center="center" :zoom="zoom" :options="mapOptions"
        style="height: 80%; width: 100%; z-index: 1;"  @update:center="centerUpdate" @update:zoom="zoomUpdate">
        <l-circle  v-for="(ciudad, index) in cities" :key="index" :lat-lng="ciudad.coords" :radius="ciudad.radius"
            @click="functionPopupCiudad(ciudad)">
            <l-tooltip :content="ciudad.name"></l-tooltip>
        </l-circle>
        <l-geo-json :geojson="parcela.objeto" :options-style="stylesParcelas(parcela.propietario)"  
            v-for="(parcela, index) in $store.state.parcelas" :key="`parcela-${index}`" :options="options"
            @click="functionPopupParcela(parcela)">         
        </l-geo-json>
        <l-marker :lat-lng="fruteria.coords"  v-for="(fruteria, index) in $store.state.fruterias" 
            :key="`fruteriaicon-${index}`" @click="functionPopupFruterias(ciudad,fruteria,usuario)">
            <l-tooltip :content="fruteria.propietario" />
            <l-icon  :icon-url="$store.state.baseUrl + '/static/fruteria.png'" :icon-size="[32, 32]" :icon-anchor="[16, 32]" />
        </l-marker> 
        <l-marker :lat-lng="casa.coords"  v-for="(casa, index) in $store.state.casas"
            :key="`casaicon-${index}`" @click="functionPopupCasas(ciudad,casa,usuario)">
            <l-tooltip :content="casa.propietario" />
            <l-icon :icon-url="$store.state.baseUrl + '/static/casa.png'" :icon-size="[32, 32]"  :icon-anchor="[16, 32]" />
        </l-marker> 
        <l-tile-layer :url="url" :attribution="attribution"/>
      </l-map>
          <v-bottom-navigation  :value="value" color="primary">
            <v-btn @click="vistaGeneral()">
              <span>V. General</span>
              <v-icon>{{ icons.mdiEyeRefreshOutline }}</v-icon>
            </v-btn>
<!--             <v-btn @click="propiedades()">
              <span>Propiedades</span>
              <v-icon>{{ icons.mdiHomeGroup }}</v-icon>
            </v-btn> -->
            <panel-propiedades :usuario="usuario"/> 
            <v-btn @click="almacen()">
              <span>Almacen</span>
              <v-icon>{{ icons.mdiStore }}</v-icon>
            </v-btn>
            <panel-mas/> 

          </v-bottom-navigation>
  </div>
</template>

<script>

import { latLng } from "leaflet";
import { LMap, 
  LTileLayer,  
  LCircle, 
  LGeoJson, 
  LTooltip, 
  LMarker, 
  LIcon} from "vue2-leaflet";
import axios from 'axios';
import ParcelaPropia from './PanelParcelaPropia.vue';
import ParcelaLibre from './PanelParcelaLibre.vue';
import ParcelaRival from './PanelParcelaRival.vue';
import PanelPropiedades from './PanelPropiedades.vue';
import PanelMas from './PanelMas.vue';
import CasaLibre from './PanelCasaLibre.vue';
import CasaPropia from './PanelCasaPropia.vue';
import CasaRival from './PanelCasaRival.vue';
import TiendaLibre from './PanelTiendaLibre.vue';
import TiendaPropia from './PanelTiendaPropia.vue';
import TiendaRival from './PanelTiendaRival.vue';
import {
  mdiMessage,
  mdiStore,
  mdiEyeRefreshOutline,
  mdiHomeGroup,
  mdiCounter,
  mdiCastAudioVariant,
  mdiCurrencyEur,
  mdiPlusCircleOutline,
  mdiStar,
  } from '@mdi/js';
export default {
  name: "HelloWorld",
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LGeoJson,
    LTooltip, 
    LMarker, 
    LIcon,
    ParcelaPropia,
    ParcelaRival,
    PanelPropiedades,
    PanelMas,
    ParcelaLibre,
    CasaLibre,
    CasaPropia,
    CasaRival,
    TiendaLibre,
    TiendaPropia,
    TiendaRival,
  },
  data() {
    return {
      sheetAlmacen:false,
      dialogm1: '',
      dialog: false,
      mdiStar:mdiStar,
      mdiCurrencyEur:mdiCurrencyEur,
      value: 1, //footer value
      randomintcasa:0,
      randominttienda:0,
      randomintparcela:0,
      icons: {
        mdiMessage,
        mdiStore,
        mdiEyeRefreshOutline,
        mdiHomeGroup,
        mdiCounter,
        mdiPlusCircleOutline,
      },
      //websocket
      connection: null,
      //map
      showMap: true,
      zoom: 5,
      currentZoom: 5,
      center: [40.416775, -3.703790],
      currentCenter: latLng(47.41322, -1.219482),
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Game Manager',
      mapOptions: {
        zoomSnap: 0.5,
        maxZoom: 10,
        minZoom: 5
      },
            
      response: null,
      message:'',
      //datos
      showPopupCiudadStatus: false,
      
      fruteriarival:{},
      itemsplantacion: [  { nombre: 'Vino', urlicono: 'http://localhost:8083/patatas.PNG' }, ],
      itemsproductos: [  { nombre: 'Vino', urlicono: 'http://localhost:8083/patatas.PNG' }, ],
      parcelarival:{},
      cities: [],
      parcela: {"latlngs": [[]],"color": "","name": ""},
      fruteria: {"latlngs": [[]],"color": "","name": ""},
      casa: {"latlngs": [[]],"color": "","name": ""},
      city:{},
      usuario:{}, 
      ciudad:{
                "name": "",
                "coords": [0.0,0.0], 
                "radius": 0,
            },
    };
  },
  mounted () {
    this.Inicio()
  },
  methods: {
    propiedades(){
      this.$router.push("/propiedades");
    },
    almacen(){
      this.$router.push("/almacen");
    },
    stylesParcelas(propietario) {
      console.log(propietario)
      if(propietario =="Libre"){        
        return () => ( { weight: 2, color: '#000000', opacity: 0.3, fillColor: '#4c5caf',  fillOpacity: 0.5 })
      }
      if(propietario =="Oponente"){        
        return () => ( {weight: 2, color: '#000000', opacity: 0.3, fillColor: '#af5b4c',  fillOpacity: 0.5})
      }
      if(propietario =="Propio"){        
        return () => ( { weight: 2, color: '#000000', opacity: 0.3, fillColor: '#4caf53', fillOpacity: 0.5 })
      }
    },
    Inicio() {
      // Configuración de los encabezados con el token Bearer
      const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
      //1-ObtenerDatosUsuario
      axios
      .get(this.$store.state.baseUrl+"/obtenerUsuarios/?usuarioname="+this.$store.state.usuario)
      .then(response => (this.usuario = response.data))
      .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
      //2-Obtener Coordenadas Ciudades
      axios  
        .get(this.$store.state.baseUrl+"/ciudades/",config)
        .then(response => {
          this.cities = response.data.ciudades;
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
        })
        .catch((error) => {
        this.$router.push("/login");
        this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
        });
      //3-Obtener los productos y plantaciones para rellenar en los selects de plantaciones y productos.
      axios  
        .get(this.$store.state.baseUrl+"/getItemsPlantaciones/")
        .then(response => {(this.itemsplantacion = response.data); (this.itemsproductos = response.data)} )
        .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});   
    },

    functionPopupCiudad(ciudad) {
      // Configuración de los encabezados con el token Bearer
      const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
      this.$store.state.ciudadPropia=false;
      //Cuando entramos a la ciudad se checkea si podemos trabajar en la ciudad (variable ciudadPropia)
      axios
        .get(this.$store.state.baseUrl+"/ciudadesUsuario/?nombreCiudad="+ciudad.name+"&nombreUsuario="+this.$store.state.usuario,config)
        .then(response => {(this.$store.state.ciudadPropia = response.data.resultado);
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
        })
        .catch((error) => {
        this.$router.push("/login");
        this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
        });
      this.showPopupCiudadStatus=true;
      this.city=ciudad;
    },

    SalirCiudad() {
      this.Inicio()
      this.zoom=5;
      this.mapOptions= { zoomSnap: 0.5, maxZoom: 10,  minZoom: 5};
      this.showPopupCiudadStatus=false;
    },

    vistaGeneral() {
      this.Inicio()
      this.$store.state.fruterias=[]
      this.$store.state.parcelas=[]
      this.$store.state.casas=[]
      this.zoom=5;
      this.mapOptions= { zoomSnap: 0.5, maxZoom: 10, minZoom: 5};
    },

    entrarCiudad(nombreciudad,nombreusuario) {
      const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
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
        .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});  
      //4-ObtenerCoordenadasCiudad
      axios
        .get(this.$store.state.baseUrl+"/CoordenadasCiudad/?nombreCiudad="+nombreciudad,config)
        .then(response => {(this.ciudad = response.data.coordenadas); this.cities=[]; this.center=this.ciudad.coords; 
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
        })
        .catch((error) => {
        this.$router.push("/login");
        this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
        });
      this.zoom=13;
      this.mapOptions= {  zoomSnap: 0.5,  maxZoom: 16,  minZoom: 10}; 
      this.showPopupCiudadStatus=false;
    },

    functionPopupParcela(parcela) {
      this.randomintparcela=Math.floor(Math.random() * (5 + 1));
      const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
      if(this.$store.state.ciudadPropia==true){
        this.showPopupCiudadStatus=false;
        if(parcela.propietario=="Propio"){
          this.$store.state.showPopupParcelaPropia= true;
          axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+parcela.ciudad+"&nombreParcela="+parcela.name+"&nombreUsuario="+parcela.usuario,config)
            .then(response => {(this.$store.state.parcelapropia = response.data.parcela)
              this.$store.dispatch('actualizarToken', response.data.token.access_token);
            })
            .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
            });    
          axios
            .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+parcela.ciudad)
            .then(response => (this.$store.state.itemsEmpleadosParados = response.data))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});   
          axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaItems/?nombreCiudad="+parcela.ciudad+"&nombreParcela="+parcela.name+"&nombreUsuario="+parcela.usuario)
            .then(response => (this.$store.state.selects = response.data))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});  
        }
        if(parcela.propietario=="Libre"){
          this.$store.state.showPopupParcelaLibre= true;
        }
        if(parcela.propietario=="Oponente"){
          this.$store.state.showPopupParcelaRival=true;
          axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaRival/?nombreCiudad="+parcela.ciudad+"&nombreParcela="+parcela.name+"&nombreUsuario="+parcela.usuario,config)
            .then(response => {(this.parcelarival = response.data.parcela)
              this.$store.dispatch('actualizarToken', response.data.token.access_token);
            })
            .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
            });  
        }
        this.parcela=parcela;
      }
      else{
        this.$notify({group: 'foo',title: 'Informacion',text: 'Tienes que comprar una casa si quieres trabajar en la ciudad',type: 'warn',});
      }

    },
    functionPopupFruterias(ciudad,fruteria,usuario) {
      this.randominttienda=Math.floor(Math.random() * (5 + 1));
      const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
      if(this.$store.state.ciudadPropia==true){
      this.showPopupCiudadStatus=false;
      if(fruteria.propietario=="Propio"){
        this.$store.state.showPopupTiendaPropia= true;
        axios
          .get(this.$store.state.baseUrl+"/obtenerTiendaPropietario/?nombreCiudad="+ciudad.name+"&nombreTienda="+fruteria.name+"&nombreUsuario="+usuario.nombre,config)
          .then(response => {(this.$store.state.tiendapropia = response.data.tienda);             
            this.$store.dispatch('actualizarToken', response.data.token.access_token);
            })
            .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
            });   
        axios
          .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+ciudad.name)
          .then(response => (this.$store.state.itemsEmpleadosParados = response.data))
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});  
        axios
          .get(this.$store.state.baseUrl+"/obtenerTiendaItems/?nombreCiudad="+ciudad.name+"&nombreTienda="+fruteria.name+"&nombreUsuario="+usuario.nombre)
          .then(response => (this.$store.state.selectsTienda = response.data))
          .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});   
      }
      if(fruteria.propietario=="Libre"){
        this.$store.state.showPopupTiendaLibre= true;
      }
      if(fruteria.propietario=="Oponente"){
        this.$store.state.showPopupTiendaRival= true;
        axios
          .get(this.$store.state.baseUrl+"/obtenerTiendaRival/?nombreCiudad="+ciudad.name+"&nombreTienda="+fruteria.name+"&nombreUsuario="+fruteria.usuario,config)
          .then(response => {(this.fruteriarival = response.data.tienda)
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
          })
          .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
          }); 
      }  
      this.fruteria=fruteria;
    }
      else{
        this.$notify({group: 'foo',title: 'Informacion',text: 'Tienes que comprar una casa si quieres trabajar en la ciudad',type: 'warn',});
      }
    },
    functionPopupCasas(ciudad,casa,usuario) {
      const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
      this.randomintcasa=Math.floor(Math.random() * (5 + 1));
      this.showPopupCiudadStatus=false;
      if(casa.propietario=="Propio"){
        this.$store.state.showPopupCasaPropia= true;
        axios
          .get(this.$store.state.baseUrl+"/obtenerCasaPropietario/?nombreCiudad="+ciudad.name+"&nombreCasa="+casa.name+"&nombreUsuario="+usuario.nombre,config)
          .then(response => {(this.$store.state.casapropia = response.data.casa)
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
          })
          .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
          });    
      }
      if(casa.propietario=="Libre"){
        this.$store.state.showPopupCasaLibre= true;
      }
      if(casa.propietario=="Oponente"){
        this.$store.state.showPopupCasaRival= true;
        axios
          .get(this.$store.state.baseUrl+"/obtenerCasaRival/?nombreCiudad="+ciudad.name+"&nombreCasa="+casa.name+"&nombreUsuario="+casa.usuario,config)
          .then(response => {(this.$store.state.casarival = response.data.casa)
          this.$store.dispatch('actualizarToken', response.data.token.access_token);
          })
          .catch((error) => {
            this.$router.push("/login");
            this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
          }); 
      }  
      this.casa=casa;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>"+
            feature.properties.tipo +"</div> <div>" +
            feature.properties.name +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  },
  created: function() {
 
     console.log("Starting connection to WebSocket Server")
     console.log(this.$store.state.Idusuario)
     this.connection = new WebSocket(this.$store.state.baseUrlPortWS+"/ws/${"+this.$store.state.Idusuario+"}")
    
    this.connection.onmessage = function(eventreceive) {
      const correctedData = eventreceive.data.replace(/'/g, '"');
      console.log(correctedData)
      const JsonMessage =JSON.parse(correctedData)
      if(JsonMessage.IDMessage=="DatosMensuales"){
        console.log("DatosMensuales")
        this.$store.state.usuario_websocket=JsonMessage;
        console.log(this.$store.state.usuario_websocket)
      }
      if(JsonMessage.IDMessage=="RoboParcela"){
        console.log("RoboParcela")
        this.$store.state.robosparcela_websocket.push(JsonMessage);
        this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
      }
      if(JsonMessage.IDMessage=="RoboCasa"){
        console.log("RoboCasa")
        this.$store.state.roboscasa_websocket.push(JsonMessage);
        this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
      }
      if(JsonMessage.IDMessage=="RoboTienda"){
        console.log("RoboTienda")
        this.$store.state.robostienda_websocket.push(JsonMessage);
        this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
      }
      if(JsonMessage.IDMessage=="Oferta"){
        this.$store.state.ofertas_websocket.push(JsonMessage);
        this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
      }
      if(JsonMessage.IDMessage=="OfertaRespuesta"){
        console.log("respuestaoferta")
        this.$store.state.respuestaofertas_websocket.push(JsonMessage);
        this.$store.state.countMessages = this.$store.state.respuestaofertas_websocket.length+this.$store.state.ofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
      }
    }.bind(this);

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }   

    this.connection.onerror = function(event) {
      console.log("WebSocket error:", event);
    };

    this.connection.onclose = function(event)  {
      console.log("WebSocket connection closed:", event.code);
    };
  }
};
</script>

<style>
/* Estilo para el panel emergente */
#panel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
#panelParcela {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.columns {
  margin: 0 !important;
  padding: 0;
}

.float {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(60, 64, 62, 0.6);
  box-shadow: 0 5px 8px 3px rgb(0 0 0 / 20%);
}

.points-container {
  display: flex; /* Uso de flexbox */
  justify-content: center;
}
.points {
  width: 150px;
  text-align: center;
  padding: 1px;
  margin: 4px;
  color: #ffffff;
  border-radius: 5px;
  user-select: none;
}

.success {
  background: rgba(0, 200, 0, .4);
}

.fail {
  background: rgba(200, 0, 0, .4);
}

.fraseinicial {
  font-size: 12px; /* Cambia el valor según tus preferencias */
}
</style>