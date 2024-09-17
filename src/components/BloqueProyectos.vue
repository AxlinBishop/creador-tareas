<template>
    <div class="bloque_marco" :style="isActive(proyecto)">
        <div class="bloque">
            <span class="bloque_nombre">{{proyecto}}</span>
        </div>
        <span class="btn_eliminar" @click="eliminarProyecto(index)">❌</span>
    </div>
</template>

<style scoped>
.bloque_marco{
    display: flex;
    justify-content: space-between; /* PARA QUE LA X Y EL NOMBRE DE LA TAREA ESTÉN DE UN EXTREMO AL OTRO */
    overflow: hidden; /* FUERA DEL HOVER NO SE MOSTRARÁ EL OVERFLOW */
    min-height: 3rem;
    border: solid 1px;

    /* ESTILO DE LAS CARD DE PROYECTOS */
    background-color: #3567D2;
        &:hover{
        background-color: #D7E3FC;
    }
}
.bloque{
    width: 85%;
    padding: 0.5rem;
    overflow: hidden;
    &:hover{
        overflow-x: auto; /* AL HACER HOVER SE VERÁ EL SCROLL */
    }
}
.bloque span{
    font-size: 1.5rem;
    margin: auto;
    font-weight: bold;
    color: black;
}
.btn_eliminar{
    margin: auto 0.2rem;
    font-size: 1.2rem;
    color: aliceblue;
    font-weight: 500;
    &:hover{
        background-color: rgba(0, 0, 100, 0.2);
        cursor: pointer; /* PARA QUE EL USUARIO SEPA QUE ES CLICKEABLE */
    }
}
.bloque_nombre{
    margin: 0;
}
/*scrollbar CUANDO SE LE HAGA HOVER AL BLOQUE*/ 
.bloque:hover::-webkit-scrollbar { /* ANCHO DEL SCROLLBAR */
    height: 8px;
}
.bloque:hover::-webkit-scrollbar-track {/* COLOR DE FONDE DEL SCROLLBAR */
    background: #a7b9f5;
}
.bloque:hover::-webkit-scrollbar-thumb { /* COLOR Y FORMA DEL THUMB */
    background: #9dabd8;     /* COLOR DEL THUMB */
    border-radius: 6px;     /* BORDES REDONDEADOS DEL THUMB */
}
.bloque::-webkit-scrollbar-thumb:hover { /* COLOR DEL THUMB CUANDO EL CURSOR LE HACE HOVER */
    background: #98a3c9;
}

</style>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
/* PROPS */
let props = defineProps({ /* PROPS RECIBIDOS DESDE MENUTAREAS */
    proyecto: String,
    index: Number,
})

/* VARIABLES */
let esProyectoActual = false
/* METODOS */
function eliminarProyecto(index){ /* TOMA EL INDEX DEL PROYECTO Y LLAMA LA MUTATION DE ELIMINARPROYECTO CON EL INDICE DEPAYLOAD */
    store.commit("eliminarProyecto", index)
}

const isActive = (proyecto) => {
    if (store.state.proyectoActual === props.proyecto){
        return { backgroundColor: '#4D94FF' }
    }
}
</script>