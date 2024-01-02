<template>
    <v-bottom-sheet v-model="sheetMas" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn  v-bind="attrs"  v-on="on" @click="mas()">
                <v-icon>{{ icons.mdiPlusCircleOutline }}</v-icon>
              </v-btn>
            </template>
            <v-bottom-navigation  :value="value" color="primary">
            <v-btn @click="mensajes()">
              <span>Mensajes</span>
                  <v-icon>{{ icons.mdiMessage }}</v-icon>
                </v-btn>
                <v-btn @click="estadisticas()">
                  <span>Estadisticas</span>
                  <v-icon>{{ icons.mdiCounter }}</v-icon>
                </v-btn>
            </v-bottom-navigation>
          </v-bottom-sheet> 
</template>
        
        <script>
        import axios from 'axios'; 
        import {
          mdiPlusCircleOutline,
          mdiMessage,
          mdiCounter,
          } from '@mdi/js';
        export default {
            // props: ['usuario_websocket'],
            data() {
            return {
              sheetMas:false,
                icons: {
                  mdiPlusCircleOutline,
                  mdiMessage,
                  mdiCounter,
              },
              
              }
            },
            methods:{
              mensajes() { //añadir idoferta
                this.$router.push("/mensajes");
            },
            estadisticas() { //añadir idoferta
              axios
                    .get(this.$store.state.baseUrl+"/actualizarclasificacion/")
                    .then(response => {(this.$store.state.clasificacion = response.data),
                      this.$router.push("/estadisticas");} )
                    .catch((error) => {this.$notify({group: 'foo',title: 'Error',text: error,type: 'error',});});
                     
                    
                
            }
          
        }
      }
          </script>
          
          <style scoped>
          /* Estilos específicos para este componente si es necesario */
          </style>