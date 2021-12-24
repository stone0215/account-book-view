import Mock from 'mockjs'

Mock.mock('/mock/report/balance', 'get', () => {
  return {
    status: 1,
    data: {
      assets: [
        {
          amount: 0.0,
          name: '\u73fe\u91d1',
          type: '\u6d41\u52d5\u8cc7\u7522'
        },
        {
          amount: 0,
          name: '\u80a1\u7968',
          type: '\u6d41\u52d5\u8cc7\u7522'
        },
        {
          amount: 1000,
          name: '\u5132\u84c4\u96aa',
          type: '\u56fa\u5b9a\u8cc7\u7522'
        },
        {
          amount: 10000000,
          name: '\u4e0d\u52d5\u7522',
          type: '\u56fa\u5b9a\u8cc7\u7522'
        }
      ],
      debts: [
        {
          amount: 2178,
          name: '\u4fe1\u7528\u5361'
        },
        {
          amount: 2999750,
          name: '\u8cb8\u6b3e'
        }
      ]
    },
    msg: 'success'
  }
})

// getSpendingList
Mock.mock(
  /\/mock\/report\/expenditure\/(month\/(\d{6})|year\/(\d{4}))/,
  'get',
  () => {
    return {
      status: 1,
      data: [
        {
          amount: 100,
          dateString: '202101',
          name: '\u6bdb\u5c0f\u5b69',
          type: 'Floating'
        },
        {
          amount: 1000,
          dateString: '202109',
          name: '\u85aa\u8cc7',
          type: 'Income'
        },
        {
          amount: 2800,
          dateString: '202109',
          name: '\u5b73\u606f\u6536\u5165',
          type: 'Passive'
        },
        {
          amount: 4000,
          dateString: '202109',
          name: '\u751f\u6d3b\u57fa\u672c',
          type: 'Fixed'
        },
        {
          amount: 100,
          dateString: '202108',
          name: '\u8cb8\u6b3e\u6b3e\u6b3e',
          type: 'Loan'
        }
      ],
      msg: 'success'
    }
  }
)

Mock.mock('/mock/report/asset', 'get', () => {
  return {
    status: 1,
    data: [
      {
        amount: 0,
        assetType: '\u73fe\u91d1',
        detailType: 'TWD',
        name: '\u6c38\u8c50'
      },
      {
        amount: 0.0,
        assetType: '\u73fe\u91d1',
        detailType: 'USD',
        name: '\u6c38\u8c50\u7f8e\u5143'
      },
      {
        amount: 0.0,
        assetType: '\u73fe\u91d1',
        detailType: 'JPY',
        name: '\u4e2d\u4fe1\u65e5\u5713'
      },
      {
        amount: 10000000,
        assetType: '\u4e0d\u52d5\u7522',
        detailType: 'idle',
        name: 'my home'
      },
      {
        amount: 0,
        assetType: '\u4e0d\u52d5\u7522',
        detailType: 'idle',
        name: '??'
      },
      {
        amount: 1000,
        assetType: '\u4fdd\u96aa',
        detailType: null,
        name: '儲蓄險'
      },
      {
        amount: 0,
        assetType: '\u80a1\u7968',
        detailType: '\u53f0\u80a1',
        name: '2330'
      },
      {
        amount: 0,
        assetType: '\u80a1\u7968',
        detailType: '\u7f8e\u80a1',
        name: 'AAPL'
      }
    ],
    msg: 'success'
  }
})