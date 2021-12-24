import Mock from 'mockjs'

Mock.mock('/mock/global/server-alive', 'get', () => {
  return {
    status: 1,
    data: true,
    msg: 'success'
  }
})

Mock.mock('/mock/global/checkFxRate', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

import './common'
import './dashboard'
import './liability'
import './monthlyReport'
import './otherAssets'
import './setting/index'
import './setting/menu'
import './yearReport'
