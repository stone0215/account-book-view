import request from '@/utils/request'

export function checkServerAlive() {
  return request({
    url: '/global/server-alive',
    method: 'get'
  })
}
