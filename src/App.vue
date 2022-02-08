<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('GetAccountSelection')

    // 檢查今日匯率
    this.$store.dispatch('CheckData', { type: 'fx' })

    // 檢查發票
    this.$store.dispatch('CheckData', { type: 'invoice' })

    // 檢查股價
    this.$store.dispatch('CheckData', { type: 'stock' })
  }
}
</script>
