<template>
  <div class="page cash-flow">
    <span class="float-left">
      本月損益：
      <span :class="[gainLoss >= 0 ? 'positive' : 'negative']" class="money">
        {{ gainLoss }}
      </span>
    </span>
    <div class="position-right">
      <el-date-picker
        v-model="thisMonth"
        type="month"
        value-format="yyyyMM"
        placeholder="選擇月"
        @change="fetchData"
      />
      <el-button type="danger" @click="closeAccounts"> 關帳 </el-button>
    </div>
    <div class="main-content">
      <div class="up-side">
        <DoublePie
          v-if="
            innerExpenditureRatio.length > 0 && outerExpenditureRatio.length > 0
          "
          :inner-pie="innerExpenditureRatio"
          :outer-pie="outerExpenditureRatio"
          default-inner-title="收支比"
          default-outer-title="固定支出"
          width="50%"
        />
        <div v-else class="no-data">尚無消費行為</div>
        <MutiBarChart
          v-if="assetRecordList.length > 0"
          :input-list="assetRecordList"
          width="50%"
        />
        <div v-else class="no-data">尚無資產異動行為</div>
      </div>
      <div class="down-side">
        <div class="left-side">
          <p>支出預算</p>
          <el-table
            :data="expenditureBudget"
            :span-method="processBudgetTypeSpan"
            stripe
            show-summary
            sum-text="合計"
            header-cell-class-name="table-header"
          >
            <el-table-column label="分類" header-align="center" align="center">
              <template slot-scope="scope">
                {{ getMappingName('code_type', scope.row.type) }}
              </template>
            </el-table-column>
            <el-table-column
              label="項目"
              prop="name"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="本月支出"
              prop="spending"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="本月預算"
              prop="budget"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="餘額"
              prop="quota"
              header-align="center"
              align="right"
            >
              <template slot-scope="scope">
                <span :class="{ negative: scope.row.quota > 0 }" class="money">
                  {{ scope.row.quota | toThousandFilter }}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <p>負債增減</p>
          <el-table
            :data="liabilities"
            :span-method="processLiabilityTypeSpan"
            header-cell-class-name="table-header"
            show-summary
            sum-text="合計"
          >
            <el-table-column label="分類" header-align="center" align="center">
              <template slot-scope="scope">
                {{ getMappingName('code_type', scope.row.type) }}
              </template>
            </el-table-column>
            <el-table-column
              label="項目"
              prop="name"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="本月新增金額"
              prop="spending"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="本月繳款金額"
              prop="payment"
              header-align="center"
              align="right"
            />
            <el-table-column
              label="尚未繳清餘額"
              prop="balance"
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
                  :default-value="getDefaultDate"
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
                    (value) => afterSelectedWay(value, scope.row, scope.$index)
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
                    (value) => afterSelectedMain(value, scope.row, scope.$index)
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
                      ? scope.row.action_sub +
                        '/' +
                        scope.row.action_sub_type +
                        '/' +
                        scope.row.action_sub_table
                      : null
                  "
                  :disabled="!scope.row.isEditMode || !scope.row.action_main"
                  placeholder="請選擇"
                  @change="
                    (value) => afterSelectedSub(value, scope.row, scope.$index)
                  "
                >
                  <template
                    v-if="
                      scope.row.actionSubSelectionGroup &&
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
                        :value="item.key + '/' + item.type + '/' + item.table"
                      />
                    </el-option-group>
                  </template>
                  <template v-else>
                    <el-option
                      v-for="item in scope.row.actionSubSelectionGroup"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key + '/' + '/'"
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
                <el-input
                  v-else
                  v-model="scope.row.note"
                  placeholder="如為換匯，務必寫上匯率"
                  autocomplete="off"
                />
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
import MutiBarChart from '@/components/Charts/MutiBarChart'

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
    DoublePie,
    MutiBarChart
  },
  data() {
    return {
      otherAssetGroup: {
        title: '其他資產',
        selections: otherAssetType
      },
      thisMonth: null,
      gainLoss: 0,
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
      outerExpenditureRatio: [],
      // innerAssetRatio: [],
      // outerAssetRatio: [],
      assetRecordList: [],
      expenditureBudget: [],
      liabilities: []
    }
  },
  computed: {
    ...mapState({
      journalListSource: (state) => state.monthlyReport.cashFlow.journalDataList
    }),
    getBugetTypeNumber() {
      // 因目前只有兩種支出，所以找出第一種支出數量就可以
      return this.expenditureBudget.filter(
        (item) => item.type === this.expenditureBudget[0].type
      ).length
    },
    getLiabilityTypeNumber() {
      // 因目前只有兩種負債，所以找出第一種負債數量就可以
      return this.liabilities.filter(
        (item) => item.type === this.liabilities[0].type
      ).length
    },
    getDefaultDate() {
      return new Date(
        `${this.thisMonth.substr(0, 4)}/${this.thisMonth.substr(4, 2)}/01`
      )
    }
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
    getMappingName,
    disabledDate(time) {
      return (
        moment(time).format('YYYYMM') < this.thisMonth ||
        moment(time).format('YYYYMM') > this.thisMonth
      )
    },
    fetchData(val) {
      this.$store
        .dispatch('GetJournalListByVestingMonth', val)
        .then((response) => {
          this.gainLoss = response
          this.processDataList()
        })
      this.$store
        .dispatch('GetExpenditureRatioByVestingMonth', val)
        .then((response) => {
          response.data.expendingInnerPie.forEach((item) => {
            item.name = getMappingName('code_type', item.name)
          })
          response.data.expendingOuterPie.forEach((item) => {
            item.type = getMappingName('code_type', item.type)
          })
          this.innerExpenditureRatio = response.data.expendingInnerPie
          this.outerExpenditureRatio = response.data.expendingOuterPie
        })

      this.$store
        .dispatch('GetInvestRatioByVestingMonth', val)
        .then((response) => {
          this.assetRecordList = response.data
          // this.innerAssetRatio = response.data.assetInnerPie
          // response.data.assetOuterPie.forEach((item) => {
          //   item.name = getMappingName('asset_type', item.name)
          // })
          // this.outerAssetRatio = response.data.assetOuterPie
        })

      this.$store
        .dispatch('GetExpenditureBudgetByVestingMonth', val)
        .then((response) => {
          this.expenditureBudget = response.data
        })

      this.$store
        .dispatch('GetLiabilitiesByVestingMonth', val)
        .then((response) => {
          this.liabilities = response.data
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

      getWalletSelectionGroups().then((response) => {
        response.data.forEach((element) => {
          element.name = getMappingName('account_type', element.title)
        })
        this.accountSelectionGroups = response.data
        this.spendWaySelectionGroup = this.spendWaySelectionGroup.concat(
          response.data
        )
      })

      getCreditCardSelectionGroups().then((response) => {
        this.creditCardSelectionList = response.data
        this.spendWaySelectionGroup = this.spendWaySelectionGroup.concat(
          response.data
        )
      })

      getLoanSelectionGroups().then((response) => {
        this.loanSelectionGroups = response.data
        if (response.data.length > 0) {
          this.spendWaySelectionGroup = this.spendWaySelectionGroup.concat(
            response.data
          )
        }
      })
    },
    getActionMainSelectionList() {
      getCodeSelectionGroups().then((response) => {
        response.data.forEach((element) => {
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
        returnValue = returnValue.filter((item) => item.title !== 'Passive')
      } else if (type === 'eWallet' || type === 'gift') {
        // 沒有主動/被動收入
        returnValue = returnValue.filter(
          (item) => item.title !== 'Income' && item.title !== 'Passive'
        )
      }

      const concatTarget = {
        title: '金融行為',
        selections: null
      }

      if (type === 'cash') {
        // 現金沒有存/提操作
        concatTarget.selections = financialBehavior.filter(
          (item) => item.key !== 'Transfer'
        )
      } else if (
        type === 'Credit_Card' ||
        type === 'eWallet' ||
        type === 'gift' ||
        type === 'Asset'
      ) {
        // 沒有繳信用卡/繳貸款操作
        concatTarget.selections = financialBehavior.filter(
          (item) =>
            item.key !== 'CreditCardRepayment' && item.key !== 'LoanRepayment'
        )

        //  沒有繳保費操作
        if (type === 'eWallet' || type === 'gift' || type === 'Asset') {
          concatTarget.selections = concatTarget.selections.filter(
            (item) => item.key !== 'Premiums'
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
      rawData.action_main_type = ''
      rawData.action_main_table = ''
      rawData.action_sub = ''
      rawData.action_sub_type = ''
      rawData.action_sub_table = ''

      const valueToArray = value.split('/')
      rawData.spend_way = valueToArray[0]
      rawData.spend_way_type = valueToArray[1]
      rawData.spend_way_table = valueToArray[2]
      this.journalDataList[index] = rawData
    },
    async afterSelectedMain(value, rawData, index) {
      rawData.action_sub = ''
      rawData.action_sub_type = ''
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
      // 因 asnyc 只能回 promise，暫存入各資料內取
      switch (table) {
        // case 'Asset':
        //   returnValue = otherAssetType
        //   break

        case 'Code':
          await getSubCodeSelectionGroups(parent_id).then((response) => {
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
            this.otherAssetGroup.selections =
              this.otherAssetGroup.selections.filter(
                (item) => item.key !== 'Stock'
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
          await getInsuranceSelectionGroups().then((response) => {
            returnValue = response.data
          })
          break
      }

      return returnValue
    },
    afterSelectedSub(value, rawData, index) {
      const valueToArray = value.split('/')
      rawData.action_sub = valueToArray[0]
      rawData.action_sub_type = valueToArray[1]
      rawData.action_sub_table = valueToArray[2]
      this.journalDataList[index] = rawData
    },
    handelDataSummit(data) {
      let result = null

      delete data.actionSubSelectionGroup
      if (
        this.journalListSource.some(
          (item) => item.distinct_number === data.distinct_number
        )
      ) {
        data.spend_date = moment(`${data.spend_date} UTC`)
        result = this.$store.dispatch('UpdateJournalData', data)
      } else result = this.$store.dispatch('AddJournalData', data)

      result.then(() => {
        this.fetchData(this.thisMonth)
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
    },
    processBudgetTypeSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.getBugetTypeNumber,
            colspan: 1
          }
        } else if (rowIndex === this.getBugetTypeNumber) {
          return {
            rowspan: this.expenditureBudget.length - this.getBugetTypeNumber,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    processLiabilityTypeSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.getLiabilityTypeNumber,
            colspan: 1
          }
        } else if (rowIndex === this.getLiabilityTypeNumber) {
          return {
            rowspan: this.liabilities.length - this.getLiabilityTypeNumber,
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cash-flow {
  /deep/.el-input {
    &.is-disabled {
      .el-input__inner {
        color: #5b5b5b;
      }
    }
  }

  .main-content {
    .up-side {
      min-height: 100px;
      display: flex;
      padding-top: 10px;

      .no-data {
        width: 50%;
        height: 100%;
        text-align: center;
        margin: auto;
      }
    }

    .down-side {
      display: flex;

      .left-side {
        width: 35%;
        padding-right: 10px;
        padding-top: 5px;
      }

      .right-side {
        width: 65%;
        padding-left: 10px;
        padding-top: 10px;
        text-align: right;
      }
    }
  }
}
</style>
