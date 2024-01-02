<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupCasaPropia">
      <v-card
        class="mx-auto my-12"
        max-width="350"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Casa'+randomintcasa+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{ $store.state.casapropia.nombre }} en {{ ciudad.name }}</v-card-title>
            </v-col>
            <v-col cols="2"  class="d-flex align-center">
              <v-btn rounded class="justify-center ml-auto white--text" elevation="1" outlined small 
                @click="paneloff()">Salir</v-btn>  
              </v-col>
            </v-row>
          </v-container>
        <v-tabs
            v-model="tab"
            background-color="primary"
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            dark
            show-arrows
          >
        <v-tab
              v-for="item in items"
              :key="item.tab"
            >
              {{ item.tab }}
            </v-tab>
          </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card-text>     
                <div class="text-center"> Prestigio : {{ $store.state.casapropia.prestigio }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiStarOutline
                  :full-icon=mdiStar hover :length="$store.state.casapropia.prestigio" readonly
                  size="41" :value="$store.state.casapropia.prestigio"></v-rating>
                </div>
                <div class="text-center"> Nivel Seguridad : {{ $store.state.casapropia.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiShieldAccountOutline
                  :full-icon=mdiShieldAccount hover length="3" readonly
                  size="41" :value="$store.state.casapropia.seguridad"></v-rating>
                </div>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <div class="text-center mb4"> Nivel Seguridad : {{ $store.state.casapropia.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiShieldAccountOutline
                  :full-icon=mdiShieldAccount hover length="3" readonly size="41" 
                  :value="$store.state.casapropia.seguridad"></v-rating>
                </div>
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2" height="30"  width="50" :src="$store.state.baseUrl + '/static/camaraseguridad.png'" ></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;">Camaras de Seguridad por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton1Habilitado"
                        @click="FuncionSeguridad(usuario.nombre,ciudad.name,$store.state.casapropia.nombre,1,15000)"
                        >Instalar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row> 
                    <v-divider
                      vertical
                    ></v-divider>
                    <v-divider
                      vertical
                    ></v-divider>
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2"  height="30"  width="50" :src="$store.state.baseUrl + '/static/alarmaseguridad.png'" 
                        ></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;">  Alarma de Seguridad por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton2Habilitado"
                        @click="FuncionSeguridad(usuario.nombre,ciudad.name,$store.state.casapropia.nombre,2,15000)"
                        >Instalar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row>
                    <v-divider
                      vertical
                    ></v-divider> 
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2"  height="30"  width="50" :src="$store.state.baseUrl + '/static/seguro.png'" ></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;">  Seguro de Robo por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton3Habilitado"
                        @click="FuncionSeguridad(usuario.nombre,ciudad.name,$store.state.casapropia.nombre,3,15000)"
                        >Contratar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row> 
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>

        </v-card>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import {
      mdiStarOutline,
      mdiStar,
      mdiShieldAccountOutline,
      mdiShieldAccount
  } from '@mdi/js'; 
export default {
    props: [ 'usuario', 'ciudad','randomintcasa'],
    data() {
    return {
      mdiStarOutline: mdiStarOutline,
      mdiStar:mdiStar,
      mdiShieldAccountOutline:mdiShieldAccountOutline,
      mdiShieldAccount:mdiShieldAccount,
      boton1Habilitado: false,
      boton2Habilitado: false,
      boton3Habilitado: false,
      empleado:false,
      tab: null,
      items: [
          { tab: 'Resumen'},
          { tab: 'Seguridad'},
        ]
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupCasaPropia=false;
      },      
        FuncionSeguridad(nombreusuario,nombreciudad,casa,indice,precio) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/incrementarSeguridadCasa/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Casa="+casa+"&indice="+indice+"&precio="+precio)
            .then(response => {this.$notify({group: 'foo',title: 'Mejora Seguridad Casa',text: response.data.mensaje,type: 'success'})
            axios
              .get(this.$store.state.baseUrl+"/obtenerCasaPropietario/?nombreCiudad="+nombreciudad+"&nombreCasa="+casa+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.casapropia = response.data.casa)
              this.$store.dispatch('actualizarToken', response.data.token.access_token);
              })
              .catch((error) => {
                this.$router.push("/login");
                this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});
              });
          })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        actualizarBotones(){
          
            this.boton1Habilitado= false;
            this.boton2Habilitado= false;
            this.boton3Habilitado= false;
            if(this.$store.state.casapropia.seguridad >= 0 && this.$store.state.casapropia.seguridad < 1){
            this.boton1Habilitado= true;
            this.boton2Habilitado= false;
            this.boton3Habilitado= false;
          }
          if(this.$store.state.casapropia.seguridad >= 1 && this.$store.state.casapropia.seguridad < 2){
            this.boton1Habilitado= false;
            this.boton2Habilitado= true;
            this.boton3Habilitado= false;
          }
          if(this.$store.state.casapropia.seguridad >= 2 && this.$store.state.casapropia.seguridad < 3){
            this.boton1Habilitado= false;
            this.boton2Habilitado= false;
            this.boton3Habilitado= true;
          }
 
        },
    },
  created() {
    this.actualizarBotones(); // Llamamos a la función para inicializar botones
    // Creamos un watcher para observar cambios en parcelapropia
    this.$watch(() => this.$store.state.casapropia, this.actualizarBotones);
  },
  
}
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>