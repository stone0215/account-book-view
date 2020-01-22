<template>
  <div>
    <div>
      <el-button type="primary" @click="openDialog()">新增</el-button>
    </div>
    <el-table :data="queryList" stripe header-cell-class-name="table-header">
      <el-table-column label="代號" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetailDialog(scope.row.id)">{{
            scope.row.account_name
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="名稱" prop="asset_name" />
      <el-table-column label="買入時間" prop="expected_spend" align="center" />
      <el-table-column label="賣出時間" prop="expected_spend" align="center" />
      <el-table-column label="損益" prop="asset_type" align="right" />
      <el-table-column label="報酬率" prop="expected_spend" align="center" />
    </el-table>

    <operating-dialog
      :show-dialog="showDialog"
      :raw-data="selectedData"
      @hideDialog="showDialog = false"
    />
  </div>
</template>

<script>
import OperatingDialog from './OperatingDialog'
import { mapState } from 'vuex'

export default {
  components: { OperatingDialog },
  data() {
    return {
      showDialog: false,
      selectedData: {}
    }
  },
  computed: {
    ...mapState({
      queryList: state => state.setting.menu.otherAssets.dataList
    })
  },
  created() {
    this.$store.dispatch('GetOtherAssetsList')
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog')
    },
    openDialog(inputData) {
      this.showDialog = true
      this.selectedData = inputData || { asset_index: '' }
    },
    deleteOtherAsset(id) {
      this.$confirm('確定要刪除嗎？', '', {
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$store.dispatch('DeleteOtherAssetData', id)
        })
        .catch(() => {})
    }
  }
}
</script>
