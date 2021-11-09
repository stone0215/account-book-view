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
    this.$store.dispatch('CheckFxRate')
  }
}
</script>
