<template>
  <el-tabs
    v-model="activeTab"
    class="page"
  >
    <el-tab-pane
      label="流水帳類別"
      name="cashFlowType"
    >流水帳類別</el-tab-pane>
    <el-tab-pane
      label="資產種類"
      name="asset"
    >資產種類</el-tab-pane>
    <el-tab-pane
      label="帳戶"
      name="account"
    >
      <account-component />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AccountComponent from './account/index'

export default {
  name: 'MenuSetting',
  components: { AccountComponent },
  data() {
    return {
      activeTab: 'cashFlowType'
    }
  }
}
</script>

