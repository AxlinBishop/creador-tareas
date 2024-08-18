<!-- ESTE COMPONENTE ES UN ASIDE EN EL CUAL SE PUEDEN AGREGAR TAREAS MEDIANTE 
    LOS CAMPOS DE NOMBRE Y DESCRIPCIÓN -->
<template>
    <section class="menu fullHeight" >
        <!-- UNA BARRA VERTICAL CON EL ICONO DE UNA FLECHA QUE AL PRESIONAR HARÁ QUE SE EXTIENDA LA BARRA -->
        <div class="menuLateral fullHeight" v-if="store.state.isExpanded">
            <div class="agregarTarea-form">
                <div class="form-group">
                    <label for="nombreTarea">Nombre de la tarea</label>
                    <input type="text" name="nombreTarea" id="nombreTarea" v-model="nombreTarea">
                </div>
                <div class="form-group">
                    <label for="descripcionTarea">Descripción  de la Tarea</label>
                    <textarea name="descripciónTarea" id="descripcionTarea" v-model="descripcionTarea"></textarea>
                </div>
                <button @click="agregarTarea">Agregar Tarea</button>
            </div>
            <hr>
        </div>
        <div class="menuExtension fullHeight" @click="changeExpandedState"> 
            <!-- CON LOS V-IF CAMBIO EL SENTID DE LA FLECHA DEPENDIENDO DEL STATE DE isExpanded -->
            <p  v-if="store.state.isExpanded"><--</p>
            <p  v-if="!store.state.isExpanded"> --> </p>
        </div>
    </section>
</template>

<script setup>
/* IMPORTACIONES */
import { useStore } from 'vuex'; /* PARA PODER UTILIZAR LA STORE DE VUEX */
import {ref} from "vue"; /* PARA QUE EL VALOR DE LAS VARIABLES SEAN REACTIVAS */

/* VARIABLES */
const store = useStore(); /* PODEMOS UTILIZAR LA STORE CON ESTA CONSTANTE */
const tarea = ref({}); /* SE GUARDARA EL OBJETO CON LAS PROPIEDADES DE NOMBRE Y DESCRIPCIÓN PARA PODER ENVIARLOS AL ESTADO */
const nombreTarea = ref("") /* NOMBRE QUE SE LE ASIGNARÁ A LA TAREA */
const descripcionTarea = ref(""); /* DESCRIPCIÓN DE LO QUE SE DEBE HACER */

/* MÉTODOS */
/* AL PRESIONAR EL BOTÓN SE AGREGARÁ EL STATE UNA NUEVA TAREA EN EL ARREGLO */
function agregarTarea(nombre, descripcion){ 
    tarea.value = {"nombre": nombreTarea.value, "descripcion": descripcionTarea.value, "estado": "pendiente"}
    store.commit("agregarTarea", tarea.value) /* ENVIA TAREA.VALUE COMO PAYLOAD A LA MUTACIÓN */
}
/* AL PRESIONAR LA BARRA DE EXPANSIÓN */
function changeExpandedState(){  /* CAMBIA EL STATE DE isExpanded, LO QUE MUESTRA O OCULTA EL MENU LATERAL PARA QUE PAREZCA UN TOGGLE */
    store.commit("changeExpandedState") /* LLAMA A LA MUTACIÓN EN EL STORE changeExpandedState */
}

</script> 

<style scoped>
/* ESTILOS GENERALES DEL COMPONENTE */
.fullHeight{
    height: 100vh;
}
.menu{ /* EL MENÚ Y LA BARRA DE EXPANSIÓN SE ENCUENTRAN UNA AL LADO DE LA OTRA */
    display: flex;
}
/* ESTILO DE LOS ITEMS DEL MENU LATERAL */
.menuLateral{
    background-color: aqua;
    padding: 0 2rem;
}
.form-group{ /* COLOCAR LABEL-INPUT EN FORMA VERTICAL */
    display: flex;
    flex-direction: column;
}
/* ESTILO DE LOS ITEMS DEL MENU DE EXPANSIÓN */
.menuExtension{
    background-color: rgb(48, 165, 77);
    padding: 0 1rem;
}
</style>