<template>
  <div class="dashboard-editor-container">
    <panel-group
      :period="dateValue"
      :period-type="periodType"
      :summary-obj="summaryObj"
    />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 20px">
      <line-chart
        v-if="summaryObj.assetBalanceChart"
        :chart-data="lineChartData"
        :x-bar="xBar"
        :line-name="['資產', '負債']"
      />
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <mallki class-name="mallki-text" text="提醒" />
          </div>
          <div
            v-for="(item, index) in alarmList"
            :key="index"
            class="text item"
          >
            <div>{{ item.date }}</div>
            <div>{{ item.content }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <box-card />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <el-card class="box-card">
          <div slot="header" class="box-card-header">
            <img src="./components/asset/pic.jpg" >
          </div>
          <div class="conditon">
            <el-date-picker
              v-if="periodType === 'month'"
              v-model="dateValue"
              type="month"
              value-format="yyyyMM"
              placeholder="請選擇"
              @change="fetchData"
            />
            <el-date-picker
              v-else
              v-model="dateValue"
              type="year"
              value-format="yyyy"
              placeholder="請選擇"
              @change="fetchData"
            />
            <el-radio-group v-model="periodType" @change="changePeriod">
              <el-radio-button label="year">年</el-radio-button>
              <el-radio-button label="month">月</el-radio-button>
            </el-radio-group>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'

import Mallki from '@/components/TextHoverEffect/Mallki'
import LineChart from '@/components/Charts/LineChart.vue'

import PanelGroup from './components/PanelGroup'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TodoList,
    BoxCard,
    Mallki
  },
  data() {
    return {
      periodType: 'month',
      dateValue: null,
      summaryObj: {},
      alarmList: []
    }
  },
  computed: {
    xBar() {
      return this.summaryObj.assetBalanceChart.map((item) => item.dateString)
    },
    lineChartData() {
      return {
        firstData: this.summaryObj.assetBalanceChart.map((item) => item.value),
        secondData: this.summaryObj.debtBalanceChart.map((item) => item.value)
      }
    }
  },
  created() {
    this.dateValue = moment().format('YYYYMM')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$store
        .dispatch('GetDashboardSummary', {
          type: this.periodType,
          dateValue: this.dateValue
        })
        .then((response) => {
          this.summaryObj = response.data
        })

      this.$store.dispatch('GetSummaryAlarmList').then((response) => {
        this.alarmList = response.data
      })
    },
    changePeriod(value) {
      if (value === 'year') {
        this.dateValue = moment().format('YYYY')
      } else {
        this.dateValue = moment().format('YYYYMM')
      }

      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px 32px;
  background-color: rgb(240, 242, 245);

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .box-card {
    .box-card-header {
      height: 220px;

      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }

    .conditon {
      text-align: center;
    }
  }

  .text {
    font-size: 16px;

    &.item {
      margin-bottom: 18px;

      div {
        min-width: 60px;
        text-align: left;
        display: inline-block;
      }
    }
  }
}
</style>
