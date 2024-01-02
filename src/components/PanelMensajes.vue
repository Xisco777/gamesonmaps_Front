<template>
<v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
              <v-list>
                <v-list-item  v-for="(oferta,index) in $store.state.ofertas_websocket"  :key="index"  @click="sheetMensajes = false">
                  <v-row no-gutters>
                    <v-col cols="8">
                      <v-list-item-title>{{ oferta.mensaje }}</v-list-item-title> 
                    </v-col>
                    <v-col cols="2"  class="d-flex align-center">
                      <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                      @click="aceptarOferta(oferta.usuario,oferta.usuarioRival,oferta.nombreciudad,oferta.lugar,oferta.oferta,index)"
                      >Aceptar</v-btn> 
                    </v-col>
                    <v-col cols="2"  class="d-flex align-center">
                      <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                      @click="rechazarOferta(oferta.usuario,oferta.usuarioRival,oferta.nombreciudad,oferta.lugar,oferta.oferta,index)"
                      >Rechazar</v-btn>
                    </v-col>
                  </v-row>      
                </v-list-item>
                <v-list-item v-for="(respuestaoferta,index) in $store.state.respuestaofertas_websocket" :key="index" @click="sheetMensajes = false">
                  <v-row no-gutters>
                    <v-col cols="8">
                      <v-list-item-title>{{ respuestaoferta.mensaje }}</v-list-item-title> 
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                      @click="eliminarMensajeRespuestaOferta(index)">Eliminar</v-btn>
                    </v-col>
                  </v-row>    
                </v-list-item>
                <v-list-item v-for="(respuestarobos,index) in $store.state.robosparcela_websocket" :key="index" @click="sheetMensajes = false">
                  <v-row no-gutters>
                    <v-col cols="8">
                      <v-list-item-title>{{ respuestarobos.mensaje }}</v-list-item-title> 
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                      @click="eliminarMensajeRespuestaRobosParcela(index)">Eliminar</v-btn>
                    </v-col>
                  </v-row>    
                </v-list-item>
                <v-list-item v-for="(roboscasa,index) in $store.state.roboscasa_websocket" :key="index"  @click="sheetMensajes = false">
                  <v-row no-gutters>
                    <v-col cols="8">
                      <v-list-item-title>{{ roboscasa.mensaje }}</v-list-item-title>  
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                      @click="eliminarMensajeRespuestaRobosCasas(index)">Eliminar</v-btn>
                    </v-col>
                  </v-row>  
                </v-list-item>
                <v-list-item v-for="(robostienda,index) in $store.state.robostienda_websocket" :key="index" @click="sheetMensajes = false">
                  <v-row no-gutters>
                    <v-col cols="8">
                      <v-list-item-title>{{ robostienda.mensaje }}</v-list-item-title>   
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-btn rounded class="justify-center ml-auto" color="primary" elevation="1" outlined small
                      @click="eliminarMensajeRespuestaRobosTiendas(index)">Eliminar</v-btn>
                    </v-col>
                  </v-row>  
                  
                </v-list-item>
              </v-list>
            </v-card>
               </v-flex>
            </v-layout>
         </v-container>
 </template>

         <script>
         import axios from 'axios';
         import {
            mdiMessage,
           } from '@mdi/js';
         export default {
             data() {
             return {
                sheetMensajes:false,
                icons: {
                mdiMessage,
               },
               reponseoferta:{}
               }
             },
             methods:{
              eliminarMensajeRespuestaRobosParcela(index){ 
                    this.$store.state.robosparcela_websocket.splice(index, 1);
                    this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
                    },
              eliminarMensajeRespuestaRobosCasas(index){ 
                    this.$store.state.roboscasa_websocket.splice(index, 1);
                    this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
                    },
              eliminarMensajeRespuestaRobosTiendas(index){ 
                    this.$store.state.robostienda_websocket.splice(index, 1);
                    this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
                    },
              eliminarMensajeRespuestaOferta(index){ 
                    this.$store.state.respuestaofertas_websocket.splice(index, 1);
                    this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
                    },
              aceptarOferta(usuario,usuarioRival,nombreciudad,lugar,oferta,index){
                    axios
                      .get(this.$store.state.baseUrl+"/aceptarOferta/?nombreUsuario="+usuario+"&usuarioRival="+usuarioRival+"&nombreCiudad="+nombreciudad+"&lugar="+lugar+"&oferta="+oferta)
                      .then(response => {(this.reponseoferta = response.data);
                        this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',});
                        if(this.reponseoferta.aceptada==true){
                          this.$store.state.ofertas_websocket.splice(index, 1);
                          this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
                        }
                      })
                      .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
                    },
              rechazarOferta(usuario,usuarioRival,nombreciudad,lugar,oferta,index){
                    axios
                      .get(this.$store.state.baseUrl+"/rechazarOferta/?nombreUsuario="+usuario+"&usuarioRival="+usuarioRival+"&nombreCiudad="+nombreciudad+"&lugar="+lugar+"&oferta="+oferta)
                      .then(response =>{ (this.reponseoferta = response.data);
                      this.$notify({group: 'foo',title: 'Compra',text: response.data.mensaje,type: 'success',});
                      })
                      .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});}); 
                    this.$store.state.ofertas_websocket.splice(index, 1);
                    this.$store.state.countMessages = this.$store.state.ofertas_websocket.length+this.$store.state.respuestaofertas_websocket.length+this.$store.state.robosparcela_websocket.length+this.$store.state.roboscasa_websocket.length+this.$store.state.robostienda_websocket.length; // Actualizamos la cantidad de ofertas
                    },
             }
           
         }
</script>
           
<style scoped>
           /* Estilos específicos para este componente si es necesario */
</style>