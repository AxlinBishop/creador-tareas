<!-- ESTE COMPONENTE ES LA LISTA DONDE SE ACOMODARA´N COMO BLOQUES LAS TAREAS QUE ESTAN PENDIENTES -->
<template>
    <div class="lista">
        <h2>Tareas Pendientes</h2>
        <div v-for="(tarea, index) in store.state.tareas" :key="index">
            <div v-if="tarea.estado === 'pendiente'">
                <BloqueTarea :tarea = "tarea" :index="index"  />
            </div>
        </div>
    </div>
</template>

<script setup>
import BloqueTarea from './BloqueTarea.vue'; /* PARA UTILIZAR EL COMPONENTE BLOQUETAREA */
import { useStore } from 'vuex'; /* PARA UTILIZAR LA STORE DE VUEX */

const store = useStore(); /* PARA UTILIZAR LA STORE */


</script>

<style scoped>

</style>