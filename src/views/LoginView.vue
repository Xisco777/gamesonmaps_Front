<template>
  <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Logearse</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                     <form ref="form" @submit.prevent="login()">
                            <v-text-field
                              v-model="name"
                              name="username"
                              label="Nombre Usuario"
                              type="text"
                              placeholder="username"
                              required
                           ></v-text-field>
                           
                            <v-text-field
                              v-model="password"
                              name="password"
                              label="Contraseña"
                              type="password"
                              placeholder="password"
                              required
                           ></v-text-field>
                           <div class="red--text"> {{errorMessage}}</div>
                           <v-row>
                            <v-col cols="8">
                              <!-- Botón de inicio de sesión -->
                              <v-btn type="submit" class="mt-4" color="primary" value="logearse">Entrar</v-btn>
                            </v-col>

                            <!-- <v-col cols="2">
                              
                              <v-btn rounded class="mt-4" color="primary" @click="loginFacebook()">
                                <v-icon>{{ icons.mdiFacebook }}</v-icon>
                              </v-btn>
                            </v-col>

                            <v-col cols="2">
                              
                              <v-btn rounded class="mt-4" color="primary" @click="loginGoogle()">
                                <v-icon>{{ icons.mdiGoogle }}</v-icon>
                              </v-btn>
                            </v-col> -->
                          </v-row>
          
                           <div class="grey--text mt-4" v-on:click="registrarse()">
                              Registrarse
                           </div>
                      </form>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>

</template>
  


<script>

//   import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import {
  mdiFacebook,
  mdiGoogle,
  } from '@mdi/js';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


  export default {
    data() {
      return {
        icons: {
          mdiFacebook,
          mdiGoogle,
        },
        name: "",
        password: "",
        valid:true,
        errorMessage: "",
        // token:''
      };
    },
     methods: {
      registrarse(){
      this.$router.push("/register");
    },
      login() {

        const data = new URLSearchParams();
        data.append('username', this.name);
        data.append('password', this.password);

        axios.post(this.$store.state.baseUrl+"/login", data)
        .then(response => {
          this.$store.dispatch('actualizarToken', response.data.access_token);
          this.$store.dispatch('actualizarUsuario', this.name);
          this.$store.dispatch('actualizarIdUsuario', response.data.user_id);
          this.$router.push("/partidas");
        })
        .catch(function (error) {
          this.errorMessage=error;
        });
      },
      loginGoogle(){
        const googleProvider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
            // The signed-in user info.
            const user = result.user;
            console.log(token,user,credential.email, credential.name, credential.password)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            this.errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      }
    }, 
  };
</script>

