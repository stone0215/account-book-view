import Mock from 'mockjs'

// initial
Mock.mock('/mock/initial/query', 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/initial', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/initial', 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/initial', 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// alarm
Mock.mock('/mock/alarm', 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock(
  /\/mock\/alarm\/query\?date=(\d{1,2}\/\d{1,2}|\d{1,2})/,
  'get',
  () => {
    return {
      status: 1,
      data: [
        {
          alarm_date: '13',
          alarm_id: 1,
          alarm_type: 'M',
          content: '這是月提醒',
          due_date: null
        },
        {
          alarm_date: '01/12',
          alarm_id: 2,
          alarm_type: 'Y',
          content: '這是年提醒',
          due_date: null
        }
      ],
      msg: 'success'
    }
  }
)

Mock.mock(/\/mock\/alarm\/(\d)/, 'delete', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/alarm', 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock(/\/mock\/alarm\/(\d)/, 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

// budget
Mock.mock(/\/mock\/budget\/(\d{4})/, 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock('/mock/budget/year-range', 'get', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})
Mock.mock('/mock/budget', 'put', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})

Mock.mock(/\/mock\/budget\/(\d{4})/, 'post', () => {
  return {
    status: 1,
    data: true,
    msg: ''
  }
})
