<!-- ESTE COMPONENTE ES UN ASIDE EN EL CUAL SE PUEDEN AGREGAR TAREAS MEDIANTE 
    LOS CAMPOS DE NOMBRE Y DESCRIPCIÓN -->
<template>
    <section class="menu fullHeight">
        <!-- UNA BARRA VERTICAL CON EL ICONO DE UNA FLECHA QUE AL PRESIONAR HARÁ QUE SE EXTIENDA LA BARRA -->
        <div class="menuLateral fullHeight" v-if="store.state.isExpanded">
            <div class="menuTarea agregarTarea-form">
                <div class="form-group">
                    <label for="nombreTarea">Nombre de la tarea</label>
                    <input @keydown.enter="agregarTarea" type="text" name="nombreTarea" id="nombreTarea" v-model="nombreTarea" required>
                </div>
                <div class="form-group">
                    <label for="descripcionTarea">Descripción de la Tarea</label>
                    <textarea @keydown.enter="agregarTarea" name="descripciónTarea" id="descripcionTarea" v-model="descripcionTarea"></textarea>
                </div>
                <button @click="agregarTarea">Agregar Tarea</button>
            </div>
            <hr>
            <section class="menu_proyectos">
                <div class="proyectos_agregar">
                    <h2>Proyectos</h2>
                    <div class="form-group">
                        <input @keydown.enter="agregarProyecto" type="text" name="nuevoProyecto" id="nuevoProyecto" v-model="nombreProyecto">
                        <button @click="agregarProyecto">Nuevo Proyecto</button>
                    </div>
                </div>
                <div class="proyectos">
                    <div  v-for="(proyecto, index) in store.state.proyectos" :key="index">
                        <div class="proyecto_card" @click="cambiarProyectoActual(index)">
                            <BloqueProyectos :proyecto :index />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="menuExtension fullHeight" @click="changeExpandedState">
            <!-- CON LOS V-IF CAMBIO EL SENTID DE LA FLECHA DEPENDIENDO DEL STATE DE isExpanded -->
            <p v-if="store.state.isExpanded"> ◀ </p>
            <p v-if="!store.state.isExpanded"> ▶ </p>
        </div>
    </section>
</template>

<script setup>
/* IMPORTACIONES */
import BloqueProyectos from './BloqueProyectos.vue';
import { useStore } from 'vuex'; /* PARA PODER UTILIZAR LA STORE DE VUEX */
import { ref } from "vue"; /* PARA QUE EL VALOR DE LAS VARIABLES SEAN REACTIVAS */
import { onMounted } from 'vue'; /* PARA UTILIZAR EL HOOK ONMOUNTED */

/* VARIABLES */
const store = useStore(); /* PODEMOS UTILIZAR LA STORE CON ESTA CONSTANTE */
const tarea = ref({}); /* SE GUARDARA EL OBJETO CON LAS PROPIEDADES DE NOMBRE Y DESCRIPCIÓN PARA PODER ENVIARLOS AL ESTADO */
const nombreTarea = ref("") /* ACÁ SE GUARDA EL NOMBRE QUE SE LE ASIGNARÁ A LA TAREA */
const descripcionTarea = ref(""); /* ACÁ SE GUARDA LA DESCRIPCIÓN DE LO QUE SE DEBE HACER */
const nombreProyecto = ref(""); /* ACÁ SE GUARDA EL NOMBRE DEL PROYECTO INGRESADO EN EL INPUT NOMBREPROYECTO */
const nuevoProyectoActual = ref(""); /* ACÁ SE GUARDA EL NOMBRE DEL PROYECTO SELECCIONADO PARA TRABAJAR */

/* MÉTODOS */
/* AL PRESIONAR EL BOTÓN SE CAMBIARÁ EL PROYECTO ACTUAL */
function cambiarProyectoActual(index) {
    nuevoProyectoActual.value = store.state.proyectos[index]; /* CAMBIA EL VALOR DE PROYECTOACTUAL POR EL DEL PROYECTO SELECCIONADO */
    store.commit("cambiarProyectoActual", nuevoProyectoActual.value); /* CAMBIA EL VALOR EN EL STATE */
}

/* AL PRESIONAR EL BOTÓN SE AGREGARÁ EL STATE UNA NUEVA TAREA EN EL ARREGLO */
function agregarTarea(nombre, descripcion) {
    tarea.value = { "proyecto": nuevoProyectoActual.value, "nombre": nombreTarea.value, "descripcion": descripcionTarea.value, "estado": "pendiente" }
    store.commit("agregarTarea", tarea.value) /* ENVIA TAREA.VALUE COMO PAYLOAD A LA MUTACIÓN */
}
/* AL PRESIONAR LA BARRA DE EXPANSIÓN */
function changeExpandedState() {  /* CAMBIA EL STATE DE isExpanded, LO QUE MUESTRA O OCULTA EL MENU LATERAL PARA QUE PAREZCA UN TOGGLE */
    store.commit("changeExpandedState") /* LLAMA A LA MUTACIÓN EN EL STORE changeExpandedState */
}
/* AGREGAR UN NUEVO PROYECTO */
function agregarProyecto() {
    if(!nombreProyecto.value.trim()|(proyectoExiste())) { /* COMPRUEBA SI EL NOMBRE INGRESADO EN EL INPUT ESTÁ VACÍO O YA EXISTE */
        if(!nombreProyecto.value.trim()){ /*  SI EL NOMBRE ESTÁ VACÍO */
            alert("Debe ingresar un nombre al Proyecto") /* ALERTA DE QUE DEBE INGRESAR UN NOMBRE */
        }else{ /* SI EL PROYECTO EXISTE */
            alert("El proyecto ya existe") /* ALERTA DE QUE EL PROYECTO YA EXISTE */
        }
    }else{ /* EN CASO DE QUE NO EXISTA EL PROYECTO Y NO SE ENCUENTRE EL CAMPO VACÍO */
        store.commit("agregarProyecto", nombreProyecto.value) /* ENVIA EL NOMBRE INGRESADO COMO PAYLOAD */
        nuevoProyectoActual.value = nombreProyecto.value; /* CAMBIA EL VALOR DEL PROYECTO ACTUAL AL PROYECTO CREADO */
        store.commit("cambiarProyectoActual", nuevoProyectoActual.value); /* CAMBIA EL VALOR EN EL STATE */
        nombreProyecto.value = ""; /* SE REINICIA EL VALOR DEL INPUT */
    }
}

function proyectoExiste(){ /* REVISA SI EL PROYECTO EXISTE */
    let existe = false; /* EL ESTADO ORIGINAL ES QUE NO */
    store.state.proyectos.forEach(proyecto => { /* RECORRE TODA EL ARRAY DE PROYECTOS EN EL STATE */
        if (proyecto == nombreProyecto.value) { /* EN CASO DE QUE EL NOMBRE QUE SE ESTA INGRESANDO EN EL INPUT COINCUDA CON EL DE UN PROYECTO YA CREADO */
            existe = true; /* EL PROYECTO YA EXISTE */
        }
    });
    return existe;
}
/* AL MONTAR LA APLICACIÓN SE REVISA SI HAY ALGÚN ELEMENTO EN PROYECTOS, SI NO HAY, SE CREA UNO */
onMounted(() => {
    if (!store.state.proyectos[0]) { /* SI NO EXISTE UN PROYECTO EN EL STATE */
        store.commit("agregarProyecto", "Proyecto General") /* CREA EL PROYECTO GENERAL EN EL STATE */
        nuevoProyectoActual.value = "Proyecto General"; /* CAMBIA EL VALOR DEL PROYECTO ACTUAL AL PROYECTO CREADO */
        store.commit("cambiarProyectoActual", nuevoProyectoActual.value); /* CAMBIA EL VALOR EN EL STATE */
    }
})

</script>

<style scoped>
/* ESTILOS GENERALES DEL COMPONENTE */
.fullHeight {
    height: 100vh;
}

.menu {
    /* EL MENÚ Y LA BARRA DE EXPANSIÓN SE ENCUENTRAN UNA AL LADO DE LA OTRA */
    display: flex;
}

/* ESTILO DE LOS ITEMS DEL MENU LATERAL */
.menuLateral{
    background-color: #99C2FF;
    width: 30vh; /* TAMAÑO DEL MENU LATERAL */
}
.menuTarea {
    padding: 1.5rem 2rem;
}
.menu_proyectos{ /* ACOMODAMOS LA MEDIDA DE LA SECCIÓN DE ACUERDO AL ESTILO */
    height: 65.6%; /* LA SECCIÓN DONDE SE MUESTRAN LOS PROYECTOS UTILIZA UN 65.6% DEL ALTO DE LA PÁGINA */
}
.menu_proyectos h2{ /* SEPARA DE FORMA VERTICAL EL TITULO DE PROYECTOS */
    margin: 1rem 0;
}
.proyectos{
    height: 100%; /* UTILIZA EL 100% DEL ALTO DE SU CONTENEDOR */
    overflow-y: auto; /* EN CASO DE QUE HAYAN MÁS PROYECTOS DE LOS QUE CABEN EN EL DIV, APARECE UNA SCROLLBAR */
}
.proyectos_agregar{ /* SE CENTRA EL DIV CON UN PADDING */
    padding: 1rem;
}
.form-group {
    /* COLOCAR LABEL-INPUT EN FORMA VERTICAL */
    display: flex;
    flex-direction: column;
}

/* ESTILO DE LOS ITEMS DEL MENU DE EXPANSIÓN */
.menuExtension {
    background-color:#0066CC;
    padding: 0 0.5rem;
    color: aliceblue; /* COLOR DE < Y > DEL TOGGLE DEL MENU */
    font-size: large;
    font-weight: 100;
    &:hover{
        background-color: #004C99;
        cursor: pointer; /* AL HACER HOVER SOBRE EL DIV DE TOGGLE EL CURSOR CAMBIA EL PUNTERO AL DEDITO */
    }
}

/*SCROLLBAR*/
.proyectos::-webkit-scrollbar { /* Ancho del scrollbar */
    width: 10px;
}
.proyectos::-webkit-scrollbar-track {/* Color de fondo del scrollbar */
    background: #3567D2;
}
.proyectos::-webkit-scrollbar-thumb { /* Color y forma del "thumb" */
    background: #0B3898;     /* Color del thumb */
    border-radius: 6px;     /* Bordes redondeados del thumb */
}
.proyectos::-webkit-scrollbar-thumb:hover { /* Color del thumb cuando el cursor pasa sobre él */
    background: #082B77;
}

</style>