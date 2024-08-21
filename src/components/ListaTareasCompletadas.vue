<!-- ESTE COMPONENTE ES LA LISTA DONDE SE ACOMODARÁN COMO BLOQUES LAS TAREAS QUE ESTAN COMPLETADAS -->
<template>
    <div class="lista">
        <h2>Tareas Completadas</h2>
        <div v-for="(tarea, index) in store.state.tareas" :key="index">
            <div v-if="tarea.estado === 'completado'">
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