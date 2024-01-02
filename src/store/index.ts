import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    usuario: '',
    Idusuario: '',
    parcelas: [{"objeto": [],
      "name": "",
      "precio": 0,
      "tamano": 0,
      "propietario":"",
      "ciudad":"",
      "usuario":""}],
      fruterias: [{"name": "", "precio": 0, "tamano": 0, "propietario":"","coords":[0.0,0.0], "usuario":""}],
      cities: [],
      zoom: 7,
      center: [40.416775, -3.703790],
      mapOptions: {
        zoomSnap: 0.5,
        maxZoom: 10,
        minZoom: 6
      },
      showPopupParcelaRival:false,
      showPopupParcelaPropia:false,
      showPopupParcelaLibre:false,
      showPopupCasaLibre:false,
      showPopupCasaPropia: false,
      showPopupCasaRival: false,
      showPopupTiendaLibre: false,
      showPopupTiendaPropia: false,
      showPopupTiendaRival: false,
      partida:false,
      // baseUrl:'http://127.0.0.1:8000',
      // baseUrlPortWS:'ws://127.0.0.1:8000',
      baseUrl:'https://gamesonmaps.com:8000',
      baseUrlPortWS:'wss://gamesonmaps.com:8000',
      baseUrlhttps:'https://gamesonmaps.com:8000',
      
      //baseUrl:'http://20.199.12.33:8000',
      //baseUrlPortWS:'ws://20.199.12.33:8000',
      ciudadPropia:false,
      casas: [{"objeto": [],
      "name": "",
      "precio": 0,
      "tamano": 0,
      "propietario":"",
      "coords":[0.0,0.0],
      "usuario":""}],
      titulo:"Games On Maps",
      parcelapropia:{},
      selects:[{ nombre: 'Vino', urlicono: 'http://localhost:8083/vino.PNG' },{ nombre: 'Almendras', urlicono: 'http://localhost:8083/almendros.PNG' },
      { nombre: 'Libre', urlicono: 'http://localhost:8083/libre.PNG' },],
      selectsTienda:[{ nombre: 'Vino', urlicono: 'http://localhost:8083/vino.PNG' },{ nombre: 'Almendras', urlicono: 'http://localhost:8083/almendros.PNG' },
      { nombre: 'Libre', urlicono: 'http://localhost:8083/libre.PNG' },],
      casapropia:{},
      tiendapropia:{},
      countMessages:0,
      robosparcela_websocket:[],
      ofertas_websocket:[],
      respuestaofertas_websocket:[],
      roboscasa_websocket:[],  
      robostienda_websocket:[],
      usuario_websocket: {
        "IDMessage":"",
        "dinero": 0.0,
        "ano": 0,
        "mes": "",
        "almacen":[{"tipo": "", "numero": 0, "precio":0}],
        "prestigio":0.0
      },
      casarival:{},
      clasificacion:[],
      test:[],
  },
  getters: {
  },
  mutations: {
    actualizarToken(state, nuevoValor) {
      state.token = nuevoValor;
    },
    actualizarUsuario(state, nuevoValor) {
      state.usuario = nuevoValor;
    },
    actualizarIdUsuario(state, nuevoValor) {
      state.Idusuario = nuevoValor;
    },
    actualizarcasas(state, nuevoValor) {
      state.casas = nuevoValor;
    },
    actualizarcities(state, nuevoValor) {
      state.cities = nuevoValor;
    },
    actualizarcenter(state, nuevoValor) {
      state.center = nuevoValor;
    },
    actualizarzoom(state, nuevoValor) {
      state.zoom = nuevoValor;
    },
    actualizarmapOptions(state, nuevoValor) {
      state.mapOptions = nuevoValor;
    },
    actualizarparcelas(state, nuevoValor) {
      state.parcelas = nuevoValor;
    },
    actualizarfruterias(state, nuevoValor) {
      state.fruterias = nuevoValor;
    },
    actualizarshowPopupParcelaRival(state, nuevoValor) {
      state.showPopupParcelaRival = nuevoValor;
    }
  },
  actions: {
    actualizarToken(context, nuevoValor) {
      context.commit('actualizarToken', nuevoValor);
    },
    actualizarUsuario(context, nuevoValor) {
      context.commit('actualizarUsuario', nuevoValor);
    },
    actualizarIdUsuario(context, nuevoValor) {
      context.commit('actualizarIdUsuario', nuevoValor);
    },
    actualizarcasas(context, nuevoValor) {
      context.commit('actualizarcasas', nuevoValor);
    },
    actualizarcities(context, nuevoValor) {
      context.commit('actualizarcities', nuevoValor);
    },
    actualizarcenter(context, nuevoValor) {
      context.commit('actualizarcenter', nuevoValor);
    },
    actualizarzoom(context, nuevoValor) {
      context.commit('actualizarzoom', nuevoValor);
    },
    actualizarmapOptions(context, nuevoValor) {
      context.commit('actualizarmapOptions', nuevoValor);
    },
    actualizarparcelas(context, nuevoValor) {
      context.commit('actualizarparcelas', nuevoValor);
    },
    actualizarfruterias(context, nuevoValor) {
      context.commit('actualizarfruterias', nuevoValor);
    },
    actualizarshowPopupParcelaRival(context, nuevoValor) {
      context.commit('actualizarshowPopupParcelaRival', nuevoValor);
    }
  },
  modules: {
  }
})