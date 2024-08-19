<template>
  <div class="flex">
    <MenuTareas/>
    <h1>{{ store.state.proyectoActual }}</h1>
  </div>
</template>

<script setup>
import BloqueTarea from './components/BloqueTarea.vue';
import MenuTareas from './components/MenuTareas.vue';
import { useStore } from 'vuex'; /* PARA UTILIZAR LA STORE DE VUEX*/

const store = useStore();
</script>

<style>
/* soft reset de stilos */
body{
  margin: 0;
}
.flex{
  display: flex;
}
</style>
