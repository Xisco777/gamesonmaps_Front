<template>
    <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                    <v-list>
                  <v-list-item>
                  <v-row no-gutters>
                    <v-col cols="1"> 
                    </v-col>
                    <v-col cols="2">
                      <v-list-item-title>Icono</v-list-item-title>  
                    </v-col>
                    <v-col cols="6"  class="d-flex align-center">
                      <v-list-item-title>Producto</v-list-item-title>  
                    </v-col>
                    <v-col cols="3"  class="d-flex align-center">
                      <v-list-item-title>Cantidad</v-list-item-title>  
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item v-for="tile in $store.state.usuario_websocket.almacen" :key="tile.tipo">
                  <v-row no-gutters>
                    <v-col cols="1"> 
                    </v-col>
                    <v-col cols="2">
                      <v-list-item-avatar>
                        <v-avatar size="32px" tile>
                          <v-img :src="$store.state.baseUrl+'/static/'+tile.tipo+'.png'"></v-img>
                        </v-avatar>
                      </v-list-item-avatar> 
                    </v-col>
                    <v-col cols="6"  class="d-flex align-center">
                      <v-list-item-title>{{ tile.tipo }}</v-list-item-title>  
                    </v-col>
                    <v-col cols="3"  class="d-flex align-center">
                      <v-list-item-title> {{ tile.numero.toFixed(0) }}</v-list-item-title>  
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
    import {
        mdiStore,
      } from '@mdi/js';
    export default {
        data() {
        return {
            
            icons: {
            mdiStore,
          },
          }
        },
        methods:{
            
        }
      
    }
      </script>
      
      <style scoped>
      /* Estilos específicos para este componente si es necesario */
      </style>