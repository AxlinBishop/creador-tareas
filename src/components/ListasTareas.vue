<template>
    <div class="flex listas"> <!-- SE MUESTREN AMBOS COMPONENTES DE LISTAS -->
        <ListaTareasPendientes/>
        <ListaTareasCompletadas/>
    </div>
</template>
<script setup>
/* IMPORTACIONES */
import ListaTareasCompletadas from './ListaTareasCompletadas.vue';
import ListaTareasPendientes from './ListaTareasPendientes.vue';
</script>

<style scoped>
.listas{
    width: 100%;
    height: 80vh;
    background-color: #A9C1F4;
    padding: 1rem;
    justify-content: left;
}
</style>