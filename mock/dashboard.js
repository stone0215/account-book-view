import Mock from 'mockjs'

// getSummary
Mock.mock(
  /\/mock\/dashboard\/summary\/(month\/(\d{6})|year\/(\d{4}))/,
  'get',
  options => {
    if (options.url.indexOf('month') !== -1) {
      return {
        status: 1,
        data: {
          spending: 10000,
          workFreedom: 40.23,
          freedom: 33.46,
          debt: 4000000,
          asset: 12000000,
          assetBalanceChart: [
            {
              dateString: '2021/01',
              type: 'asset',
              value: 1000000
            },
            {
              dateString: '2021/02',
              type: 'asset',
              value: 1300000
            },
            {
              dateString: '2021/03',
              type: 'asset',
              value: 2000000
            },
            {
              dateString: '2021/04',
              type: 'asset',
              value: 3000000
            },
            {
              dateString: '2021/05',
              type: 'asset',
              value: 4000000
            }
          ],
          debtBalanceChart: [
            {
              dateString: '2021/01',
              type: 'debt',
              value: 6000000
            },
            {
              dateString: '2021/02',
              type: 'debt',
              value: 5000000
            },
            {
              dateString: '2021/03',
              type: 'debt',
              value: 4000000
            },
            {
              dateString: '2021/04',
              type: 'debt',
              value: 3000000
            },
            {
              dateString: '2021/05',
              type: 'debt',
              value: 2000000
            }
          ],
          netAssetGrowth: 20.67
        },
        msg: 'success'
      }
    } else {
      return {
        status: 1,
        data: {
          spending: 10000,
          workFreedom: 40.23,
          freedom: 33.46,
          debt: 4000000,
          asset: 12000000,
          assetBalanceChart: [
            {
              dateString: '2017',
              type: 'asset',
              value: 1000000
            },
            {
              dateString: '2018',
              type: 'asset',
              value: 1300000
            },
            {
              dateString: '2019',
              type: 'asset',
              value: 2000000
            },
            {
              dateString: '2020',
              type: 'asset',
              value: 3000000
            },
            {
              dateString: '2021/05',
              type: 'asset',
              value: 4000000
            }
          ],
          debtBalanceChart: [
            {
              dateString: '2017',
              type: 'debt',
              value: 6000000
            },
            {
              dateString: '2018',
              type: 'debt',
              value: 5000000
            },
            {
              dateString: '2019',
              type: 'debt',
              value: 4000000
            },
            {
              dateString: '2020',
              type: 'debt',
              value: 3000000
            },
            {
              dateString: '2021',
              type: 'debt',
              value: 2000000
            }
          ],
          netAssetGrowth: 20.67
        },
        msg: 'success'
      }
    }
  }
)

Mock.mock('/mock/dashboard/alarm', 'get', () => {
  return {
    status: 1,
    data: [
      {
        content: '繳保費',
        date: '12/13'
      },
      {
        content: '信用卡扣款日',
        date: '01/13'
      }
    ],
    msg: 'success'
  }
})

// getBudgetUsed
Mock.mock(
  /\/mock\/dashboard\/budget\/(month\/(\d{6})|year\/(\d{4}))/,
  'get',
  options => {
    if (options.url.indexOf('month') !== -1) {
      return {
        status: 1,
        data: 48802,
        msg: 'success'
      }
    } else {
      return {
        status: 1,
        data: 600000,
        msg: 'success'
      }
    }
  }
)

Mock.mock('/mock/dashboard/target', 'get', () => {
  return {
    status: 1,
    data: [
      {
        distinct_number: 1,
        is_done: 'Y',
        setting_value: '月收入成長10%',
        target_year: '2021'
      },
      {
        distinct_number: 2,
        is_done: 'N',
        setting_value: '買一間房子',
        target_year: '2021'
      }
    ],
    msg: 'success'
  }
})

Mock.mock('/mock/target', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateTarget
Mock.mock(/\/mock\/target\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteTarget
Mock.mock(/\/mock\/target\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getGiftedList
Mock.mock(/\/mock\/dashboard\/gift\/(\d{4})/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        amount: 1000000,
        owner: '自己',
        rate: 45.45
      },
      {
        amount: 2000000,
        owner: '父母',
        rate: 90.9
      }
    ],
    msg: 'success'
  }
})
