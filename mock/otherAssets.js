import Mock from 'mockjs'

// stock
// getStockAssetList
Mock.mock(/\/mock\/other-asset\/stock\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        ROI: -16933.0,
        asset_id: 1,
        buy_date: 'Mon, 09 Aug 2021 16:00:00 GMT',
        buy_price: -1.0,
        dividend_yield: null,
        expected_spend: 1234,
        gain_lose: 50800,
        hold_amount: null,
        now_price: 10,
        sold_amount: null,
        sold_date: '',
        sold_price: null,
        stock_code: '2330',
        stock_id: 1,
        stock_name: '\u53f0G'
      },
      {
        ROI: -200.0,
        asset_id: 1,
        buy_date: 'Mon, 02 Aug 2021 16:00:00 GMT',
        buy_price: -1.0,
        dividend_yield: 0.0,
        expected_spend: 1234,
        gain_lose: 200,
        hold_amount: 200,
        now_price: 10,
        sold_amount: -100,
        sold_date: 'Tue, 17 Aug 2021 16:00:00 GMT',
        sold_price: -1.0,
        stock_code: '2317',
        stock_id: 2,
        stock_name: '\u6d77\u516c\u516c'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/other-asset/stock', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateStockAssetData
Mock.mock(/\/mock\/other-asset\/stock\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteStockAssetData
Mock.mock(/\/mock\/other-asset\/stock\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getStockDetailList
Mock.mock(/\/mock\/other-asset\/stock\/detail\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/other-asset/stock/detail', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateStockDetailData
Mock.mock(/\/mock\/other-asset\/stock\/detail\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteStockDetailData
Mock.mock(/\/mock\/other-asset\/stock\/detail\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// estate
// getEstateAssetList
Mock.mock(/\/mock\/other-asset\/estate\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        asset_id: 4,
        cost: null,
        estate_address: '台灣',
        estate_id: 1,
        estate_name: 'my home',
        estate_status: 'idle',
        estate_type: 'house',
        loan_id: 1,
        loan_name: '房貸',
        memo: null,
        obtain_date: 'Mon, 02 Aug 2021 16:00:00 GMT',
        profit: null
      },
      {
        asset_id: 4,
        cost: null,
        estate_address: 'test',
        estate_id: 2,
        estate_name: 'test',
        estate_status: 'sold',
        estate_type: 'condo',
        loan_id: 2,
        loan_name: '\u7b2c\u4e8c\u9593',
        memo: null,
        obtain_date: 'Sun, 01 Aug 2021 16:00:00 GMT',
        profit: null
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/other-asset/estate', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateEstateAssetData
Mock.mock(/\/mock\/other-asset\/estate\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteEstateAssetData
Mock.mock(/\/mock\/other-asset\/estate\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getEstateDetailList
Mock.mock(/\/mock\/other-asset\/estate\/detail\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/other-asset/estate/detail', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateEstateDetailData
Mock.mock(/\/mock\/other-asset\/estate\/detail\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteEstateDetailData
Mock.mock(/\/mock\/other-asset\/estate\/detail\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// insurance
// getInsuranceAssetList
Mock.mock(/\/mock\/other-asset\/insurance\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        ROI: null,
        actual_spend: -900,
        asset_id: 3,
        expected_end_date: 'Mon, 09 Aug 2021 16:00:00 GMT',
        expected_spend: 12345,
        gain_lose: null,
        has_closed: 'N',
        in_account_id: 33,
        in_account_name: '台幣帳戶',
        insurance_id: 1,
        insurance_name: '台幣儲蓄險',
        out_account_id: 33,
        out_account_name: '台幣帳戶',
        pay_day: '11',
        pay_type: 'month',
        start_date: 'Mon, 02 Aug 2021 16:00:00 GMT'
      },
      {
        ROI: null,
        actual_spend: null,
        asset_id: 3,
        expected_end_date: 'Mon, 30 Aug 2021 16:00:00 GMT',
        expected_spend: 12344,
        gain_lose: null,
        has_closed: 'Y',
        in_account_id: 34,
        in_account_name: '外幣帳戶',
        insurance_id: 2,
        insurance_name: '美元儲蓄險',
        out_account_id: 34,
        out_account_name: '外幣帳戶',
        pay_day: '11',
        pay_type: 'month',
        start_date: 'Mon, 02 Aug 2021 16:00:00 GMT'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/other-asset/insurance', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateInsuranceAssetData
Mock.mock(/\/mock\/other-asset\/insurance\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteInsuranceAssetData
Mock.mock(/\/mock\/other-asset\/insurance\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getInsuranceDetailList
Mock.mock(/\/mock\/other-asset\/insurance\/detail\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/other-asset/insurance/detail', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateInsuranceDetailData
Mock.mock(/\/mock\/other-asset\/insurance\/detail\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteInsuranceDetailData
Mock.mock(/\/mock\/other-asset\/insurance\/detail\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})
