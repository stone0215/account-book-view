/** When your routing table is too long, you can split it into small modules**/

export default {
  path: '/overview',
  component: () => import('@/views/layout/Layout'),
  redirect: 'noredirect',
  name: 'Overview',
  meta: {
    title: '財務狀況一覽',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'accounting',
      component: () => import('@/views/setting/initial/index'),
      name: 'Accounting',
      meta: { title: '帳務一覽' }
    },
    {
      path: 'spendings',
      component: () => import('@/views/setting/initial/index'),
      name: 'Spendings',
      meta: { title: '支出一覽' }
    },
    {
      path: 'passiveIncome',
      component: () => import('@/views/setting/initial/index'),
      name: 'PassiveIncome',
      meta: { title: '財務規劃一覽' }
    },
    {
      path: 'otherAssets',
      component: () => import('@/views/setting/initial/index'),
      name: 'OtherAssetOverview',
      meta: { title: '非現金資產一覽' }
    }
  ]
}
