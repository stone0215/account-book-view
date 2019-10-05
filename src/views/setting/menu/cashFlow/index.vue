<template>
  <div class="cash-flow-component">
    <search-area>
      <el-form slot="content">
        <el-form-item label="名稱">
          <el-input
            v-model="conditions.name"
            class="input-medium"
          />
        </el-form-item>
        <el-form-item label="代碼類別">
          <el-select
            v-model="conditions.code_type"
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
        <el-form-item class="last">
          <el-button
            type="primary"
            class="btn-medium"
            @click="search"
          >搜尋</el-button>
          <el-button
            type="primary"
            class="btn-medium"
            @click="openDialog()"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </search-area>
    <el-table
      v-show="showList"
      :data="queryList"
      stripe
      header-cell-class-name="table-header"
    >
      <el-table-column
        :formatter="mappingName"
        label="代碼類別"
        prop="code_type"
        align="center"
      />
      <el-table-column label="名稱">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            @click="openDetail(scope.row.code_group)"
          >{{ scope.row.name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :formatter="mappingYesNo"
        label="是否啟用"
        prop="in_use"
        align="center"
      />
      <el-table-column
        label="排序"
        prop="code_index"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="openDialog(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteMainCode(scope.row.code_id)"
          >刪除</el-button>
        </template>
      </el-table-column>
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
import { codeType } from '@/assets/commonData/codeData'
import SearchArea from '@/components/SearchArea'
import { getMappingName } from '@/utils/codeMapping'
import { mapState } from 'vuex'

export default {
  name: 'RemindSetting',
  components: { OperatingDialog, SearchArea },
  data() {
    return {
      showDialog: false,
      showList: false,
      conditions: {
        name: '',
        code_type: ''
      },
      selectedData: {},
      codeType
    }
  },
  computed: {
    ...mapState({
      queryList: state => state.setting.menu.cashFlow.mainDataList
    })
  },
  methods: {
    mappingName(row, column, cellValue) {
      return getMappingName(column.property, cellValue)
    },
    mappingYesNo(row, column, cellValue) {
      return getMappingName('yes_no', cellValue)
    },
    search() {
      this.$store
        .dispatch('GetMainCodeList', this.conditions)
        .then(() => {
          this.showList = true
        })
        .catch(() => {
          this.showList = false
        })
    },
    deleteMainCode(id) {
      this.$store.dispatch('DeleteMainCodeData', id)
    },
    openDialog(rawData) {
      this.showDialog = true
      this.selectedData = rawData || { code_index: '' }
    }
  }
}
</script>
