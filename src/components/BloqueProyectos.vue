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
    overflow-x: auto;
    padding: 0.5rem;
}
.bloque_nombre{
    margin: 0;
}
/*scrollbar */
.bloque_marco::-webkit-scrollbar { /* Ancho del scrollbar */
    height: 8px;
}
.bloque_marco::-webkit-scrollbar-track {/* Color de fondo del scrollbar */
    background: #a7b9f5;
}
.bloque_marco::-webkit-scrollbar-thumb { /* Color y forma del "thumb" */
    background: #9dabd8;     /* Color del thumb */
    border-radius: 6px;     /* Bordes redondeados del thumb */
}
.bloque_marco::-webkit-scrollbar-thumb:hover { /* Color del thumb cuando el cursor pasa sobre él */
    background: #98a3c9;
}

</style>

<script setup>
import { defineProps } from 'vue';

let props = defineProps({
    proyecto: String,
})
</script>