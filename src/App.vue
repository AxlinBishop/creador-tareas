<template>
  <div class="flex">
    <MenuTareas/>
    <div class="section_listas">
      <h1>{{ store.state.proyectoActual }}</h1>  <!-- EL NOMBRE QUE APARECERÁ DE TITULO ES EL NOMBRE DEL PROYECTO ACTUAL -->
      <div class="listados">
        <div class="flex">
          <ListasTareas />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import MenuTareas from './components/MenuTareas.vue';
import ListasTareas from './components/ListasTareas.vue';
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

.section_listas{
  width: 100%;
  background-color: #D7E3FC;
}
.section_listas h1{
  margin: 2rem 2rem;
}
</style>
