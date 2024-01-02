import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import seleccionTierraTesoro from '../views/SeleccionTierraTesoro.vue'
import seleccionWorldManager from '../views/SeleccionWorldManager.vue'
import panelMensajes from '../components/PanelMensajes.vue'
import panelEstadisticas from '../components/PanelEstadisticas.vue'
import panelAlmacen from '../components/PanelAlmacen.vue'
import store from '../store/index'; // Asegúrate de proporcionar la ruta correcta
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/partidas',
    name: 'home',
    component: HomeView,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/guiaTierraTesoro',
    name: 'guiaTierraTesoro',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuiaViewTierraTesoro.vue'),
    meta: {
      requAuth:false
    }

  },
  {
    path: '/seleccionTierraTesoro',
    name: 'seleccionTierraTesoro',
    component: seleccionTierraTesoro,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/mensajes',
    name: 'mensajes',
    component: panelMensajes,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/almacen',
    name: 'almacen',
    component: panelAlmacen,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/estadisticas',
    name: 'estadisticas',
    component: panelEstadisticas,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/enDesarrollo',
    name: 'seleccionWorldManager',
    component: seleccionWorldManager,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/',
    name: 'mainView',
    component: MainView,
    meta: {
      requAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      requAuth:false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue'),
    meta: {
      requAuth:false
    }
  },
  {
    path: '/foro',
    name: 'foro',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForoView.vue'),
    meta: {
      requAuth:false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // Verificar alguna condición, como la autenticación
  const isAuthenticated = store.state.token != '' ;

  if (to.path === '/partidas' && !isAuthenticated) {
    // Redirigir al usuario a la página de inicio si no está autenticado
    next('/login');
  } else {
    // Continuar con la navegación
    next();
  }
});

export default router
