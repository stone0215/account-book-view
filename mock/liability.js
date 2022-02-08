import Mock from 'mockjs'

// loan
Mock.mock('/mock/liability/loan', 'get', () => {
  return {
    status: 1,
    data: [
      {
        amount: 2000000,
        apply_date: 'Sun, 01 Aug 2021 16:00:00 GMT',
        grace_expire_date: 'Mon, 30 Aug 2021 16:00:00 GMT',
        loan_id: 1,
        loan_name: '房貸',
        loan_type: 'mortgage',
        remaining: 4970000,
        repayed: 'N',
        total_payed: 0
      },
      {
        amount: 1000000,
        apply_date: 'Sun, 22 Aug 2021 16:00:00 GMT',
        grace_expire_date: 'Mon, 30 Aug 2021 16:00:00 GMT',
        loan_id: 2,
        loan_name: '信用貸款',
        loan_type: 'unsecured',
        remaining: 0,
        repayed: 'Y',
        total_payed: 1000000
      }
    ],
    msg: 'success'
  }
})

// getLiabilityById
Mock.mock(/\/mock\/liability\/loan\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/liability/loan', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateLiabilityData
Mock.mock(/\/mock\/liability\/loan\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteLiabilityData
Mock.mock(/\/mock\/liability\/loan\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/liability/loan/selection', 'get', () => {
  return {
    status: 1,
    data: [
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
    msg: 'success'
  }
})

// getLoanDetailList
Mock.mock(/\/mock\/liability\/loan\/detail\/(\d)/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/liability/loan/detail', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// updateLoanDetailData
Mock.mock(/\/mock\/liability\/loan\/detail\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// deleteLoanDetailData
Mock.mock(/\/mock\/liability\/loan\/detail\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})
