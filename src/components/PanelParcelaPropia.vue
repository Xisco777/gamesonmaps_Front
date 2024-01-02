<template>
    <div class="columns float" id="panelParcela" v-if="$store.state.showPopupParcelaPropia">
      <v-card  class="mx-auto my-12"  max-width="350">
        <v-img  height="250"  :src="$store.state.baseUrl + '/static/Parcela'+randomintparcela+'.png'"></v-img>
        <v-container class="primary"> 
          <v-row no-gutters>
            <v-col cols="9" class="text-center">
              <v-card-title class="white--text">{{$store.state.parcelapropia.nombre }} en {{ $store.state.parcelapropia.ciudadParcela }}</v-card-title>
            </v-col>
            <v-col cols="3"  class="d-flex align-center">
                <v-btn rounded class="justify-center ml-auto white--text" elevation="1" outlined small @click="paneloff()"
                >Salir</v-btn>  
              </v-col>
            </v-row>
          </v-container>
        <v-tabs v-model="tab"  background-color="primary"  :next-icon= mdiArrowRightBoldOutline
            :prev-icon= mdiArrowLeftBoldOutline dark show-arrows>
        <v-tab
              v-for="item in items"
              :key="item.tab"
              style="font-size: 12px;"
            >
              {{ item.tab }}
            </v-tab>
          </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card-text>     
                <div class="text-center"> Numero Plantaciones :  {{ $store.state.parcelapropia.numeroplantaciones }}             
                  <v-rating background-color="grey" color="green" :empty-icon=mdiLandPlots
                  :full-icon=mdiLandPlots hover :length="$store.state.parcelapropia.numeroplantaciones"
                  readonly size="41" :value="$store.state.parcelapropia.numeroplantaciones"></v-rating> 
                </div>
                <div class="text-center"> Tamaño Plantaciones: {{ $store.state.parcelapropia.tamaño }} hectareas </div>
                <div class="text-center"> Numero Empleados : {{ $store.state.parcelapropia.numeroEmpleados }} ({{ $store.state.parcelapropia.numeroMaximoEmpleados }} maximo)
                  <v-rating background-color="grey" color="green" :empty-icon=mdiAccountHardHatOutline
                  :full-icon=mdiAccountHardHat hover :length="$store.state.parcelapropia.numeroMaximoEmpleados"
                  readonly size="41" :value="$store.state.parcelapropia.numeroEmpleados"></v-rating>
                </div>
                <div class="text-center"> Calidad del Terreno : {{ $store.state.parcelapropia.calidadterrenofrase }} 
                  <v-rating
                  background-color="grey" color="green" :empty-icon=mdiStarOutline 
                  :full-icon=mdiStar hover length="3"
                  readonly size="41" :value="$store.state.parcelapropia.calidadterreno"></v-rating>
                </div>
                <div class="text-center"> Nivel Seguridad : {{ $store.state.parcelapropia.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiShieldAccountOutline
                  :full-icon=mdiShieldAccount hover length="3" readonly size="41" 
                  :value="$store.state.parcelapropia.seguridad"></v-rating>
                </div>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>     
                <div v-for="plantacion, index in $store.state.selects" :key="index">
                  <v-row no-gutters>
                    <v-col cols="3">
                      <v-sheet class="pa-1 ma-1" style="font-size: 10px;">
                        Plantacion {{ index }}
                      </v-sheet>
                    </v-col>
                    <v-col>
                     <v-autocomplete style="font-size: 10px;"
                        v-model="$store.state.selects[index]" :items="itemsplantacion"  auto-select-first clearable
                        dense rounded  solo color="blue-grey lighten-2"> 
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
                  <v-btn rounded class="justify-center" color="primary" elevation="1" @click="modificarPlantacion(usuario.nombre,ciudad.name,parcela.name,$store.state.selects,$store.state.parcelapropia.nombre)">Guardar Plantacion</v-btn>
                </div> 
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <div style="font-size: 14px; text-align: center;">Empleados</div>     
                <div v-for="empleado, index in $store.state.parcelapropia.listaempleados" :key="index">
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
                        @click="despedirEmpleado(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,empleado.nombre)"
                        >Despedir</v-btn>         
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div style="font-size: 14px; text-align: center;" class="pt-6"> Parados  </div>  
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
                          @click="contratarEmpleado(usuario.nombre,ciudad.name,parcela.name,item.nombre)"
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
                <div class="text-center"> Nivel Seguridad : {{ $store.state.parcelapropia.seguridad }} 
                  <v-rating background-color="grey" color="green" :empty-icon=mdiShieldAccountOutline
                  :full-icon=mdiShieldAccount hover length="3" readonly size="41" 
                  :value="$store.state.parcelapropia.seguridad"></v-rating>
                </div>
                 <v-row no-gutters>
                      <v-col>
                        <v-img cols="2" height="30" width="50" :src="$store.state.baseUrl + '/static/vallado.png'"></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;"> Vallado por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton1Habilitado"
                          @click="FuncionSeguridad(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,1,15000)"
                        >Montar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row> 
                    <v-divider inset></v-divider>
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2" height="30" width="50" :src="$store.state.baseUrl + '/static/alarmaseguridad.png'"></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;"> Alarma de Seguridad por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton2Habilitado"
                        @click="FuncionSeguridad(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,2,15000)"
                        >Instalar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row>
                    <v-divider inset></v-divider> 
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="2" height="30" width="50" :src="$store.state.baseUrl + '/static/seguro.png'" ></v-img>
                      </v-col>
                      <v-col cols="6" class="text-center mb4">
                        <div class="pb-2" style="font-size: 8x;"> Seguro por 15000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!boton3Habilitado"
                        @click="FuncionSeguridad(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,3,15000)"
                        >Contratar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row> 
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>     
                <div class="text-center"> Calidad del Terreno : {{ $store.state.parcelapropia.calidadterrenofrase }} 
                  <v-rating
                  background-color="grey" color="green" :empty-icon=mdiStarOutline
                  :full-icon=mdiStar hover length="3" readonly
                  size="41" :value="$store.state.parcelapropia.calidadterreno"></v-rating>
                </div>
                <v-row no-gutters>
                      <v-col>
                        <v-img cols="3" height="30" width="50" :src="$store.state.baseUrl + '/static/riegoautomatico.png'"></v-img>
                      </v-col>
                      <v-col cols="5" class="text-center mb4">
                        <div class="pb-2"> Riego Automatico por 12000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!botonCalTerr1Habilitado"
                          @click="FuncionCalidadTerreno(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,1,12000)"
                        >Montar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row> 
                    <v-divider inset></v-divider> 
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="3"  height="30" width="50" :src="$store.state.baseUrl + '/static/fertilizacion.png'" ></v-img>
                      </v-col>
                      <v-col cols="5" class="text-center mb4">
                        <div class="pb-2">Fertilizantes por 12000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!botonCalTerr2Habilitado"
                        @click="FuncionCalidadTerreno(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,2,12000)"
                        >Fertilizar</v-btn>
                        </v-list-item-action>
                      </v-col>     
                    </v-row>
                    <v-divider inset></v-divider>  
                    <v-row no-gutters>
                      <v-col>
                        <v-img cols="3" height="30" width="50" :src="$store.state.baseUrl + '/static/invernadero.png'"></v-img>
                      </v-col>
                      <v-col cols="5" class="text-center mb4">
                        <div class="pb-2"> Invernadero por 12000 euros</div>
                      </v-col>
                      <v-col cols="4" class="text-center mb4">
                        <v-list-item-action>
                        <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small :disabled="!botonCalTerr3Habilitado"
                        @click="FuncionCalidadTerreno(usuario.nombre,$store.state.parcelapropia.ciudadParcela,$store.state.parcelapropia.nombre,3,12000)"
                        >Montar</v-btn>
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
      mdiShieldAccount
  } from '@mdi/js';
export default {
    props: [ 'usuario', 'ciudad',  'parcela', 'itemsplantacion', 'randomintparcela'],
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
          { tab: 'Plantaciones'},
          { tab: 'Empleados'},
          { tab: 'Seguridad'},
          { tab: 'Terreno'},
        ],
      }
    },
    methods:{
      paneloff(){
        this.$store.state.showPopupParcelaPropia=false;
      },
        modificarPlantacion(nombreusuario,nombreciudad,nombreparcela,listaplantacion,lugar) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
            let arrayplantaciones = [];
            for (let i = 0; i < listaplantacion.length; i++) {
                arrayplantaciones.push(listaplantacion[i].nombre);
            }
            axios
            .get(this.$store.state.baseUrl+"/modificarPlantacion/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&nombreParcela="+nombreparcela+"&arrayPlantacion="+arrayplantaciones)
            .then(response => {(this.plantacion = response.data);
              axios
              .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+nombreciudad+"&nombreParcela="+lugar+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.parcelapropia = response.data.parcela);
                console.log(this.$store.state.parcelapropia)})
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
            })//usuario
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
        },
        contratarEmpleado(nombreusuario,nombreciudad,lugar,nombreEmpleado) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
            axios
            .get(this.$store.state.baseUrl+"/contratarEmpleado/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Lugar="+lugar+"&nombreEmpleado="+nombreEmpleado)
            .then(response => {this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: response.data.tipo,});
              axios
              .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+nombreciudad+"&nombreParcela="+lugar+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.parcelapropia = response.data.parcela);
                console.log(this.$store.state.parcelapropia)  
              axios
                .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+nombreciudad)
                .then(response => (this.$store.state.itemsEmpleadosParados = response.data), console.log("empleadoparados"),console.log(this.$store.state.itemsEmpleadosParados))
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
            .then(response => {this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: response.data.tipo,});
            axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+nombreciudad+"&nombreParcela="+lugar+"&nombreUsuario="+nombreusuario,config)
            .then(response => {(this.$store.state.parcelapropia = response.data.parcela),console.log(this.$store.state.parcelapropia)    
            axios
            .get(this.$store.state.baseUrl+"/obtenerEmpleadosParados/?nombreCiudad="+nombreciudad)
            .then(response => (this.$store.state.itemsEmpleadosParados = response.data), console.log("empleadoparados"),console.log(this.$store.state.itemsEmpleadosParados))  
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
        },
        FuncionSeguridad(nombreusuario,nombreciudad,lugar,indice,precio) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/incrementarSeguridad/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Lugar="+lugar+"&indice="+indice+"&precio="+precio)
            .then(response => {this.$notify({group: 'foo',title: 'Mejora Seguridad Parcela',text: response.data.mensaje,type: 'success',});
            axios
            .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+nombreciudad+"&nombreParcela="+lugar+"&nombreUsuario="+nombreusuario,config)
            .then(response => {(this.$store.state.parcelapropia = response.data.parcela)    
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            
        },
        FuncionCalidadTerreno(nombreusuario,nombreciudad,lugar,indice,precio) {
          const config = {headers: {'Authorization': `Bearer ${this.$store.state.token}`}};
          axios
            .get(this.$store.state.baseUrl+"/incrementarCalidadTerreno/?nombreUsuario="+nombreusuario+"&nombreCiudad="+nombreciudad+"&Lugar="+lugar+"&indice="+indice+"&precio="+precio)
            .then(response =>{
              this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',});
              axios
              .get(this.$store.state.baseUrl+"/obtenerParcelaPropietario/?nombreCiudad="+nombreciudad+"&nombreParcela="+lugar+"&nombreUsuario="+nombreusuario,config)
              .then(response => {(this.$store.state.parcelapropia = response.data.parcela)    
              })
              .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
            })
            .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
    
        },
        actualizarBotones(){
            console.log("actualizarbotones")
            console.log(this.$store.state.parcelapropia.seguridad)
            this.boton1Habilitado= false;
            this.boton2Habilitado= false;
            this.boton3Habilitado= false;
            if(this.$store.state.parcelapropia.seguridad >= 0 && this.$store.state.parcelapropia.seguridad < 1){
            this.boton1Habilitado= true;
            this.boton2Habilitado= false;
            this.boton3Habilitado= false;
          }
          if(this.$store.state.parcelapropia.seguridad >= 1 && this.$store.state.parcelapropia.seguridad < 2){
            this.boton1Habilitado= false;
            this.boton2Habilitado= true;
            this.boton3Habilitado= false;
          }
          if(this.$store.state.parcelapropia.seguridad >= 2 && this.$store.state.parcelapropia.seguridad < 3){
            this.boton1Habilitado= false;
            this.boton2Habilitado= false;
            this.boton3Habilitado= true;
          }

           this.botonCalTerr1Habilitado= false;
            this.botonCalTerr2Habilitado= false;
            this.botonCalTerr3Habilitado= false;
            if(this.$store.state.parcelapropia.calidadterreno >= 0 && this.$store.state.parcelapropia.calidadterreno < 1){
            this.botonCalTerr1Habilitado= true;
            this.botonCalTerr2Habilitado= false;
            this.botonCalTerr3Habilitado= false;
          }
          if(this.$store.state.parcelapropia.calidadterreno >= 1 && this.$store.state.parcelapropia.calidadterreno < 2){
            this.botonCalTerr1Habilitado= false;
            this.botonCalTerr2Habilitado= true;
            this.botonCalTerr3Habilitado= false;
          }
          if(this.$store.state.parcelapropia.calidadterreno >= 2 && this.$store.state.parcelapropia.calidadterreno < 3){
            this.botonCalTerr1Habilitado= false;
            this.botonCalTerr2Habilitado= false;
            this.botonCalTerr3Habilitado= true;
          } 
        },
    },
  created() {
    this.actualizarBotones(); // Llamamos a la función para inicializar botones
    // Creamos un watcher para observar cambios en parcelapropia
    this.$watch(() => this.$store.state.parcelapropia, this.actualizarBotones);
  },
  
}
</script>
  