import { checkFxRate, checkInvoice, checkServerAlive } from '@/api/global'

export default {
  state: {},
  mutations: {},
  actions: {
    CheckServerAlive({ commit }) {
      return new Promise((resolve, reject) => {
        checkServerAlive()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CheckFxRate({ commit }) {
      return checkFxRate()
    },
    CheckInvoice({ commit }) {
      return checkInvoice()
    }
  }
}
