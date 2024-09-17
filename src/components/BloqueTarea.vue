<!-- ESTE COMPONENTE ES CADA BLOQUE/TAREA QUE SE AGREGA A UNA LISTA DE TAREAS, 
    DEPENDIENDO EL ESTADO COMPLETADA/PENDIENTE -->
<template>
    <div class="bloque" >
        <div :style="colorBloque(index)" v-if="tarea.proyecto == store.state.proyectoActual"> <!-- SOLO SE RENDERIZARAN LAS TAREAS QUE SEAN DEL PROYECTO SELECCIONADO -->
            <div class="bloque_info">
                <div class="flex"> <!-- UN DIV PARA PODER COLOCAR EL NOMBRE Y LOS BOTONES EN SÁCE BETWEEN -->
                    <p class="bloque_nombre">{{ tarea.nombre }}</p>
                    <div class="bloque_botones">
                        <button class="btn_estado btn_estado-pendiente" v-if="tarea.estado == 'completado'" @click="cambiarEstado(index)"><img class="img_estado" src="../assets/flecha-roja.png" alt="Pendiente"></button>
                        <button class="btn_estado btn_estado-completado" v-if="tarea.estado == 'pendiente'" @click="cambiarEstado(index)"><img class="img_estado" src="../assets/flecha-verde.png" alt="Completado"></button>
                        <button @click="eliminarTarea(index)">❌</button>
                    </div>
                </div>
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
        return { backgroundColor: '#CB7492' }/* COLOR DEL BLOQUE ROJO */
    }else{ /* SI NO ES PENDIENTE (COMPLETADO) */
        return { backgroundColor: '#7FD1B7' } /* COLOR DEL BLOQUE VERDE */
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
/* QUITAR FONDO A LOS BUTTONS */
button{
    background-color: transparent;
    border: none;
    padding: 0.2rem;
    margin: 0.1rem;
    &:hover{
        background-color: rgba(0, 0, 100, 0.2);
        cursor: pointer; /* PARA QUE EL USUARIO SEPA QUE ES CLICKEABLE */
    }
}
/* Estilo del bloque de cada tarea */
.bloque {
    margin: 0.5rem 0;
}
.bloque_info{
    padding: 0.5rem;
}
.bloque_nombre{ /* NOMBRE DE LA TAREA DENNTRO DEL BLOQUE UN POCO MÁS GRANDE Y EN NEGRITA*/
    font-size: large;  
    font-weight: 600;
    margin: 0;
    padding: 0 0.2rem;
    width: 80%;
}
.bloque_botones{
    justify-content: space-between;
    margin: auto;
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