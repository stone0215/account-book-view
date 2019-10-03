<template>
  <el-dialog
    :visible="showDialog"
    title="支出提醒"
  >
    <el-form label-width="80px">
      <el-form-item label="日期">
        <el-input
          v-model="form.alarm_date"
          placeholder="mm/dd 或 dd"
          class="input-medium"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="提醒頻率">
        <el-radio-group v-model="form.alarm_type">
          <el-radio label="M">每月</el-radio>
          <el-radio label="Y">每年</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="內容">
        <el-input
          v-model="form.content"
          autocomplete="off"
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
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    rawData: {
      type: Object,
      default: function() {}
    }
  },
  data() {
    return {
      form: {}
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
      if (this.rawData) {
        result = this.$store.dispatch('UpdateAlarmData', this.form)
      } else result = this.$store.dispatch('AddAlarmData', this.form)

      result.then(data => {
        this.hideDialog()
      })
    }
  }
}
</script>
