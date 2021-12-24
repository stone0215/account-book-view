import Mock from 'mockjs'

Mock.mock('/mock/global/checkInvoice', 'post', () => {
  return {
    status: 1,
    data: null,
    msg: 'invoice is importing...'
  }
})

// getJournalListByVestingMonth
Mock.mock(/\/mock\/journal\/(\d{6})/, 'get', () => {
  return {
    status: 1,
    data: {
      gainLoss: -83,
      journalList: [
        {
          action_main: '1',
          action_main_table: 'Code',
          action_main_type: 'Floating',
          action_sub: '13',
          action_sub_table: 'Code',
          action_sub_type: 'Floating',
          distinct_number: 372,
          isEditMode: false,
          note:
            '\u30109030192001\u301192\u7121\u925b\u6c7d\u6cb9\u6298\u62b5\u984d -3, \u3010113F 12092005\u3011\uff19\uff12\u7121\u925b\u6c7d\u6cb9 86, ',
          spend_date: 'Fri, 03 Dec 2021 16:00:00 GMT',
          spend_way: '3',
          spend_way_table: 'Credit_Card',
          spend_way_type: 'undefined',
          spending: -83,
          vesting_month: '202112'
        },
        {
          action_main: '92',
          action_main_table: 'Code',
          action_main_type: 'Fixed',
          action_sub: 'No',
          action_sub_table: 'Code',
          action_sub_type: 'Fixed',
          distinct_number: 374,
          isEditMode: false,
          note: '\u73a9\u5177 580, \u6298\u62b5 -100, ',
          spend_date: 'Fri, 03 Dec 2021 16:00:00 GMT',
          spend_way: '1',
          spend_way_table: 'Account',
          spend_way_type: 'cash',
          spending: -480,
          vesting_month: '202112'
        }
      ]
    },
    msg: 'success'
  }
})

// deleteJournalData
Mock.mock(/\/mock\/journal\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/journal', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateJournalData
Mock.mock(/\/mock\/journal\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// setMonthlySummary
Mock.mock(/\/mock\/balance\/(\d{6})/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getExpenditureRatioByVestingMonth
Mock.mock(/\/mock\/journal\/expenditure-ratio\/(\d{6})/, 'get', () => {
  return {
    status: 1,
    data: {
      expendingInnerPie: [
        {
          name: 'Floating',
          value: 83
        }
      ],
      expendingOuterPie: [
        {
          name: '\u4e3b\u98df',
          type: 'Floating',
          value: -83
        }
      ]
    },
    msg: 'success'
  }
})

// getInvestRatioByVestingMonth
Mock.mock(/\/mock\/journal\/invest-ratio\/(\d{6})/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// getExpenditureBudgetByVestingMonth
Mock.mock(/\/mock\/journal\/expenditure-budget\/(\d{6})/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        budget: -3000,
        name: '\u751f\u6d3b\u57fa\u672c',
        quota: -3000,
        spending: null,
        type: 'Fixed'
      },
      {
        budget: -7677,
        name: '\u4e3b\u98df',
        quota: -7594,
        spending: -83,
        type: 'Floating'
      }
    ],
    msg: 'success'
  }
})

// getLiabilitiesByVestingMonth
Mock.mock(/\/mock\/journal\/liability\/(\d{6})/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        balance: 217,
        name: '現金回饋信用卡',
        payment: null,
        spending: 217,
        type: '信用卡'
      },
      {
        balance: 250,
        name: '房貸',
        payment: 300,
        spending: 50,
        type: '貸款'
      }
    ],
    msg: 'success'
  }
})
