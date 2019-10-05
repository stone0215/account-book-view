<template>
  <el-tabs
    v-model="activeTab"
    class="page"
  >
    <el-tab-pane
      label="流水帳項目"
      name="cashFlow"
    >
      <cashFlow-component />
    </el-tab-pane>
    <el-tab-pane
      label="帳戶"
      name="account"
    >
      <account-component />
    </el-tab-pane>
    <el-tab-pane
      label="信用卡"
      name="creditCard"
    >
      <credit-card-component />
    </el-tab-pane>
    <el-tab-pane
      label="其他資產"
      name="asset"
    >資產種類</el-tab-pane>
  </el-tabs>
</template>

<script>
import AccountComponent from './account/index'
import CashFlowComponent from './cashflow/index'
import CreditCardComponent from './creditCard/index'

export default {
  name: 'MenuSetting',
  components: { AccountComponent, CashFlowComponent, CreditCardComponent },
  data() {
    return {
      activeTab: 'cashFlow'
    }
  }
}
</script>

