import {
    addLiabilityData,
    addLiabilityDetailData,
    deleteLiabilityData,
    deleteLiabilityDetailData,
    getLiabilityList,
    getLiabilityDetailList,
    updateLiabilityData,
    updateLiabilityDetailData
} from '@/api/otherAssets/liability'

export default {
    state: {
        liabilityContentList: null,
        liabilityDetailList: null
    },
    mutations: {
        SET_LIABILITY_LIST: (state, datas) => {
            state.liabilityContentList = datas
        },
        ADD_LIABILITY_TO_LIST: (state, data) => {
            state.liabilityContentList.push(data)
        },
        UPDATE_LIABILITY_LIST: (state, data) => {
            state.liabilityContentList.map(item => {
                if (item.liability_id === data.liability_id) {
                    item = Object.assign(item, data)
                }
            })
        },
        SET_ESTATE_DETAIL_LIST: (state, datas) => {
            state.liabilityDetailList = datas
        },
        ADD_ESTATE_DETAIL_TO_LIST: (state, data) => {
            state.liabilityDetailList.push(data)
        },
        UPDATE_ESTATE_DETAIL_LIST: (state, data) => {
            state.liabilityDetailList.map(item => {
                if (item.distinct_number === data.distinct_number) {
                    item = Object.assign(item, data)
                }
            })
        }
    },
    actions: {
        GetLiabilityList({ commit }) {
            return new Promise((resolve, reject) => {
                getLiabilityList()
                    .then(response => {
                        commit('SET_LIABILITY_LIST', response.data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        AddLiabilityData({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                addLiabilityData(data)
                    .then(response => {
                        if (state.liabilityContentList) {
                            commit('ADD_LIABILITY_TO_LIST', response.data)
                        }
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UpdateLiabilityData({ commit }, data) {
            return new Promise((resolve, reject) => {
                updateLiabilityData(data)
                    .then(() => {
                        commit('UPDATE_LIABILITY_LIST', data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        DeleteLiabilityData({ commit, state }, id) {
            return new Promise((resolve, reject) => {
                deleteLiabilityData(id)
                    .then(() => {
                        commit(
                            'SET_LIABILITY_LIST',
                            state.liabilityContentList.filter(x => {
                                return x.liability_id !== id
                            })
                        )
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetLiabilityDetailList({ commit }, liability_id) {
            return new Promise((resolve, reject) => {
                getLiabilityDetailList(liability_id)
                    .then(response => {
                        commit('SET_ESTATE_DETAIL_LIST', response.data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        AddLiabilityDetailData({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                addLiabilityDetailData(data)
                    .then(response => {
                        if (state.liabilityDetailList) {
                            commit('ADD_ESTATE_DETAIL_TO_LIST', response.data)
                        }
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UpdateLiabilityDetailData({ commit }, data) {
            return new Promise((resolve, reject) => {
                updateLiabilityDetailData(data)
                    .then(() => {
                        commit('UPDATE_ESTATE_DETAIL_LIST', data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        DeleteLiabilityDetailData({ commit, state }, id) {
            return new Promise((resolve, reject) => {
                deleteLiabilityDetailData(id)
                    .then(() => {
                        commit(
                            'SET_ESTATE_DETAIL_LIST',
                            state.liabilityDetailList.filter(x => {
                                return x.distinct_number !== id
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
