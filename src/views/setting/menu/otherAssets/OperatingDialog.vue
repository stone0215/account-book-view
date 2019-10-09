<template>
  <el-dialog
    :visible="showDialog"
    :show-close="false"
    title="其他資產"
  >
    <el-form label-width="130px">
      <el-form-item label="資產名稱">
        <el-input
          :disabled="!!rawData.asset_id"
          v-model="form.asset_name"
          class="input-medium"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="連結帳戶">
        <el-select
          v-model="form.account_id"
          placeholder="選擇帳戶類別"
          @change="getAccountName"
        >
          <el-option
            v-for="item in accountSelectList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="預計投入總額">
        <el-input
          v-model="form.expected_spend"
          class="input-medium"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="是否啟用">
        <el-radio-group v-model="form.in_use">
          <el-radio
            v-for="item in yesNo"
            :key="item.key"
            :label="item.key"
          >{{ item.value }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input
          v-model="form.asset_index"
          autocomplete="off"
          placeholder="ex:1"
          class="input-small"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="hideDialog">取消</el-button>
      <el-button
        type="primary"
        @click="submitForm"
      >確定</el-button>
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
        result = this.$store.dispatch('UpdateOtherAssetData', this.form)
      } else result = this.$store.dispatch('AddOtherAssetData', this.form)

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
