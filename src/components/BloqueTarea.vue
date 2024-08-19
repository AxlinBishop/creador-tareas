<!-- ESTE COMPONENTE ES CADA BLOQUE/TAREA QUE SE AGREGA A UNA LISTA DE TAREAS, 
    DEPENDIENDO EL ESTADO COMPLETADA/PENDIENTE -->
<template>
    <div class="bloque" v-for="(tarea, index) in store.state.tareas" :key="index">
        <div v-if="tarea.proyecto == store.state.proyectoActual"> <!-- SOLO SE RENDERIZARAN LAS TAREAS QUE SEAN DEL PROYECTO SELECCIONADO -->
            <div class="bloque_info">
                <p class="bloque_nombre">{{ tarea.nombre }}</p>
                <p class="bloque_descripcion">{{ tarea.descripcion}}</p>
            </div>
            <div class="bloque_botones">
                <button @click="eliminarTarea(index)">Eliminar</button>
                <button v-if="tarea.estado == 'pendiente'" @click="cambiarEstado(index)">Completado</button>
                <button v-if="tarea.estado == 'completado'" @click="cambiarEstado(index)">Pendiente</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'; /* PARA UTILIZAR LA STORE DE VUEX */

const store = useStore(); /* PARA UTLIZAR LA STORE */

/* MÉTODOS */
/* AL PRESIONAR EL BOTÓN, LA TAREA SERÁ ELIMINADA */
function eliminarTarea(index){
    store.commit("eliminarTarea", index)
}
/* AL PRESIONAR EL BOTON CAMBIARA EL ESTADO DE LA TAREA A COMPLETADA */
function cambiarEstado(index){
    if(store.state.tareas[index].estado == "pendiente"){ /* SI EL ESTADO DE LA TAREA ES PENDIENTE */
        store.commit("cambiarEstado", {indice: index, estado: "completado"}) /* ENVIA EL OBJETO COMO PAYLOAD */
    }else{ /* EN CASO CONTRARIO (COMPLETADO) */
        store.commit("cambiarEstado", {indice: index, estado: "pendiente"}) /* ENVIA EL OBJETO COMO PAYLOAD */
    }

}

</script>

<style scoped>
/* Estilo del bloque de cada tarea */
.bloque {
    background-color: rgba(96, 103, 207, 0.7);
}

</style>