/* // Core Components
import PageFooter from '../components/PageFooter.vue';


function setupComponents(Vue){

  Vue.component('page-footer', PageFooter);
  
}


export {
  setupComponents
}

import { App } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import MyButton from '@/components/MyButton.vue';

// Registra el componente HelloWorld de manera global
export function setupGlobalComponents(app: App) {
  app.component('HelloWorld', HelloWorld);
}

// Registra el componente MyButton de manera global
export function setupMyButtonComponent(app: App) {
  app.component('MyButton', MyButton);
} */