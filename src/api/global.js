import request from '@/utils/request'

export function checkServerAlive() {
  return request({
    url: '/global/server-alive',
    method: 'get'
  })
}

export function checkFxRate() {
  return request({
    url: '/global/checkFxRate',
    method: 'post'
  })
}

export function checkInvoice() {
  return request({
    url: '/global/checkInvoice',
    method: 'post'
  })
}
