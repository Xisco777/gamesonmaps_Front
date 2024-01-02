import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import 'leaflet/dist/leaflet.css';
//import './leaflet/leaflet.css';
import vuetify from './plugins/vuetify'
import router from './router'
Vue.config.productionTip = false

//import { setupComponents } from './config/setup-components'

//setupComponents(Vue);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXdApmn69PVSPv4SCr0Vh6iPRoyq-_fGg",
  authDomain: "demo2juegogestion.firebaseapp.com",
  projectId: "demo2juegogestion",
  storageBucket: "demo2juegogestion.appspot.com",
  messagingSenderId: "737706753177",
  appId: "1:737706753177:web:7f9dc7382bdf7dae600c08"
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

