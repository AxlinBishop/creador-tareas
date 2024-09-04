<!-- ESTE COMPONENTE ES CADA BLOQUE/TAREA QUE SE AGREGA A UNA LISTA DE TAREAS, 
    DEPENDIENDO EL ESTADO COMPLETADA/PENDIENTE -->
<template>
    <div class="bloque" >
        <div :style="colorBloque(index)" v-if="tarea.proyecto == store.state.proyectoActual"> <!-- SOLO SE RENDERIZARAN LAS TAREAS QUE SEAN DEL PROYECTO SELECCIONADO -->
            <div class="bloque_info">
                <div class="flex"> <!-- UN DIV PARA PODER COLOCAR EL NOMBRE Y LA X EN FLEX Y SPACEBETWEEN -->
                    <p class="bloque_nombre">{{ tarea.nombre }}</p>
                    <button @click="eliminarTarea(index)">x</button>
                </div>
                <hr>
                <p class="bloque_descripcion">{{ tarea.descripcion}}</p>
            </div>
            <div class="bloque_botones">
                <button class="btn_estado btn_estado-pendiente" v-if="tarea.estado == 'completado'" @click="cambiarEstado(index)"><img class="img_estado" src="../assets/flecha-roja.png" alt="Pendiente"></button>
                <button class="btn_estado btn_estado-completado" v-if="tarea.estado == 'pendiente'" @click="cambiarEstado(index)"><img class="img_estado" src="../assets/flecha-verde.png" alt="Completado"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'; /* PARA UTILIZAR LA STORE DE VUEX */
import { defineProps } from 'vue'; /* PARA RECIBIR LOS PROPS DESDE LISTATAREASPPENDIENTES */

const store = useStore(); /* PARA UTLIZAR LA STORE */

/* PROPS */
const props = defineProps({
    tarea: Object,
    index: Number,
});
/* MÉTODOS */
/* COLOR DEL BLOQUE */
const colorBloque = ((index) => { /* DEPENDIENDO DEL ESTADO DE LA TAREA PENDIENTE/COMPLETADO */
    if (props.tarea.estado == "pendiente"){ /* SI ES PENDIENTE */
        return { backgroundColor: 'red' }/* COLOR DEL BLOQUE ROJO */
    }else{ /* SI NO ES PENDIENTE (COMPLETADO) */
        return { backgroundColor: 'green' } /* COLOR DEL BLOQUE VERDE */
    }
})
/* AL PRESIONAR EL BOTÓN, LA TAREA SERÁ ELIMINADA */
function eliminarTarea(index){
    store.commit("eliminarTarea", index)
}
/* AL PRESIONAR EL BOTON CAMBIARA EL ESTADO DE LA TAREA A COMPLETADA */
function cambiarEstado(index){
    if(props.tarea.estado == "pendiente"){ /* SI EL ESTADO DE LA TAREA ES PENDIENTE */
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
.bloque_nombre{ /* NOMBRE DE LA TAREA DENNTRO DEL BLOQUE UN POCO MÁS GRANDE Y EN NEGRITA*/
    font-size: large;  
    font-weight: 600;
    margin: 0;
    padding: 0.2rem;
}
.bloque_botones{
    justify-content: space-between;
}
.btn_estado{
    padding: 0;
    &-completado{
        margin-left: auto;
    }
}
.img_estado{
    width: 1rem;
}
.flex{
    justify-content: space-between;
}
hr{ /* ESTILO DE LA LINEA DE SEPARACIÓN ENTRE NOMBRE Y DESCRIPCIÓN */
    width: 90%;
    padding: 0;
    margin: 0;
    background-color: rgba(65, 58, 58, 0.2);
    border-color: rgba(65, 58, 58, 0.2);
}
</style>