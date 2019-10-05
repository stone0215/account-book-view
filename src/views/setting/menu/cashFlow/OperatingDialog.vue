<template>
  <el-dialog :visible="showDialog">
    <div slot="title">
      <span>主類別</span>
      <span class="hint">(因未擋重複名稱與排序，新增時建議先查詢確認)</span>
    </div>
    <el-form label-width="80px">
      <el-form-item label="代碼類別">
        <el-select
          v-model="form.code_type"
          placeholder="選擇代碼類別"
        >
          <el-option
            v-for="item in codeType"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名稱">
        <el-input
          :disabled="rawData.code_id"
          v-model="form.name"
          class="input-medium"
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
          v-model="form.code_index"
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
import { codeType } from '@/assets/commonData/codeData'
import { yesNo } from '@/assets/commonData/global'

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
      form: { code_index: '' },
      codeType,
      yesNo
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
      if (this.rawData.code_id) {
        result = this.$store.dispatch('UpdateMainCodeData', this.form)
      } else result = this.$store.dispatch('AddMainCodeData', this.form)

      result.then(data => {
        this.hideDialog()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hint {
  display: block;
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
