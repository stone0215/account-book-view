/** When your routing table is too long, you can split it into small modules**/

export default {
  path: '/otherAssets',
  component: () => import('@/views/layout/Layout'),
  redirect: 'noredirect',
  name: 'OtherAssets',
  meta: {
    title: '其他資產',
    icon: 'tab'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/otherAssets/index'),
      name: 'OtherAssetsDetail',
      meta: { title: '其他資產明細', icon: 'tab' }
    }
  ]
}
