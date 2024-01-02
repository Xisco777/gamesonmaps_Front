<template>

    <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Registro</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                     <form ref="form" @submit.prevent="register()">
                            <v-text-field
                              v-model="username"
                              name="username"
                              label="Username"
                              type="text"
                              placeholder="username"
                              required
                           ></v-text-field>
                           
                            <v-text-field
                              v-model="password"
                              name="password"
                              label="Password"
                              type="password"
                              placeholder="password"
                              required
                           ></v-text-field>

                           <v-text-field
                              v-model="confirmPassword"
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              placeholder="cocnfirm password"
                              required
                           ></v-text-field>
                           <div class="red--text"> {{errorMessage}}</div>
                           <v-row>
                            <v-col cols="8">
                              <!-- Botón de inicio de sesión -->
                              <v-btn type="submit" class="mt-4" color="primary" value="registrarse">Registrarse</v-btn>
                            </v-col>

                            <!-- <v-col cols="2">
                              
                              <v-btn rounded class="mt-4" color="primary" @click="regFacebook()">
                                <v-icon>{{ icons.mdiFacebook }}</v-icon>
                              </v-btn>
                            </v-col>

                            <v-col cols="2">
                              
                              <v-btn rounded class="mt-4" color="primary" @click="regGoogle()">
                                <v-icon>{{ icons.mdiGoogle }}</v-icon>
                              </v-btn>
                            </v-col> -->
                          </v-row>
                           <div class="grey--text mt-4" v-on:click="logearse()">
                              Logearse 
                           </div>
                      </form>
                     </v-card-text>
                  </v-card>
                
               </v-flex>
            </v-layout>
         </v-container>

</template>
  


<script>
import axios from 'axios';
import {
  mdiFacebook,
  mdiGoogle,
  } from '@mdi/js';
  export default {
    data() {
    return {
      icons: {
          mdiFacebook,
          mdiGoogle,
        },
      username: "",
      password: "",
      confirmPassword: "",
      isRegister : false,
      errorMessage: "",
      mensaje:"",
    };
  },
  methods: {
    logearse(){
      this.$router.push("/login");
    },
    register() {
       if(this.password == this.confirmPassword){
        axios.get(this.$store.state.baseUrl+"/registrarse/?nombreUsuario="+this.username+"&contrasena="+this.password)
        .then(response => {
          (this.mensaje = response.data.mensaje),console.log(this.mensaje)
        })
        .catch(function (error) {
          console.log(error);
        });
        this.$router.push("/login");
        this.errorMessage = "";
        this.$refs.form.reset();
       }
       else {
         this.errorMessage = "Error al introducir la contraseña"
       }
    }
  },
  };
</script>

