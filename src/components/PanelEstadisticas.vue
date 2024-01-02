<template>
    <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
              <v-list>
                <v-list-item >
                  <v-row no-gutters>
                    <v-col cols="2">
                      <v-list-item-title>Posición</v-list-item-title> 
                    </v-col>
                    <v-col cols="2"> 
                      <v-list-item-title>Icono</v-list-item-title>
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-list-item-title>Nombre</v-list-item-title>  
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-list-item-title>Cantidad</v-list-item-title> 
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item v-for="posicion,index in $store.state.clasificacion" :key="posicion.dinero">
                  <v-row no-gutters>
                    <v-col cols="2">
                      <v-list-item-title>{{ index+1 }}</v-list-item-title> 
                    </v-col>
                    <v-col cols="2"> 
                      <v-list-item-avatar>
                        <v-avatar
                          color="blue"
                          size="38"
                        >
                          <span class="white--text text-h5">{{ posicion.iniciales }}</span>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-list-item-title>{{ posicion.nombre }}</v-list-item-title>  
                    </v-col>
                    <v-col cols="4"  class="d-flex align-center">
                      <v-list-item-title>{{ posicion.dinero.toFixed(1) }}€</v-list-item-title>
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
            mdiCounter,
          } from '@mdi/js';
        export default {
            // props: ['usuario_websocket'],
            data() {
            return {

                icons: {
                mdiCounter,
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