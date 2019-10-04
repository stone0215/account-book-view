import { feedbackWay } from '@/assets/commonData/creditCardData'
import { fxCode } from '@/assets/commonData/fxData'

let target = null

export function getMappingName(type, code) {
  switch (type) {
    case 'fx_code':
      target = fxCode
      break
    case 'feedback_way':
      target = feedbackWay
      break
    default:
      return false
  }

  return findName(code)
}

function findName(code) {
  return target.find(x => x.key === code).value
}

export function returnYesNo(code) {
  return code === 'Y' ? '是' : '否'
}
