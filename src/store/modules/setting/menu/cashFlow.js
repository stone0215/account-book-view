import {
  addMainCodeData,
  deleteMainCodeData,
  getMainCodeList,
  updateMainCodeData
} from '@/api/setting/menu/code'

export default {
  state: {
    mainDataList: null
  },
  mutations: {
    SET_MAIN_CODE_DATA_LIST: (state, datas) => {
      state.mainDataList = datas
    },
    ADD_MAIN_CODE_DATA_TO_LIST: (state, data) => {
      state.mainDataList.push(data)
    },
    UPDATE_MAIN_CODE_DATA_LIST: (state, data) => {
      state.mainDataList.map(item => {
        if (item.code_id === data.code_id) {
          item = Object.assign(item, data)
        }
      })
    }
  },
  actions: {
    GetMainCodeList({ commit }, conditions) {
      return new Promise((resolve, reject) => {
        getMainCodeList(conditions)
          .then(response => {
            commit('SET_MAIN_CODE_DATA_LIST', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AddMainCodeData({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addMainCodeData(data)
          .then(response => {
            if (state.mainDataList) {
              commit('ADD_MAIN_CODE_DATA_TO_LIST', response.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateMainCodeData({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateMainCodeData(data)
          .then(() => {
            commit('UPDATE_MAIN_CODE_DATA_LIST', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DeleteMainCodeData({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        deleteMainCodeData(id)
          .then(() => {
            commit(
              'SET_MAIN_CODE_DATA_LIST',
              state.mainDataList.filter(x => {
                return x.code_id !== id
              })
            )
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
