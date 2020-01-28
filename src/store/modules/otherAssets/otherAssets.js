import {
  getOtherAssetItems
} from '@/api/otherAssets'

export default {
  state: {
    itemList: []
  },
  mutations: {
    SET_OTHER_ASSET_ITEM_LIST: (state, datas) => {
      state.itemList = datas
    }
  },
  actions: {
    GetOtherAssetItems({ commit }) {
      return new Promise((resolve, reject) => {
        getOtherAssetItems()
          .then(response => {
            commit('SET_OTHER_ASSET_ITEM_LIST', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
