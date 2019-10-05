import request from '@/utils/request'

export function getMainCodeList(conditions) {
  return request({
    url: '/code/query',
    method: 'get',
    params: conditions
  })
}

export function addMainCodeData(data) {
  return request({
    url: '/code',
    method: 'post',
    data: data
  })
}

export function updateMainCodeData(data) {
  return request({
    url: `/code/${data.code_id}`,
    method: 'put',
    data: data
  })
}

export function deleteMainCodeData(id) {
  return request({
    url: `/code/${id}`,
    method: 'delete'
  })
}
