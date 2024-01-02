<template>
  <pagina-juego />
</template>

<script lang="ts">
  import Vue from 'vue'
  import PaginaJuego from '../components/PaginaJuego.vue'

  export default Vue.extend({
    name: 'HomeView',

    components: {
      PaginaJuego,
    },
  })
</script>
