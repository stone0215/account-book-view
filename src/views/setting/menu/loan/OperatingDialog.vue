<template>
  <el-dialog :visible="showDialog" :show-close="false" title="貸款">
    <el-form label-width="130px">
      <el-form-item label="貸款名稱">
        <el-input v-model="form.loan_name" class="input-medium" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="連結帳戶">
        <el-select v-model="form.account_id" placeholder="選擇帳戶類別" @change="getAccountName">
          <el-option
            v-for="item in accountSelectList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="利率">
        <el-input v-model="form.interest_rate" class="input-medium" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="申請日期">
        <el-date-picker v-model="form.apply_date" type="date" placeholder="選擇日期"/>
      </el-form-item>
      <el-form-item label="每月付款日">
        <el-input v-model="form.pay_day" class="input-medium" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input
          v-model="form.loan_index"
          autocomplete="off"
          placeholder="ex:1"
          class="input-small"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { yesNo } from '@/assets/commonData/global'
import { mapState } from 'vuex'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    rawData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {},
      yesNo
    }
  },
  computed: {
    ...mapState({
      accountSelectList: state => state.setting.menu.account.accountSelectList
    })
  },
  watch: {
    rawData(newData) {
      this.form = JSON.parse(JSON.stringify(newData))
    }
  },
  created() {
    this.$store.dispatch('GetAccountSelection')
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog')
    },
    submitForm() {
      let result = null
      if (this.rawData.asset_id) {
        result = this.$store.dispatch('UpdateLoanData', this.form)
      } else result = this.$store.dispatch('AddLoanData', this.form)

      result.then(data => {
        this.hideDialog()
      })
    },
    getAccountName(value) {
      this.form.account_name = this.accountSelectList.find(
        item => item.key === value
      ).value
    }
  }
}
</script>
