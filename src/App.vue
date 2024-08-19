<template>
  <div class="flex">
    <MenuTareas/>
    <div class="div">
      <h1>{{ store.state.proyectoActual }}</h1>  <!-- EL NOMBRE QUE APARECERÁ DE TITULO ES EL NOMBRE DEL PROYECTO ACTUAL -->
      <div class="flex">
        <ListaTareasPendientes/>
        <ListaTareasCompletadas/>
      </div>
    </div>

  </div>
</template>

<script setup>
import MenuTareas from './components/MenuTareas.vue';
import ListaTareasPendientes from './components/ListaTareasPendientes.vue';
import ListaTareasCompletadas from './components/ListaTareasCompletadas.vue';
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
