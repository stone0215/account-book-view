import request from '@/utils/request'

export function checkServerAlive() {
    return request({
        url: '/util/server-alive',
        method: 'get'
    })
}
