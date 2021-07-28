import request from '@/utils/request'

export function getJournalListByVestingMonth(vestingMonth) {
  return request({
    url: `/journal/${vestingMonth}`,
    method: 'get'
  })
}

export function deleteJournalData(id) {
  return request({
    url: `/journal/${id}`,
    method: 'delete'
  })
}

export function addJournalData(data) {
  return request({
    url: '/journal',
    method: 'post',
    data: data
  })
}

export function updateJournalData(data) {
  return request({
    url: `/journal/${data.distinct_number}`,
    method: 'put',
    data: data
  })
}

export function setMonthlySummary(vestingMonth) {
  return request({
    url: `/balance/${vestingMonth}`,
    method: 'put'
  })
}
