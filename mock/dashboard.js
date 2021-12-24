import Mock from 'mockjs'

// getSummary
Mock.mock(
  /\/mock\/dashboard\/summary\/(month\/(\d{6})|year\/(\d{4}))/,
  'get',
  () => {
    return {
      status: 1,
      data: true,
      msg: ''
    }
  }
)

Mock.mock('/mock/dashboard/alarm', 'get', () => {
  return {
    status: 1,
    data: [
      {
        content: '這是提醒1',
        date: '12/13'
      },
      {
        content: '這是提醒2',
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
  () => {
    return {
      status: 1,
      data: 48802,
      msg: 'success'
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
        setting_value: 'test',
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
        owner: '台幣帳戶',
        rate: 0.45
      }
    ],
    msg: 'success'
  }
})
