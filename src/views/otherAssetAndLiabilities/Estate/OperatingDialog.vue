<template>
  <el-dialog :visible="showDialog" :show-close="false" title="不動產">
    <el-form label-width="130px">
      <el-form-item label="名稱">
        <el-input
          v-model="form.estate_name"
          autocomplete="off"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="類別">
        <el-select v-model="form.estate_type" placeholder="選擇類別">
          <el-option
            v-for="item in estateType"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.estate_address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="獲得日期">
        <el-date-picker
          v-model="form.obtain_date"
          type="date"
          placeholder="選擇日期"
        />
      </el-form-item>
      <el-form-item label="頭期款">
        <el-input
          v-model="form.down_payment"
          class="input-medium"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="貸款">
        <el-select
          v-model="form.loan_id"
          placeholder="選擇帳戶類別"
          @change="(value) => getAccountName(value, 'in')"
        >
          <el-option
            v-for="item in accountSelectList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="狀態">
        <el-select v-model="form.estate_status" placeholder="選擇狀態">
          <el-option
            v-for="item in estateStatus"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import moment from 'moment'

import { estateType, estateStatus } from '@/assets/commonData/otherAssets'
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
      estateType,
      estateStatus,
      form: {}
    }
  },
  computed: {
    ...mapState({
      accountSelectList: (state) => state.setting.menu.account.accountSelectList
    })
  },
  watch: {
    rawData(newData) {
      if (newData) {
        this.form = JSON.parse(JSON.stringify(newData))
        if (this.form.obtain_date) {
          this.form.obtain_date = moment(`${this.form.obtain_date} UTC`)
        }
      }
    }
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog')
    },
    submitForm() {
      let result = null
      if (this.form.estate_id) {
        result = this.$store.dispatch('UpdateEstateAssetData', this.form)
      } else result = this.$store.dispatch('AddEstateAssetData', this.form)

      result.then((data) => {
        this.$store.dispatch('GetEstateAssetList', this.rawData.asset_id)
        this.hideDialog()
      })
    },
    getAccountName(value, type) {
      if (type === 'in') {
        const account_name = this.accountSelectList.find(
          (item) => item.key === value
        ).value

        this.form.in_account_name = account_name

        this.form.out_account_id = value
        this.form.out_account_name = account_name
      } else {
        this.form.out_account_name = this.accountSelectList.find(
          (item) => item.key === value
        ).value
      }
    }
  }
}
</script>
