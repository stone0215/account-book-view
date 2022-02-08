import Mock from 'mockjs'

// account
Mock.mock(
  /\/mock\/account\/query\?name=[a-zA-Z0-9_\u4e00-\u9fa5]*&account_type=[a-zA-Z]*&in_use=(Y|N)*/,
  'get',
  () => {
    return {
      status: 1,
      data: [
        {
          account_id: null,
          account_index: null,
          account_type: 'cash',
          discount: null,
          fx_code: 'TWD',
          id: 1,
          in_use: 'Y',
          is_calculate: 'N',
          memo: null,
          name: '現金',
          owner: null
        },
        {
          account_id: '1234567',
          account_index: null,
          account_type: 'normal',
          discount: 0.28,
          fx_code: 'TWD',
          id: 2,
          in_use: 'Y',
          is_calculate: 'Y',
          memo: null,
          name: '台幣帳戶',
          owner: '使用者1'
        },
        {
          account_id: '1234567',
          account_index: null,
          account_type: 'finance',
          discount: null,
          fx_code: 'USD',
          id: 4,
          in_use: 'Y',
          is_calculate: 'Y',
          memo: '買外幣用',
          name: '外幣帳戶',
          owner: '使用者1'
        },
        {
          account_id: null,
          account_index: null,
          account_type: 'gift',
          discount: null,
          fx_code: 'TWD',
          id: 25,
          in_use: 'Y',
          is_calculate: 'N',
          memo: '點數類都算',
          name: '禮物卡',
          owner: null
        },
        {
          account_id: null,
          account_index: null,
          account_type: 'eWallet',
          discount: null,
          fx_code: 'TWD',
          id: 28,
          in_use: 'Y',
          is_calculate: 'N',
          memo: '悠遊卡之類的，可以記名',
          name: '電子錢包',
          owner: null
        }
      ],
      msg: 'success'
    }
  }
)

Mock.mock('/mock/account', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateAccountData
Mock.mock(/\/mock\/account\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteAccountData
Mock.mock(/\/mock\/account\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// code
Mock.mock(
  /\/mock\/code\/query\?name=[a-zA-Z0-9_\u4e00-\u9fa5]*&code_type=[a-zA-Z]*/,
  'get',
  () => {
    return {
      status: 1,
      data: [
        {
          code_id: 92,
          code_index: null,
          code_type: 'Fixed',
          in_use: 'Y',
          name: '生活費'
        },
        {
          code_id: 1,
          code_index: null,
          code_type: 'Floating',
          in_use: 'Y',
          name: '伙食費'
        },
        {
          code_id: 77,
          code_index: null,
          code_type: 'Income',
          in_use: 'Y',
          name: '主動收入'
        },
        {
          code_id: 117,
          code_index: null,
          code_type: 'Passive',
          in_use: 'Y',
          name: '被動收入'
        }
      ],
      msg: 'success'
    }
  }
)

Mock.mock('/mock/code', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateMainCodeData
Mock.mock(/\/mock\/code\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getSubCodeList
Mock.mock(/\/mock\/sub-code\/query\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/sub-code', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateSubCodeData
Mock.mock(/\/mock\/sub-code\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteCodeData
Mock.mock(/\/mock\/code\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// credit card
Mock.mock(
  /\/mock\/credit-card\/query\?card_name=[a-zA-Z0-9_\u4e00-\u9fa5]*&in_use=(Y|N)*/,
  'get',
  () => {
    return {
      status: 1,
      data: [
        {
          card_name: '現金回饋信用卡',
          card_no: '2187',
          charge_day: '06',
          credit_card_id: 3,
          credit_card_index: null,
          feedback_way: 'Cash',
          fx_code: 'TWD',
          in_use: 'Y',
          last_day: '21',
          limit_date: '2026/08',
          note: '現金回饋'
        },
        {
          card_name: '點數回饋信用卡',
          card_no: '8922',
          charge_day: '01',
          credit_card_id: 5,
          credit_card_index: null,
          feedback_way: 'Point',
          fx_code: 'TWD',
          in_use: 'Y',
          last_day: '15',
          limit_date: '2027/09',
          note: '點數回饋'
        }
      ],
      msg: 'success'
    }
  }
)

Mock.mock('/mock/credit-card', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateCreditCardData
Mock.mock(/\/mock\/credit-card\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteCreditCardData
Mock.mock(/\/mock\/credit-card\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// loan
Mock.mock('/mock/loan/query', 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/loan', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateLoanData
Mock.mock(/\/mock\/loan\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteLoanData
Mock.mock(/\/mock\/loan\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// other-asset
Mock.mock('/mock/other-asset/query', 'get', () => {
  return {
    status: 1,
    data: [
      {
        asset_id: 1,
        asset_index: null,
        asset_name: '\u53f0\u80a1',
        asset_type: 'Stock',
        in_use: 'Y'
      },
      {
        asset_id: 3,
        asset_index: null,
        asset_name: '\u5132\u84c4\u96aa',
        asset_type: 'Insurance',
        in_use: 'Y'
      },
      {
        asset_id: 4,
        asset_index: null,
        asset_name: '\u623f\u5730\u7522',
        asset_type: 'Estate',
        in_use: 'Y'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/other-asset', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateOtherAssetsData
Mock.mock(/\/mock\/other-asset\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteOtherAssetsData
Mock.mock(/\/mock\/other-asset\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})
