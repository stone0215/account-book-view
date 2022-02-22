import Mock from 'mockjs'

Mock.mock('/mock/account/selection', 'get', () => {
  return {
    status: 1,
    data: [
      {
        index: null,
        key: 1,
        table: 'Account',
        type: 'cash',
        value: '現金'
      },
      {
        index: null,
        key: 2,
        table: 'Account',
        type: 'normal',
        value: '台幣帳戶'
      },
      {
        index: null,
        key: 4,
        table: 'Account',
        type: 'finance',
        value: '外幣帳戶'
      },
      {
        index: null,
        key: 25,
        table: 'Account',
        type: 'gift',
        value: '禮物卡'
      },
      {
        index: null,
        key: 28,
        table: 'Account',
        type: 'eWallet',
        value: '電子錢包'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/util/wallet-selection-group', 'get', () => {
  return {
    status: 1,
    data: [
      {
        selections: [
          {
            index: null,
            key: 1,
            table: 'Account',
            type: 'cash',
            value: '現金'
          }
        ],
        title: 'cash'
      },
      {
        selections: [
          {
            index: null,
            key: 28,
            table: 'Account',
            type: 'eWallet',
            value: '電子錢包'
          }
        ],
        title: 'eWallet'
      },
      {
        selections: [
          {
            index: null,
            key: 4,
            table: 'Account',
            type: 'finance',
            value: '外幣帳戶'
          }
        ],
        title: 'finance'
      },
      {
        selections: [
          {
            index: null,
            key: 25,
            table: 'Account',
            type: 'gift',
            value: '禮物卡'
          }
        ],
        title: 'gift'
      },
      {
        selections: [
          {
            index: null,
            key: 2,
            table: 'Account',
            type: 'normal',
            value: '台幣帳戶'
          }
        ],
        title: 'normal'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/util/credit-card-selection-group', 'get', () => {
  return {
    status: 1,
    data: [
      {
        selections: [
          {
            index: null,
            key: 3,
            table: 'Credit_Card',
            value: '現金回饋信用卡'
          },
          {
            index: null,
            key: 5,
            table: 'Credit_Card',
            value: '點數回饋信用卡'
          }
        ],
        title: '信用卡'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/util/loan-selection-group', 'get', () => {
  return {
    status: 1,
    data: [
      {
        selections: [
          {
            'index:': null,
            key: 1,
            table: 'Loan',
            value: '房貸'
          },
          {
            'index:': null,
            key: 2,
            table: 'Loan',
            value: '信用貸款'
          }
        ],
        title: '貸款'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/util/insurance-selection-group', 'get', () => {
  return {
    status: 1,
    data: { key: 1, value: 'accountTest' },
    msg: ''
  }
})

Mock.mock('/mock/util/code-selection-group', 'get', () => {
  return {
    status: 1,
    data: [
      {
        selections: [
          {
            index: null,
            key: 92,
            table: 'Code',
            type: 'Fixed',
            value: '生活基本'
          }
        ],
        title: 'Fixed'
      },
      {
        selections: [
          {
            index: null,
            key: 1,
            table: 'Code',
            type: 'Floating',
            value: '3C'
          }
        ],
        title: 'Floating'
      },
      {
        selections: [
          {
            index: null,
            key: 77,
            table: 'Code',
            type: 'Income',
            value: '主動收入'
          }
        ],
        title: 'Income'
      },
      {
        selections: [
          {
            index: null,
            key: 117,
            table: 'Code',
            type: 'Passive',
            value: '被動收入'
          }
        ],
        title: 'Passive'
      },
      {
        selections: [
          {
            index: null,
            key: 5,
            table: 'Loan',
            type: 'LoanRepayment',
            value: '繳貸款'
          }
        ],
        title: 'Passive'
      }
    ],
    msg: 'success'
  }
})

Mock.mock(/\/mock\/util\/code-selection-group\/(\d)/, 'get', options => {
  let returnValue = {
    status: 1,
    msg: 'success'
  }

  const type = options.url.substring(options.url.lastIndexOf('/') + 1)
  if (type === '1') {
    returnValue.data = [
      {
        selections: [
          {
            index: null,
            key: 13,
            table: 'Code',
            type: 'Floating',
            value: '手機'
          },
          {
            index: null,
            key: 14,
            table: 'Code',
            type: 'Floating',
            value: '電視'
          }
        ],
        title: '浮動支出'
      }
    ]
  } else if (type === '92') {
    returnValue.data = [
      {
        selections: [
          {
            index: null,
            key: 15,
            table: 'Code',
            type: 'Fixed',
            value: '水電瓦斯'
          },
          {
            index: null,
            key: 16,
            table: 'Code',
            type: 'Fixed',
            value: '房租'
          }
        ],
        title: '固定支出'
      }
    ]
  } else if (type === '77') {
    returnValue.data = [
      {
        selections: [
          {
            index: null,
            key: 17,
            table: 'Code',
            type: 'Income',
            value: '薪資'
          },
          {
            index: null,
            key: 18,
            table: 'Code',
            type: 'Income',
            value: '加班費'
          }
        ],
        title: '固定支出'
      }
    ]
  } else if (type === '117') {
    returnValue.data = [
      {
        selections: [
          {
            index: null,
            key: 19,
            table: 'Code',
            type: 'Passive',
            value: '利息'
          },
          {
            index: null,
            key: 20,
            table: 'Code',
            type: 'Passive',
            value: '股息'
          }
        ],
        title: '固定支出'
      }
    ]
  }

  return returnValue
})

Mock.mock('/mock/other-asset/items', 'get', () => {
  return {
    status: 1,
    data: [
      {
        asset_id: 1,
        asset_name: '\u53f0\u80a1',
        asset_type: 'Stock'
      },
      {
        asset_id: 3,
        asset_name: '\u5132\u84c4\u96aa',
        asset_type: 'Insurance'
      },
      {
        asset_id: 4,
        asset_name: '\u623f\u5730\u7522',
        asset_type: 'Estate'
      }
    ],
    msg: 'success'
  }
})
