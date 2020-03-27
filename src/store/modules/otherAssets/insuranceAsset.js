import { getOtherAssetItems } from '@/api/otherAssets'

export default {
  state: {
    insuranceContentList: null,
    insuranceDetailList: null
  },
  mutations: {
    SET_INSURANCE_ASSET_LIST: (state, datas) => {
      state.itemList = datas
    }
  },
  actions: {
    GetInsuranceAssetList({ commit }) {
      return new Promise((resolve, reject) => {
        getOtherAssetItems()
          .then(response => {
            commit('SET_INSURANCE_ASSET_LIST', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
