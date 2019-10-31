import {
  addInitialData,
  deleteInitialData,
  getInitialList,
  updateInitialData
} from '@/api/setting/initial'

import { getSelectionGroups } from '@/api/util'

export default {
  state: {
    dataList: null,
    selectionGroup: []
  },
  mutations: {
    SET_SELECTION_GROUP: (state, datas) => {
      state.selectionGroup = datas
    },
    SET_INITIAL_DATA_LIST: (state, datas) => {
      state.dataList = datas
    },
    ADD_INITIAL_DATA_TO_LIST: (state, data) => {
      state.dataList.push(data)
    },
    UPDATE_INITIAL_DATA_LIST: (state, data) => {
      state.dataList.map(item => {
        if (
          item.code_id === data.code_id &&
          item.code_type === data.code_type
        ) {
          item = Object.assign(item, data)
        }
      })
    }
  },
  actions: {
    GetSelectionGroup({ commit }) {
      return new Promise((resolve, reject) => {
        getSelectionGroups()
          .then(response => {
            commit('SET_SELECTION_GROUP', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetInitialList({ commit }, conditions) {
      return new Promise((resolve, reject) => {
        getInitialList(conditions)
          .then(response => {
            commit('SET_INITIAL_DATA_LIST', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DeleteInitialData({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        deleteInitialData(data)
          .then(() => {
            commit(
              'SET_INITIAL_DATA_LIST',
              state.dataList.filter(x => {
                return !(
                  x.code_id === data.code_id &&
                  x.initial_type === data.initial_type
                )
              })
            )
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AddInitialData({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addInitialData(data)
          .then(response => {
            if (state.dataList) {
              commit('ADD_INITIAL_DATA_TO_LIST', response.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateInitialData({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateInitialData(data)
          .then(() => {
            commit('UPDATE_INITIAL_DATA_LIST', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
