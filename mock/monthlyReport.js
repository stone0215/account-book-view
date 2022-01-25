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
      gainLoss: -563,
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
          note: '蛋餅',
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
          action_sub: '15',
          action_sub_table: 'Code',
          action_sub_type: 'Fixed',
          distinct_number: 374,
          isEditMode: false,
          note: '電費',
          spend_date: 'Fri, 17 Dec 2021 16:00:00 GMT',
          spend_way: '1',
          spend_way_table: 'Account',
          spend_way_type: 'cash',
          spending: -480,
          vesting_month: '202112'
        },
        {
          action_main: 'LoanRepayment',
          action_main_table: 'Loan',
          action_main_type: 'undefined',
          action_sub: '',
          action_sub_table: '',
          action_sub_type: '',
          distinct_number: 374,
          isEditMode: false,
          note: '房貸',
          spend_date: 'Fri, 24 Dec 2021 16:00:00 GMT',
          spend_way: '2',
          spend_way_table: 'Account',
          spend_way_type: 'normal',
          spending: -30000,
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
        },
        {
          name: 'Fixed',
          value: 480
        }
      ],
      expendingOuterPie: [
        {
          name: '主食',
          type: 'Floating',
          value: -83
        },
        {
          name: '生活基本',
          type: 'Fixed',
          value: -480
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
        quota: -2520,
        spending: -480,
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
        spending: 83,
        type: '信用卡'
      },
      {
        balance: 4970000,
        name: '房貸',
        payment: 30000,
        spending: 0,
        type: '貸款'
      }
    ],
    msg: 'success'
  }
})
