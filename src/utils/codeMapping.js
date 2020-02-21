import store from '@/store'

import { accountType } from '@/assets/commonData/accountData'
import { codeType } from '@/assets/commonData/codeData'
import { feedbackWay } from '@/assets/commonData/creditCardData'
import { fxCode } from '@/assets/commonData/fxData'
import { assetType, otherAssetType, yesNo } from '@/assets/commonData/global'
import { stockExcuteType } from '@/assets/commonData/otherAssets'

let target = null
let code = ''

export function getMappingName(type, inputCode) {
  code = inputCode

  switch (type) {
    case 'account':
      target = store.state.setting.menu.account.accountSelectList
      break
    case 'account_type':
      target = accountType
      break
    case 'asset_type':
      target = otherAssetType
      break
    case 'code_type':
      target = codeType
      break
    case 'excute_type':
      target = stockExcuteType
      break
    case 'feedback_way':
      target = feedbackWay
      break
    case 'fx_code':
      target = fxCode
      break
    case 'initial_type':
      target = assetType
      break
    case 'yes_no':
      target = yesNo
      break

    default:
      return code
  }

  return findName()
}

function findName() {
  return target.find(x => x.key === code).value
}
