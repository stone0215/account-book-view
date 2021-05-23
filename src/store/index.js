import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import errorLog from './modules/errorLog'
import global from './global'
import otherAssets from './modules/otherAssetAndLiability/index'
import permission from './modules/permission'
import setting from './modules/setting/index'
import tagsView from './modules/tagsView'
import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    global,
    otherAssets,
    permission,
    setting,
    tagsView,
    user
  },
  getters
})

export default store
