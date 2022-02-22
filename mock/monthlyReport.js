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
      gainLoss: 100564.11,
      journalList: [
        {
          action_main: '1',
          action_main_table: 'Code',
          action_main_type: 'Floating',
          action_sub: '13',
          action_sub_table: 'Code',
          action_sub_type: 'Floating',
          distinct_number: 104,
          isEditMode: false,
          note: '',
          spend_date: 'Fri, 03 Dec 2021 16:00:00 GMT',
          spend_way: '3',
          spend_way_table: 'Credit_Card',
          spend_way_type: 'undefined',
          spending: -20000,
          vesting_month: '202112'
        },
        {
          "action_main": "77",
          "action_main_table": "Code",
          "action_main_type": "Income",
          "action_sub": "17",
          "action_sub_table": "Code",
          "action_sub_type": "Income",
          "distinct_number": 105,
          "isEditMode": false,
          "note": "",
          "spend_date": "2021-12-05 16:00:00.000000",
          "spend_way": "2",
          "spend_way_table": "Account",
          "spend_way_type": "normal",
          "spending": 100000,
          "vesting_month": "202112"
        },
        {
          "action_main": "77",
          "action_main_table": "Code",
          "action_main_type": "Income",
          "action_sub": "18",
          "action_sub_table": "Code",
          "action_sub_type": "Income",
          "distinct_number": 106,
          "isEditMode": false,
          "note": "",
          "spend_date": "2021-12-05 16:00:00.000000",
          "spend_way": "2",
          "spend_way_table": "Account",
          "spend_way_type": "normal",
          "spending": 50000,
          "vesting_month": "202112"
        },
        {
          "action_main": "CreditCardRepayment",
          "action_main_table": "CreditCard",
          "action_main_type": "undefined",
          "action_sub": "3",
          "action_sub_table": "Credit_Card",
          "action_sub_type": "undefined",
          "distinct_number": 107,
          "isEditMode": false,
          "note": null,
          "spend_date": "2021-12-16 16:00:00.000000",
          "spend_way": "2",
          "spend_way_table": "Account",
          "spend_way_type": "normal",
          "spending": -1497,
          "vesting_month": "202112"
        },
        {
          "action_main": "Transfer",
          "action_main_table": "Account",
          "action_main_type": "undefined",
          "action_sub": "2",
          "action_sub_table": "Account",
          "action_sub_type": "normal",
          "distinct_number": 108,
          "isEditMode": false,
          "note": "28.036",
          "spend_date": "2021-12-17 16:00:00.000000",
          "spend_way": "4",
          "spend_way_table": "Account",
          "spend_way_type": "finance",
          "spending": 3000,
          "vesting_month": "202101"
        },
        {
          action_main: '92',
          action_main_table: 'Code',
          action_main_type: 'Fixed',
          action_sub: '16',
          action_sub_table: 'Code',
          action_sub_type: 'Fixed',
          distinct_number: 109,
          isEditMode: false,
          note: '',
          spend_date: 'Fri, 17 Dec 2021 16:00:00 GMT',
          spend_way: '1',
          spend_way_table: 'Account',
          spend_way_type: 'cash',
          spending: -15000,
          vesting_month: '202112'
        },
        {
          "action_main": "117",
          "action_main_table": "Code",
          "action_main_type": "Passive",
          "action_sub": "20",
          "action_sub_table": "Code",
          "action_sub_type": "Passive",
          "distinct_number": 110,
          "isEditMode": false,
          "note": "AAPL",
          "spend_date": "2021-12-19 16:00:00.000000",
          "spend_way": "4",
          "spend_way_table": "Account",
          "spend_way_type": "finance",
          "spending": 11.35,
          "vesting_month": "202112"
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
        },
        {
          action_main: 'Transfer',
          action_main_table: 'Account',
          action_main_type: 'undefined',
          action_sub: '2',
          action_sub_table: 'Account',
          action_sub_type: 'normal',
          distinct_number: 375,
          isEditMode: false,
          note: '2330*1',
          spend_date: 'Fri, 31 Dec 2021 16:00:00 GMT',
          spend_way: 'Stock',
          spend_way_table: 'Stock_Detail',
          spend_way_type: 'Asset',
          spending: -600000,
          vesting_month: '202112'
        },
        {
          action_main: 'Transfer',
          action_main_table: 'Account',
          action_main_type: 'undefined',
          action_sub: 'Estate',
          action_sub_table: 'Estate_Journal',
          action_sub_type: 'Asset',
          distinct_number: 376,
          isEditMode: false,
          note: '',
          spend_date: 'Fri, 31 Dec 2021 16:00:00 GMT',
          spend_way: '2',
          spend_way_table: 'Account',
          spend_way_type: 'normal',
          spending: -2000000,
          vesting_month: '202112'
        },
        {
          action_main: 'Transfer',
          action_main_table: 'Account',
          action_main_type: 'undefined',
          action_sub: 'Insurance',
          action_sub_table: 'Insurance_Journal',
          action_sub_type: 'Asset',
          distinct_number: 377,
          isEditMode: false,
          note: '',
          spend_date: 'Fri, 31 Dec 2021 16:00:00 GMT',
          spend_way: '4',
          spend_way_table: 'Account',
          spend_way_type: 'finance',
          spending: -3000,
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
          value: 20000
        },
        {
          name: 'Fixed',
          value: 15000
        },
        {
          "name": "Income",
          "value": 150000
        },
        {
          "name": "Passive",
          "value": 17061.11
        }
      ],
      expendingOuterPie: [
        {
          name: '3C',
          type: 'Floating',
          value: 20000
        },
        {
          name: '生活基本',
          type: 'Fixed',
          value: 15000
        },
        {
          "name": "\u85aa\u8cc7",
          "type": "Income",
          "value": 100000
        },
        {
          "name": "\u734e\u91d1",
          "type": "Income",
          "value": 50000
        },
        {
          "name": "\u5b73\u606f\u6536\u5165",
          "type": "Passive",
          "value": 17061.11
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
    data: [
      {
        "name": "\u4e0d\u52d5\u7522",
        "type": "\u8cb7\u5165",
        "value": 2000000
      },
      {
        "name": "\u4fdd\u96aa",
        "type": "\u8cb7\u5165",
        "value": 52162.16
      },
      {
        "name": "\u63db\u532f",
        "type": "\u8cb7\u5165",
        "value": 84108.0
      },
      {
        "name": "\u80a1\u7968",
        "type": "\u8cb7\u5165",
        "value": -600000
      }
    ],
    msg: 'success'
  }
})

// getExpenditureBudgetByVestingMonth
Mock.mock(/\/mock\/journal\/expenditure-budget\/(\d{6})/, 'get', () => {
  return {
    status: 1,
    data: [
      {
        budget: -20000,
        name: '\u751f\u6d3b\u57fa\u672c',
        quota: -5000,
        spending: -15000,
        type: 'Fixed'
      },
      {
        budget: -27677,
        name: '3C',
        quota: -7677,
        spending: -20000,
        type: 'Floating'
      },
      {
        budget: -3000,
        name: '日用品',
        quota: -3000,
        spending: 0,
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
        payment: 1497,
        spending: 20000,
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
