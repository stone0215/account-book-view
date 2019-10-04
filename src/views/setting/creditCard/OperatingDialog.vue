<template>
  <el-dialog
    :visible="showDialog"
    title="信用卡"
  >
    <el-form label-width="100px">
      <el-form-item label="信用卡名稱">
        <el-input
          v-model="form.card_name"
          class="input-medium"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="結帳日">
        <el-input
          v-model="form.last_day"
          placeholder="dd"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="扣款日">
        <el-input
          v-model="form.charge_day"
          placeholder="dd"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="回饋方式">
        <el-select
          v-model="form.feedback_way"
          placeholder="選擇回饋方式"
        >
          <el-option
            v-for="item in feedbackWay"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="幣別">
        <el-select
          v-model="form.fx_code"
          placeholder="選擇幣別"
        >
          <el-option
            v-for="item in fxCode"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否啟用">
        <el-radio-group v-model="form.in_use">
          <el-radio label="Y">是</el-radio>
          <el-radio label="N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="備註">
        <el-input
          v-model="form.note"
          :rows="3"
          autocomplete="off"
          type="textarea"
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
import { feedbackWay } from '@/assets/commonData/creditCardData'
import { fxCode } from '@/assets/commonData/fxData'

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
      feedbackWay,
      fxCode: fxCode.filter(x => x.inUse)
    }
  },
  watch: {
    rawData(newData) {
      this.form = JSON.parse(JSON.stringify(newData))
    }
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog')
    },
    submitForm() {
      let result = null
      if (this.rawData.length > 0) {
        result = this.$store.dispatch('UpdateCreditCardData', this.form)
      } else result = this.$store.dispatch('AddCreditCardData', this.form)

      result.then(data => {
        this.hideDialog()
      })
    }
  }
}
</script>
