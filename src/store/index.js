import { createStore } from 'vuex'

export default createStore({
  state: {
    tareas: [], /* SE GUARDARÁ LA INFORMACIÓN DE CADA TAREA COMO OBJETO DENTRO DE ESTE ARREGLO */
    isExpanded: true,  /* PARA SABER SI EL MENU LATERAL ESTARÁ EXTENDIDA O CERRADA */
  },
  getters: {
  },
  mutations: {
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
    }

  },
  actions: {
  },
  modules: {
  }
})
