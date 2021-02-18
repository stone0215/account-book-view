import request from '@/utils/request'

export function getOtherAssetItems() {
  return request({
    url: '/other-asset/items',
    method: 'get'
  })
}

// stock
export function getStockAssetList(asset_id) {
  return request({
    url: `/other-asset/stock/${asset_id}`,
    method: 'get'
  })
}

export function addStockAssetData(data) {
  return request({
    url: '/other-asset/stock',
    method: 'post',
    data: data
  })
}

export function updateStockAssetData(data) {
  return request({
    url: `/other-asset/stock/${data.stock_id}`,
    method: 'put',
    data: data
  })
}

export function deleteStockAssetData(id) {
  return request({
    url: `/other-asset/stock/${id}`,
    method: 'delete'
  })
}

export function getStockDetailList(stock_id) {
  return request({
    url: `/other-asset/stock/detail/${stock_id}`,
    method: 'get'
  })
}

export function addStockDetailData(data) {
  return request({
    url: '/other-asset/stock/detail',
    method: 'post',
    data: data
  })
}

export function updateStockDetailData(data) {
  return request({
    url: `/other-asset/stock/detail/${data.distinct_number}`,
    method: 'put',
    data: data
  })
}

export function deleteStockDetailData(id) {
  return request({
    url: `/other-asset/stock/detail/${id}`,
    method: 'delete'
  })
}

// insurance
export function getInsuranceAssetList(asset_id) {
  return request({
    url: `/other-asset/insurance/${asset_id}`,
    method: 'get'
  })
}

export function addInsuranceAssetData(data) {
  return request({
    url: '/other-asset/insurance',
    method: 'post',
    data: data
  })
}

export function updateInsurenceAssetData(data) {
  return request({
    url: `/other-asset/insurance/${data.insurance_id}`,
    method: 'put',
    data: data
  })
}

export function deleteInsuranceAssetData(id) {
  return request({
    url: `/other-asset/insurance/${id}`,
    method: 'delete'
  })
}

export function getInsuranceDetailList(insurance_id) {
  return request({
    url: `/other-asset/insurance/detail/${insurance_id}`,
    method: 'get'
  })
}

export function addInsuranceDetailData(data) {
  return request({
    url: '/other-asset/insurance/detail',
    method: 'post',
    data: data
  })
}

export function updateInsuranceDetailData(data) {
  return request({
    url: `/other-asset/insurance/detail/${data.distinct_number}`,
    method: 'put',
    data: data
  })
}

export function deleteInsuranceDetailData(id) {
  return request({
    url: `/other-asset/insurance/detail/${id}`,
    method: 'delete'
  })
}
