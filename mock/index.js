import Mock from 'mockjs'

Mock.mock('/mock/global/server-alive', 'get', () => {
  return { data: { data: true, status: 1 } }
})

Mock.mock('/mock/account/selection', 'get', () => {
  return { data: true }
})
