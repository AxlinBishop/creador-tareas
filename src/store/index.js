import { createStore } from 'vuex'

export default createStore({
  state: {
    proyectos: JSON.parse(localStorage.getItem('proyectos')) || [], /* ARREGLO EN DONDE SE GUARDARAN LOS PROYECTOS PARA MOSTRAR EN EL MENU LATERAL */
    proyectoActual: localStorage.getItem('proyectoActual') || "",
    tareas: JSON.parse(localStorage.getItem('tareas')) || [], /* SE GUARDARÁ LA INFORMACIÓN DE CADA TAREA COMO OBJETO DENTRO DE ESTE ARREGLO */
    isExpanded: true,  /* PARA SABER SI EL MENU LATERAL ESTARÁ EXTENDIDA O CERRADA */
  },
  getters: {
  },
  mutations: {
    /* CAMBIAR EL ESTADO DE PROYECTO ACTUAL */
    cambiarProyectoActual: function (state, payload){ /* RECIBE COMO PAYLOAD EL NOMBRE DEL PROYECTO QUE SE SELECCIONÓ */
      state.proyectoActual = payload;
      localStorage.setItem('proyectoActual', payload); /* GUARDAR EN EL LOCAL STORAGE */
    },
    /* AGREGAR TAREA */
    agregarTarea: function(state, payload){
      state.tareas.push(payload)
      localStorage.setItem('tareas', JSON.stringify(state.tareas)); /* GUARDAR EN EL LOCAL STORAGE */
    },
    /* ELIMINAR TAREA */
    eliminarTarea: function(state, payload){ /* RECIBE EL INDEX COMO PAYLOAD */
      state.tareas.splice(payload, 1); /* ELIMINA EL ELEMENTO CON INDICE PAYLOAD DEL ARRAY */
      localStorage.setItem('tareas', JSON.stringify(state.tareas)); /* GUARDAR EN EL LOCAL STORAGE */
    },
    /* CAMBIAR ESTADO DE LA TAREA */
    cambiarEstado: function(state, payload){
      state.tareas[payload.indice].estado = payload.estado /* CAMBIA EL ESTADO DEL ELEMENTO EN EL INDICE */
      localStorage.setItem('tareas', JSON.stringify(state.tareas)); /* GUARDAR EN EL LOCAL STORAGE */
    },
    /* CAMBIA EL STATE DE isExpanded */
    changeExpandedState: function(state){ 
      if(state.isExpanded){
        state.isExpanded = false
      }else{
        state.isExpanded = true
      }
    },
    /* AGREGAR PROYECTO AL STATE */
    agregarProyecto: function(state, payload){ /* RECIBE EL NOMBRE DEL PROYECTO COMO PUSH */
      state.proyectos.push(payload)
      localStorage.setItem('proyectos', JSON.stringify(state.proyectos)); /* GUARDAR EN EL STORAGE */
    },
    eliminarProyecto: function(state, payload){ /* RECIBE EL INDEX DEL PROYECTO A ELIMINAR */
      state.proyectos.splice(payload, 1) 
      localStorage.setItem('proyectos', JSON.stringify(state.proyectos)); /* GUARDAR EN EL STORAGE */
    }
  },
  actions: {
  },
  modules: {
  }
})
