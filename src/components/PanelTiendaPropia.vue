<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupTiendaPropia">
      <v-card class="mx-auto my-12" max-width="350">
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Tienda'+randominttienda+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="10" class="text-center">
              <v-card-title class="white--text">{{$store.state.tiendapropia.nombre }} en {{ ciudad.name }}</v-card-title>
            </v-col>
            <v-col cols="2"  class="d-flex align-center">
              <v-btn rounded class="justify-center ml-auto white--text" elevation="1" outlined small 
                @click="paneloff()">Salir</v-btn>  
              </v-col>
            </v-row>
          </v-container>
        <v-tabs v-model="tab" background-color="primary" :next-icon=mdiArrowRightBoldOutline
          :prev-icon=mdiArrowLeftBoldOutline dark show-arrows>
          <v-tab v-for="item in items" :key="item.tab" style="font-size: 12px;">{{ item.tab }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card-text>
                <div class="text-center"> Prestigio : {{ parseInt($store.state.tiendapropia.prestigio) }} 
                  <v-rating background-color="green" color="green" :empty-icon=mdiStarOutline
                  :full-icon=mdiStarOutline hover :length="parseInt($store.state.tiendapropia.prestigio)" readonly
                  size="41" :value="parseInt($store.state.tiendapropia.prestigio)"></v-rating>
                </div>     
                <div class="text-center"> Tamaño: {{ $store.state.tiendapropia.tamaño }} </div>
                <div class="text-center"> Numero Empleados : {{ $store.state.tiendapropia.numeroEmpleados }} ({{ $store.state.tiendapropia.numeroMaximoEmpleados }} maximo)
                  <v-rating background-color="grey" color="green" :empty-icon=mdiAccountHardHatOutline
                  :full-icon=mdiAccountHardHat hover :length="$store.state.tiendapropia.numeroMaximoEmpleados"
                  readonly size="41" :value="$store.state.tiendapropia.numeroEmpleados"></v-rating>
                </div>
                <div class="text-center"> Nivel Seguridad : {{ $store.state.tiendapropia.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiShieldAccountOutline
                  :full-icon=mdiShieldAccount hover length="3" readonly
                  size="41" :value="$store.state.tiendapropia.seguridad"></v-rating>
                </div>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>     
                <div v-for="producto, index in $store.state.selectsTienda" :key="index">
                  <v-row no-gutters>
                    <v-col cols="3">
                      <v-sheet class="pa-1 ma-1" style="font-size: 10px;"> Producto {{ index }}</v-sheet>
                    </v-col>
                    <v-col>
                     <v-autocomplete style="font-size: 10px;" v-model="$store.state.selectsTienda[index]" :items="itemsproductos"
                        auto-select-first clearable dense  rounded solo color="blue-grey lighten-2"> 
                        <template v-slot:selection="data">
                        <v-avatar left>
                          <v-img :src="$store.state.baseUrl+'/static/'+data.item.nombre+'.png'"></v-img>
                        </v-avatar>
                        {{ data.item.nombre }}
                    </template> 
                  <template v-slot:item="data">
                        <v-list-item-avatar>
                          <v-img :src="$store.state.baseUrl+'/static/'+data.item.nombre+'.png'"></v-img>
                        </v-list-item-avatar>
                        {{ data.item.nombre }}
                    </template>  
                    </v-autocomplete>   
                    </v-col>
                  </v-row>
                </div>
                <div class="text-center">
                  <v-btn rounded class="justify-center" color="primary" elevation="1" @click="modificarProductos(usuario.nombre,ciudad.name,$store.state.tiendapropia.nombre,$store.state.selectsTienda)">Guardar</v-btn>
                </div> 
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <div style="font-size: 14px; text-align: center;">Empleados
                      </div>     
                <div v-for="empleado, index in $store.state.tiendapropia.arrayEmpleados" :key="index">
                  <v-row no-gutters>
                    <v-col>
                      <div class="pt-1" style="font-size: 14x;">{{ empleado.nombre }}</div>
                      <div class="pt-0" style="font-size: 8px;">
                        Salario: {{ empleado.precio }} € Hab.Com: {{ empleado.comunicacion }} Estudio: {{ empleado.estudios }} Fuerza: {{ empleado.fuerza }} Lider.: {{ empleado.liderazgo }}
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <div class="pb-2">
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                        @click="despedirEmpleado(usuario.nombre,ciudad.name,$store.state.tiendapropia.nombre,empleado.nombre)"
                        >Despedir</v-btn>         
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div style="font-size: 14px; text-align: center;" class="pt-6">  Parados</div>  
                <v-virtual-scroll :items="$store.state.itemsEmpleadosParados" :item-height="50" height="300">
                  <template v-slot:default="{ item }">
                    <v-list-item>
                      <v-row no-gutters>
                      <v-col cols="8">
                        <v-list-item-content>
                        <v-list-item-title style="font-size: 14x;">{{ item.nombre }}</v-list-item-title>
                        <v-list-item-subtitle style="font-size: 7px;">Salario: {{ item.precio }} € Hab.Com: {{ item.comunicacion }} Estudio: {{ item.estudios }} Fuerza: {{ item.fuerza }} Lider.: {{ item.liderazgo }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-col>
                      <v-col cols="4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                          @click="contratarEmpleado(usuario.nombre,ciudad.name,$store.state.tiendapropia.nombre,item.nombre)"
                        >Contratar</v-btn>
                        </v-list-item-action>
                      </v-col>
                    </v-row>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <div class="text-center mb4"> Nivel Seguridad : {{ $store.state.tiendapropia.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiShieldAccountOutline
                  :full-icon=mdiShieldAccount hover length="3" readonly size="41" 
                  :value="$store.state.tiendapropia.seguridad"></v-rating>
                </div>
                    <v-divider
                      vertical
                    ></v-divider>
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2" height="30"  width="50" :src="$store.state.baseUrl + '/static/camaraseguridad.png'"></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;"> Camaras de Seguridad por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton1Habilitado"
                          @click="FuncionSeguridad(usuario.nombre,ciudad.name,$store.state.tiendapropia.nombre,1,15000)"
                        >Instalar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row> 
                    <v-divider
                      vertical
                    ></v-divider>
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2" height="30" width="50" :src="$store.state.baseUrl + '/static/sensormovimiento.png'"></v-img>
                      </v-col>
                       <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;"> Sensores de Movimiento por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton2Habilitado"
                          @click="FuncionSeguridad(usuario.nombre,ciudad.name,$store.state.tiendapropia.nombre,2,15000)"
                        >Instalar</v-btn>
                        </v-list-item-action>
                      </v-col>      
                    </v-row> 
                    <v-divider
                      vertical
                    ></v-divider>
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="3" height="30" width="50" :src="$store.state.baseUrl + '/static/seguro.png'"></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;"> Seguro por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton3Habilitado"
                        @click="FuncionSeguridad(usuario.nombre,ciudad.name,$store.state.tiendapropia.nombre,3,15000)"
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
      mdiStarHalfFull,
      mdiAccountHardHatOutline,
      mdiAccountHardHat,
      mdiLandPlots,
      mdiArrowRightBoldOutline,
      mdiArrowLeftBoldOutline,
      mdiShieldAccountOutline,
      mdiShieldAccount,
  } from '@mdi/js';
export default {
    props: [ 'usuario', 'ciudad',  'itemsproductos', 'randominttienda'],
    data() {
    return {
      mdiStarOutline: mdiStarOutline,
      mdiStar:mdiStar,
      mdiStarHalfFull:mdiStarHalfFull,
      mdiAccountHardHatOutline:mdiAccountHardHatOutline,
      mdiAccountHardHat:mdiAccountHardHat,
      mdiLandPlots:mdiLandPlots,
      mdiArrowRightBoldOutline:mdiArrowRightBoldOutline,
      mdiArrowLeftBoldOutline: mdiArrowLeftBoldOutline,
      mdiShieldAccountOutline:mdiShieldAccountOutline,
      mdiShieldAccount:mdiShieldAccount,
      boton1Habilitado: false,
      boton2Habilitado: false,
      boton3Habilitado: false,
      botonCalTerr1Habilitado:false,
      botonCalTerr2Habilitado:false,
      botonCalTerr3Habilitado:false,
      tab: null,
      items: [
          { tab: 'Resumen'},
          { tab: 'Productos'},
          { tab: 'Empleados'},
          { tab: 'Seguridad'},
        ],
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupTiendaPropia=false;
      },
        modificarProductos(nombreusuario,nombreciudad,nombretienda,listaproducto) {
          console.log(listaproducto)
            let arrayproductos = [];
            for (let i = 0; i < listaproducto.length; i++) {
              arrayproductos.push(listaproducto[i].nombre);
            }
            axios
            .get(this.$store.state.baseUrl+"/modificarProductos/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreTienda="+nombretienda+"&arrayProductos="+arrayproductos)
            .then(response => this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',}))
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        contratarEmpleado(nombreusuario,nombreciudad,lugar,nombreEmpleado) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/contratarEmpleado/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Lugar="+lugar+"&nombreEmpleado="+nombreEmpleado)
            .then(response => {this.$notify({group: 'foo',title: 'Empleado Contratado',text: response.data.mensaje,type: response.data.tipo,});
              axios
              .get(this.$store.state.baseUrl+"/obtenerTiendaPropietario/?nombreCiudad="+nombreciudad+"&nombreTienda="+lugar+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.tiendapropia = response.data.tienda);
                console.log(this.$store.state.tiendapropia);
                this.$store.dispatch('actualizarToken', response.data.token.access_token);  
              axios
                .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+nombreciudad)
                .then(response => (this.$store.state.itemsEmpleadosParados = response.data))
                .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});  
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
            
        },
        despedirEmpleado(nombreusuario,nombreciudad,lugar,nombreEmpleado) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/despedirEmpleado/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Lugar="+lugar+"&nombreEmpleado="+nombreEmpleado)
            .then(response => {
              this.$notify({group: 'foo',title: 'Empleado Despedido',text: response.data.mensaje,type: response.data.tipo,});
            axios
              .get(this.$store.state.baseUrl+"/obtenerTiendaPropietario/?nombreCiudad="+nombreciudad+"&nombreTienda="+lugar+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.tiendapropia = response.data.tienda);
                console.log(this.$store.state.tiendapropia);
                this.$store.dispatch('actualizarToken', response.data.token.access_token);    
                  axios
                  .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+nombreciudad)
                  .then(response => (this.$store.state.itemsEmpleadosParados = response.data), console.log(this.$store.state.itemsEmpleadosParados))
                  .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
                  })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
        },
        FuncionSeguridad(nombreusuario,nombreciudad,lugar,indice,precio) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/incrementarSeguridadTienda/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Lugar="+lugar+"&indice="+indice+"&precio="+precio)
            .then(response => {
              this.$notify({group: 'foo',title: 'Mejora Seguridad Tienda',text: response.data.mensaje,type: 'success',});
            axios
              .get(this.$store.state.baseUrl+"/obtenerTiendaPropietario/?nombreCiudad="+nombreciudad+"&nombreTienda="+lugar+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.tiendapropia = response.data.tienda);             
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
            if(this.$store.state.tiendapropia.seguridad >= 0 && this.$store.state.tiendapropia.seguridad < 1){
            this.boton1Habilitado= true;
            this.boton2Habilitado= false;
            this.boton3Habilitado= false;
          }
          if(this.$store.state.tiendapropia.seguridad >= 1 && this.$store.state.tiendapropia.seguridad < 2){
            this.boton1Habilitado= false;
            this.boton2Habilitado= true;
            this.boton3Habilitado= false;
          }
          if(this.$store.state.tiendapropia.seguridad >= 2 && this.$store.state.tiendapropia.seguridad < 3){
            this.boton1Habilitado= false;
            this.boton2Habilitado= false;
            this.boton3Habilitado= true;
          }  
        },
    },
  created() {
    this.actualizarBotones(); // Llamamos a la función para inicializar botones
    // Creamos un watcher para observar cambios en parcelapropia
    this.$watch(() => this.$store.state.tiendapropia, this.actualizarBotones);
  },
}
</script>
  