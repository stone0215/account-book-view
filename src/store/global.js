import { checkData, checkServerAlive } from '@/api/global'

export default {
  state: {
    isServerAlive: false
  },
  mutations: {
    SET_IS_SERVER_ALIVE: (state, status) => {
      state.isServerAlive = status
    }
  },
  actions: {
    CheckServerAlive({ commit }) {
      return new Promise((resolve, reject) => {
        checkServerAlive()
          .then(response => {
            commit('SET_IS_SERVER_ALIVE', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CheckData({ commit }, conditions) {
      return checkData(conditions)
    }
  }
}
