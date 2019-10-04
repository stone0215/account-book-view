/** When your routing table is too long, you can split it into small modules**/

const settingRouter = {
  path: '/setting',
  component: () => import('@/views/layout/Layout'),
  redirect: 'noredirect',
  name: 'Setting',
  meta: {
    title: '設定',
    icon: 'table'
  },
  children: [
    {
      path: 'initial-setting',
      component: () => import('@/views/table/complexTable'),
      name: 'DynamicTable',
      meta: { title: '初始值設定' }
    },
    {
      path: 'menu-setting',
      component: () => import('@/views/table/complexTable'),
      name: 'DragTable',
      meta: { title: '選單設定' }
    },
    {
      path: 'budget-setting',
      component: () => import('@/views/table/complexTable'),
      name: 'InlineEditTable',
      meta: { title: '預算設定' }
    },
    {
      path: 'creditCard-setting',
      component: () => import('@/views/setting/creditCard/index'),
      name: 'CreditCardSetting',
      meta: { title: '信用卡設定' }
    },
    {
      path: 'remind-setting',
      component: () => import('@/views/setting/remind/index'),
      name: 'RemindSetting',
      meta: { title: '定期支出提醒' }
    }
  ]
}
export default settingRouter
