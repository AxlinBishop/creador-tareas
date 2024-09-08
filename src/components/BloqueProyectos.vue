<template>
    <div class="bloque_marco">
        <div class="bloque">
            <h3 class="bloque_nombre">{{proyecto}}</h3>
        </div>
    </div>
</template>

<style scoped>
.bloque_marco{
    min-height: 2rem;
    border: solid 1px;
    padding: 0.5rem;
    overflow: hidden; /* FUERA DEL HOVER NO SE MOSTRARÁ EL OVERFLOW */
    /* ESTILO DE LAS CARD DE PROYECTOS */
    background-color: #3567D2;
        &:hover{
        background-color: #D7E3FC;
        overflow-x: auto; /* AL HACER HOVER SE VERÁ EL SCROLL */
}
}
.bloque_nombre{
    margin: 0;
}
/*scrollbar CUANDO SE LE HAGA HOVER AL BLOQUE*/ 
.bloque_marco:hover::-webkit-scrollbar { /* Ancho del scrollbar */
    height: 8px;
}
.bloque_marco:hover::-webkit-scrollbar-track {/* Color de fondo del scrollbar */
    background: #a7b9f5;
}
.bloque_marco:hover::-webkit-scrollbar-thumb { /* Color y forma del "thumb" */
    background: #9dabd8;     /* Color del thumb */
    border-radius: 6px;     /* Bordes redondeados del thumb */
}
.bloque_marco::-webkit-scrollbar-thumb:hover { /* Color del thumb cuando el cursor pasa sobre él */
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
})

/* VARIABLES */
let esProyectoActual = false
/* METODOS */

</script>