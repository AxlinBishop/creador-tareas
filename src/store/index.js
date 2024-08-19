import { createStore } from 'vuex'

export default createStore({
  state: {
    proyectos: [], /* ARREGLO EN DONDE SE GUARDARAN LOS PROYECTOS PARA MOSTRAR EN EL MENU LATERAL */
    proyectoActual: "",
    tareas: [], /* SE GUARDARÁ LA INFORMACIÓN DE CADA TAREA COMO OBJETO DENTRO DE ESTE ARREGLO */
    isExpanded: true,  /* PARA SABER SI EL MENU LATERAL ESTARÁ EXTENDIDA O CERRADA */
  },
  getters: {
  },
  mutations: {
    /* CAMBIAR EL ESTADO DE PROYECTO ACTUAL */
    cambiarProyectoActual: function (state, payload){
      state.proyectoActual = payload;
    },
    /* AGREGAR TAREA */
    agregarTarea: function(state, payload){
      state.tareas.push(payload)
    },

    /* CAMBIA EL ESTADO DE isExpanded */
    changeExpandedState: function(state){ 
      if(state.isExpanded){
        state.isExpanded = false
      }else{
        state.isExpanded = true
      }
    },
    /* AGREGAR PROYECTO AL STATE */
    agregarProyecto: function(state, payload){
      state.proyectos.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
