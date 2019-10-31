import request from '@/utils/request'

export function getSelectionGroups() {
  return request({
    url: '/util/wallet-selection-group',
    method: 'get'
  })
}
