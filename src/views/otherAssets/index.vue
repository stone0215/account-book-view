<template>
  <el-tabs v-model="activeTab" class="page">
    <el-tab-pane
      v-for="(item, index) in itemList"
      :key="index"
      :label="item.asset_name"
      :name="item.asset_name"
    >
      <component
        :is="getComponentName(item.asset_type)"
        :asset-id="item.asset_id"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
import InsurenceContent from './Insurance/index'
import StockContent from './Stock/index'

export default {
  name: 'OtherAssetsDetail',
  components: { InsurenceContent, StockContent },
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    ...mapState({
      itemList: state => state.otherAssets.otherAssets.itemList
    })
  },
  created() {
    this.$store.dispatch('GetOtherAssetItems').then(() => {
      this.activeTab = this.itemList[0].asset_name
    })
  },
  methods: {
    getComponentName(type) {
      switch (type) {
        case 'Stock':
          return 'StockContent'
        case 'Insurence':
          return 'InsurenceContent'
      }
    }
  }
}
</script>
