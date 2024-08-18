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
            <section class="proyectos">
                <div class="form-group">
                    <input type="text" name="nuevoProyecto" id="nuevoProyecto" v-model="nombreProyecto">
                    <button @click="agregarProyecto">Nuevo Proyecto</button>
                </div>
                <div v-for="(proyecto, index) in store.state.proyectos" :key="index">
                    <div class="proyecto_card" @click="cambiarProyectoActual(index)">
                        <p>{{ proyecto }}</p>
                    </div>
                </div>
            </section>
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
import { onMounted } from 'vue'; /* PARA UTILIZAR EL HOOK ONMOUNTED */

/* VARIABLES */
const store = useStore(); /* PODEMOS UTILIZAR LA STORE CON ESTA CONSTANTE */
const tarea = ref({}); /* SE GUARDARA EL OBJETO CON LAS PROPIEDADES DE NOMBRE Y DESCRIPCIÓN PARA PODER ENVIARLOS AL ESTADO */
const nombreTarea = ref("") /* ACÁ SE GUARDA EL NOMBRE QUE SE LE ASIGNARÁ A LA TAREA */
const descripcionTarea = ref(""); /* ACÁ SE GUARDA LA DESCRIPCIÓN DE LO QUE SE DEBE HACER */
const nombreProyecto = ref(""); /* ACÁ SE GUARDA EL NOMBRE DEL PROYECTO INGRESADO EN EL INPUT NOMBREPROYECTO */
const proyectoActual = ref(""); /* ACÁ SE GUARDA EL NOMBRE DEL PROYECTO SELECCIONADO PARA TRABAJAR */

/* MÉTODOS */
/* AL PRESIONAR EL BOTÓN SE CAMBIARÁ EL PROYECTO ACTUAL */
function cambiarProyectoActual(index){ 
    proyectoActual.value = store.state.proyectos[index]; /* CAMBIA EL VALOR DE PROYECTOACTUAL POR EL DEL PROYECTO SELECCIONADO */
}

/* AL PRESIONAR EL BOTÓN SE AGREGARÁ EL STATE UNA NUEVA TAREA EN EL ARREGLO */
function agregarTarea(nombre, descripcion){ 
    tarea.value = {"nombre": nombreTarea.value, "descripcion": descripcionTarea.value, "estado": "pendiente"}
    store.commit("agregarTarea", tarea.value) /* ENVIA TAREA.VALUE COMO PAYLOAD A LA MUTACIÓN */
}
/* AL PRESIONAR LA BARRA DE EXPANSIÓN */
function changeExpandedState(){  /* CAMBIA EL STATE DE isExpanded, LO QUE MUESTRA O OCULTA EL MENU LATERAL PARA QUE PAREZCA UN TOGGLE */
    store.commit("changeExpandedState") /* LLAMA A LA MUTACIÓN EN EL STORE changeExpandedState */
}
/* AGREGAR UN NUEVO PROYECTO */
function agregarProyecto(){
    store.commit("agregarProyecto", nombreProyecto.value) /* ENVIA EL NOMBRE INGRESADO COMO PAYLOAD */
    proyectoActual.value = nombreProyecto.value; /* CAMBIA EL VALOR DEL PROYECTO ACTUAL AL PROYECTO CREADO */
    nombreProyecto.value = ""; /* SE REINICIA EL VALOR DEL INPUT */
}

/* AL MONTAR LA APLICACIÓN SE REVISA SI HAY ALGÚN ELEMENTO EN PROYECTOS, SI NO HAY, SE CREA UNO */
onMounted(() => {
    if(!store.state.proyectos[0]){ /* SI NO EXISTE UN PROYECTO EN EL STATE */
        store.commit("agregarProyecto", "Proyecto General") /* CREA EL PROYECTO GENERAL EN EL STATE */
    }
    proyectoActual.value = "Proyecto General"; /* CAMBIA EL VALOR DEL PROYECTO ACTUAL AL PROYECTO CREADO */
})

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
.proyecto_card{ /* ESTILO DE LAS CARD DE PROYECTOS */
    background-color: rgba(41, 45, 150, 0.4);
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