<template>
  <div class="page cash-flow">
    <div class="position-right">
      <el-date-picker
        v-model="thisMonth"
        type="month"
        value-format="yyyyMM"
        placeholder="選擇月"
        @change="fetchData"
      />
      <el-button type="danger" @click="closeAccounts">
        關帳
      </el-button>
    </div>
    <div class="main-content">
      <div class="up-side">
        <DoublePie
          v-if="
            innerExpenditureRatio.length > 0 && outerExpenditureRatio.length > 0
          "
          :inner-pie="innerExpenditureRatio"
          :outer-pie="outerExpenditureRatio"
          width="50%"
        />
        <DoublePie :inner-pie="innerExpenditureRatio" width="50%" />
      </div>
      <div class="down-side">
        <div class="left-side">
          <!-- <v-chart :options="innerExpenditureRatioOption" /> -->
          <p>支出</p>
          <el-table
            :data="queryList"
            stripe
            header-cell-class-name="table-header"
          >
            <el-table-column
              label="本月支出"
              prop="asset_name"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="本月存入"
              prop="asset_type"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="帳戶餘額"
              prop="expected_spend"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="上月餘額"
              prop="expected_spend"
              header-align="center"
              align="right"
            />
          </el-table>
          <p>負債</p>
          <el-table
            :data="queryList"
            stripe
            header-cell-class-name="table-header"
          >
            <el-table-column
              label="本月刷卡金額"
              prop="asset_name"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="本月繳款金額"
              prop="asset_type"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="尚未繳清餘額"
              prop="expected_spend"
              header-align="center"
              align="right"
            />
          </el-table>
        </div>
        <div class="right-side">
          <el-button type="primary" @click="addTempJournalData">新增</el-button>
          <el-table
            :data="journalDataList"
            stripe
            max-height="800"
            header-cell-class-name="table-header"
          >
            <el-table-column label="日期" align="center" width="160">
              <template slot-scope="scope">
                <span v-if="!scope.row.isEditMode">{{
                  scope.row.spend_date | formatDate
                }}</span>
                <el-date-picker
                  v-else
                  v-model="scope.row.spend_date"
                  :picker-options="pickerOptions"
                  type="date"
                  placeholder="選擇日期"
                  class="input-medium"
                />
              </template>
            </el-table-column>
            <el-table-column label="方式" align="center" width="160">
              <template slot-scope="scope">
                <el-select
                  :value="
                    scope.row.spend_way
                      ? scope.row.spend_way +
                        '/' +
                        scope.row.spend_way_type +
                        '/' +
                        scope.row.spend_way_table
                      : null
                  "
                  :disabled="!scope.row.isEditMode"
                  placeholder="請選擇"
                  @change="
                    value => afterSelectedWay(value, scope.row, scope.$index)
                  "
                >
                  <el-option-group
                    v-for="group in spendWaySelectionGroup"
                    :key="group.title"
                    :label="group.name || group.title"
                  >
                    <el-option
                      v-for="(item, index) in group.selections"
                      :key="index"
                      :label="item.value"
                      :value="item.key + '/' + item.type + '/' + item.table"
                    />
                  </el-option-group>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="主選單" align="center" width="160">
              <template slot-scope="scope">
                <el-select
                  :value="
                    scope.row.action_main
                      ? scope.row.action_main +
                        '/' +
                        scope.row.action_main_type +
                        '/' +
                        scope.row.action_main_table
                      : null
                  "
                  :disabled="!scope.row.isEditMode || !scope.row.spend_way"
                  placeholder="請選擇"
                  @change="
                    value => afterSelectedMain(value, scope.row, scope.$index)
                  "
                >
                  <el-option-group
                    v-for="(group, index) in actionMainSelectionGroup(
                      scope.row.spend_way_type !== 'undefined'
                        ? scope.row.spend_way_type
                        : scope.row.spend_way_table
                    )"
                    :key="index"
                    :label="group.name || group.title"
                  >
                    <el-option
                      v-for="item in group.selections"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key + '/' + item.type + '/' + item.table"
                    />
                  </el-option-group>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="副選單" align="center" width="160">
              <template slot-scope="scope">
                <el-select
                  :value="
                    scope.row.action_sub
                      ? scope.row.action_sub + '/' + scope.row.action_sub_table
                      : null
                  "
                  :disabled="!scope.row.isEditMode || !scope.row.action_main"
                  placeholder="請選擇"
                  @change="
                    value => afterSelectedSub(value, scope.row, scope.$index)
                  "
                >
                  <template
                    v-if="
                      scope.row.actionSubSelectionGroup[0] &&
                        scope.row.actionSubSelectionGroup[0].selections
                    "
                  >
                    <el-option-group
                      v-for="(group, index) in scope.row
                      .actionSubSelectionGroup"
                      :key="index"
                      :label="group.name || group.title"
                    >
                      <el-option
                        v-for="item in group.selections"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key + '/' + item.table"
                      />
                    </el-option-group>
                  </template>
                  <template v-else>
                    <el-option
                      v-for="item in scope.row.actionSubSelectionGroup"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key + '/'"
                    />
                  </template>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="金額" header-align="center" align="right">
              <template slot-scope="scope">
                <span
                  v-if="!scope.row.isEditMode"
                  :class="[scope.row.spending > 0 ? 'positive' : 'negative']"
                  class="money"
                >
                  {{ scope.row.spending | toThousandFilter }}
                </span>
                <el-input
                  v-else
                  v-model.number="scope.row.spending"
                  autocomplete="off"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="備註"
              prop="asset_index"
              header-align="center"
              width="400"
            >
              <template slot-scope="scope">
                <span v-if="!scope.row.isEditMode">{{ scope.row.note }}</span>
                <el-input v-else v-model="scope.row.note" autocomplete="off" />
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150"
              align="center"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.isEditMode">
                  <el-button
                    type="success"
                    size="small"
                    @click="scope.row.isEditMode = true"
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteJournal(scope.row.distinct_number)"
                  >
                    刪除
                  </el-button>
                </div>
                <div v-else>
                  <el-button
                    type="success"
                    size="small"
                    @click="handelDataSummit(scope.row)"
                  >
                    儲存
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="cancelEdit(scope.$index)"
                  >
                    取消
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

import DoublePie from '@/components/Charts/DoublePieChart'

import {
  getCreditCardSelectionGroups,
  getCodeSelectionGroups,
  getInsuranceSelectionGroups,
  getLoanSelectionGroups,
  getSubCodeSelectionGroups,
  getWalletSelectionGroups
} from '@/api/util'
import { financialBehavior, otherAssetType } from '@/assets/commonData/global'
import { getMappingName } from '@/utils/codeMapping'

export default {
  name: 'CashFlow',
  components: {
    DoublePie
  },
  data() {
    return {
      otherAssetGroup: {
        title: '其他資產',
        selections: otherAssetType
      },
      thisMonth: null,
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      queryList: [],
      accountSelectionGroups: [],
      creditCardSelectionList: [],
      loanSelectionGroups: [],
      codeSelectionGroups: [],
      spendWaySelectionGroup: [],
      journalDataList: [],
      innerExpenditureRatio: [],
      outerExpenditureRatio: []
    }
  },
  computed: {
    ...mapState({
      journalListSource: state => state.monthlyReport.cashFlow.journalDataList
    })
  },
  created() {
    this.thisMonth = moment().format('YYYYMM')
    this.getSpendWaySelectionList()
    this.getActionMainSelectionList()
  },
  mounted() {
    // 如果等畫面都準備好才撈資料，下拉選單還是無法即時呈現就要再做處理
    this.fetchData(this.thisMonth)
  },
  methods: {
    disabledDate(time) {
      return (
        moment(time).format('YYYYMM') < this.thisMonth ||
        moment(time).format('YYYYMM') > this.thisMonth
      )
    },
    fetchData(val) {
      this.$store.dispatch('GetJournalListByVestingMonth', val).then(() => {
        this.processDataList()
      })
      this.$store
        .dispatch('GetExpenditureRatioByVestingMonth', val)
        .then(response => {
          response.data.innerPie.forEach(item => {
            item.name = getMappingName('code_type', item.name)
          })
          response.data.outerPie.forEach(item => {
            item.type = getMappingName('code_type', item.type)
          })
          this.innerExpenditureRatio = response.data.innerPie
          this.outerExpenditureRatio = response.data.outerPie
        })
    },
    async processDataList() {
      this.journalDataList = []
      for (const item of this.journalListSource) {
        const temp = JSON.parse(JSON.stringify(item))

        temp.actionSubSelectionGroup = await this.getSubSelectionGroup(
          temp.action_main,
          temp.action_main_table,
          temp
        )

        this.journalDataList.push(temp)
      }
    },
    addTempJournalData() {
      this.journalDataList.push({
        distinct_number: this.journalDataList.length + 1,
        vesting_month: this.thisMonth,
        spend_date: null,
        spend_way: null,
        spend_way_table: null,
        action_main: null,
        action_sub: null,
        action_sub_table: null,
        spending: null,
        note: null,
        isEditMode: true,
        actionSubSelectionGroup: []
      })
    },
    getSpendWaySelectionList() {
      this.spendWaySelectionGroup.push(this.otherAssetGroup)

      getWalletSelectionGroups().then(response => {
        response.data.forEach(element => {
          element.name = getMappingName('account_type', element.title)
        })
        this.accountSelectionGroups = response.data
        this.spendWaySelectionGroup = this.spendWaySelectionGroup.concat(
          response.data
        )
      })

      getCreditCardSelectionGroups().then(response => {
        this.creditCardSelectionList = response.data
        this.spendWaySelectionGroup = this.spendWaySelectionGroup.concat(
          response.data
        )
      })

      getLoanSelectionGroups().then(response => {
        this.loanSelectionGroups = response.data
        this.spendWaySelectionGroup = this.spendWaySelectionGroup.concat(
          response.data
        )
      })
    },
    getActionMainSelectionList() {
      getCodeSelectionGroups().then(response => {
        response.data.forEach(element => {
          element.name = getMappingName('code_type', element.title)
        })
        this.codeSelectionGroups = response.data
      })
    },
    actionMainSelectionGroup(type) {
      let returnValue = []

      if (type !== 'Asset') {
        returnValue = returnValue.concat(this.codeSelectionGroups)
      }

      if (type === 'cash' || type === 'Credit_Card') {
        // 沒有被動收入
        returnValue = returnValue.filter(item => item.title !== 'Passive')
      } else if (type === 'eWallet' || type === 'gift') {
        // 沒有主動/被動收入
        returnValue = returnValue.filter(
          item => item.title !== 'Income' && item.title !== 'Passive'
        )
      }

      const concatTarget = {
        title: '金融行為',
        selections: null
      }

      if (type === 'cash') {
        // 現金沒有存/提操作
        concatTarget.selections = financialBehavior.filter(
          item => item.key !== 'Transfer'
        )
      } else if (
        type === 'Credit_Card' ||
        type === 'eWallet' ||
        type === 'gift' ||
        type === 'Asset'
      ) {
        // 沒有繳信用卡/繳貸款操作
        concatTarget.selections = financialBehavior.filter(
          item =>
            item.key !== 'CreditCardRepayment' && item.key !== 'LoanRepayment'
        )

        //  沒有繳保費操作
        if (type === 'eWallet' || type === 'gift' || type === 'Asset') {
          concatTarget.selections = concatTarget.selections.filter(
            item => item.key !== 'Premiums'
          )
        }
      } else {
        concatTarget.selections = financialBehavior
      }

      if (concatTarget.selections && concatTarget.selections.length > 0) {
        returnValue.push(concatTarget)
      }

      return returnValue
    },
    afterSelectedWay(value, rawData, index) {
      rawData.action_main = ''
      rawData.action_main_table = ''
      rawData.action_sub = ''
      rawData.action_sub_table = ''

      const valueToArray = value.split('/')
      rawData.spend_way = valueToArray[0]
      rawData.spend_way_type = valueToArray[1]
      rawData.spend_way_table = valueToArray[2]
      this.journalDataList[index] = rawData
    },
    async afterSelectedMain(value, rawData, index) {
      rawData.action_sub = ''
      rawData.action_sub_table = ''

      const valueToArray = value.split('/')
      rawData.action_main = valueToArray[0]
      rawData.action_main_type = valueToArray[1]
      rawData.action_main_table = valueToArray[2]
      rawData.actionSubSelectionGroup = await this.getSubSelectionGroup(
        valueToArray[0],
        valueToArray[2],
        rawData
      )

      this.journalDataList[index] = rawData
    },
    async getSubSelectionGroup(parent_id, table, row) {
      let returnValue = null
      // 不知為何動態生成無法監聽變化，暫存入各資料內取
      switch (table) {
        // case 'Asset':
        //   returnValue = otherAssetType
        //   break

        case 'Code':
          await getSubCodeSelectionGroups(parent_id).then(response => {
            returnValue = response.data
          })

          break

        case 'Account':
          if (
            row.spend_way_type === 'normal' ||
            row.spend_way_type === 'finance'
          ) {
            this.accountSelectionGroups.push(this.otherAssetGroup)
          } else if (row.spend_way_type === 'cash') {
            this.otherAssetGroup.selections = this.otherAssetGroup.selections.filter(
              item => item.key !== 'Stock'
            )
            this.accountSelectionGroups.push(this.otherAssetGroup)
          }

          returnValue = this.accountSelectionGroups
          break

        case 'CreditCard':
          returnValue = this.creditCardSelectionList
          break

        case 'Loan':
          returnValue = this.loanSelectionGroups
          break

        case 'Insurance':
          await getInsuranceSelectionGroups().then(response => {
            returnValue = response.data
          })
          break
      }

      return returnValue
    },
    afterSelectedSub(value, rawData, index) {
      const valueToArray = value.split('/')
      rawData.action_sub = valueToArray[0]
      rawData.action_sub_table = valueToArray[1]
      this.journalDataList[index] = rawData
    },
    handelDataSummit(data) {
      let result = null

      delete data.actionSubSelectionGroup
      if (
        this.journalListSource.some(
          item => item.distinct_number === data.distinct_number
        )
      ) {
        result = this.$store.dispatch('UpdateJournalData', data)
      } else result = this.$store.dispatch('AddJournalData', data)

      result.then(data => {
        this.processDataList()
      })
    },
    deleteJournal(id) {
      this.$confirm('確定要刪除嗎？', '', {
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      })
        .then(async() => {
          await this.$store.dispatch('DeleteJournalData', id)
          this.processDataList()
        })

        .catch(() => {})
    },
    async cancelEdit(index) {
      const temp = JSON.parse(JSON.stringify(this.journalListSource[index]))

      temp.actionSubSelectionGroup = await this.getSubSelectionGroup(
        temp.action_main,
        temp.action_main_table,
        temp
      )
      this.journalDataList[index] = Object.assign(
        this.journalDataList[index],
        temp
      )
    },
    closeAccounts() {
      this.$store.dispatch('SetMonthlySummary', this.thisMonth)
    }
  }
}
</script>

<style lang="scss" scoped>
.cash-flow {
  .main-content {
    .up-side {
      display: flex;
      padding-top: 10px;
    }

    .down-side {
      display: flex;

      .left-side {
        width: 30%;
        padding-right: 10px;
        padding-top: 5px;
      }

      .right-side {
        width: 70%;
        padding-left: 10px;
        padding-top: 10px;
        text-align: right;

        .money {
          letter-spacing: 1px;
          font-weight: bold;

          &.positive {
            color: #409eff;
          }

          &.negative {
            color: #f56c6c;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.cash-flow {
  .el-input {
    &.is-disabled {
      .el-input__inner {
        color: #5b5b5b;
      }
    }
  }
}
</style>
