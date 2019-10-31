<template>
  <el-dialog
    :visible="showDialog"
    :show-close="false"
    title="初始值"
  >
    <el-form label-width="80px">
      <el-form-item label="名稱">
        <el-select
          :disabled="!!form.setting_date"
          v-model="form.code_name"
          placeholder="请选择"
          @change="handelSelectedItem"
        >
          <el-option-group
            v-for="group in selectionGroup"
            :key="group.title"
            :label="group.title"
          >
            <el-option
              v-for="item in group.selections"
              :key="item.key"
              :label="item.value"
              :value="item.key + '/' + item.value + '/' + group.type"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="初始值">
        <el-input
          v-model="form.setting_value"
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
      form: {}
    }
  },
  computed: {
    ...mapState({
      selectionGroup: state => state.setting.initial.selectionGroup
    })
  },
  watch: {
    rawData(newData) {
      this.form = JSON.parse(JSON.stringify(newData))
    }
  },
  created() {
    this.$store.dispatch('GetSelectionGroup')
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog')
    },
    submitForm() {
      let result = null
      if (this.rawData.setting_date) {
        result = this.$store.dispatch('UpdateInitialData', this.form)
      } else result = this.$store.dispatch('AddInitialData', this.form)

      result.then(data => {
        this.hideDialog()
      })
    },
    handelSelectedItem(value) {
      const selectedItem = value.split('/')
      this.form.code_id = selectedItem[0]
      this.form.code_name = selectedItem[1]
      this.form.initial_type = selectedItem[2]
    }
  }
}
</script>
