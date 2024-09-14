<!-- ESTE COMPONENTE ES LA LISTA DONDE SE ACOMODARA´N COMO BLOQUES LAS TAREAS QUE ESTAN PENDIENTES -->
<template>
    <div class="lista">
        <h2>Tareas Pendientes</h2>
        <div class="tareas">
            <div class="tarea" v-for="(tarea, index) in store.state.tareas" :key="index">
                <div v-if="tarea.estado === 'pendiente'">
                    <BloqueTarea :tarea = "tarea" :index="index"  />
                </div>
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
.lista{
    margin: 0 6rem;
    width: 20vw;
    background-color: #7A9EEA;
    border-radius: 10px;
}
.tareas{ /* CUADRADO DONDESE COLCOARÁ CADA ELEMENTO DE LAS TAREAS */
    background-color: #A9C1F4;
    padding: 0.5rem 0; /* PADDING PARA QUE HUBIERA UN POCO DE RELLENO POR SOBRE LA PRIMERA TAREA */
    height: 85%; /* QUE TENGA UN TOPE DE LA ALTURA */
    width: 95%; /* EL CUADRO DEJE UN PEQUEÑO ESPACIO VACIO A LOS LADOS */
    margin: auto; /* LOS ESPACIOS AL REDEDOR QUEDEN AL CENTRO */
    border-radius: 5px;
    overflow-y: auto; /* QUE NO SE LLENE DE TAREAS INDEFINIDAMENTE HACIA ABAJO Y CREE UN SCROLLBAR  */
}
/* SCROLLBAR DE TAREAS */
.tareas::-webkit-scrollbar { /* Ancho del scrollbar */
    width: 10px;
}
.tareas::-webkit-scrollbar-track {/* Color de fondo del scrollbar */
    background: #3567D2;
}
.tareas::-webkit-scrollbar-thumb { /* Color y forma del "thumb" */
    background: #0B3898;     /* Color del thumb */
    border-radius: 6px;     /* Bordes redondeados del thumb */
}
.tareas::-webkit-scrollbar-thumb:hover { /* Color del thumb cuando el cursor pasa sobre él */
    background: #082B77;
}

.tarea{
    width: 98%;
    margin: auto;
}
.lista h2{
}
</style>