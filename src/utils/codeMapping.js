import { accountType } from '@/assets/commonData/accountData'
import { feedbackWay } from '@/assets/commonData/creditCardData'
import { fxCode } from '@/assets/commonData/fxData'
import { yesNo } from '@/assets/commonData/global'

let target = null

export function getMappingName(type, code) {
  switch (type) {
    case 'yes_no':
      target = yesNo
      break
    case 'fx_code':
      target = fxCode
      break
    case 'feedback_way':
      target = feedbackWay
      break
    case 'account_type':
      target = accountType
      break
    default:
      return false
  }

  return findName(code)
}

function findName(code) {
  return target.find(x => x.key === code).value
}
