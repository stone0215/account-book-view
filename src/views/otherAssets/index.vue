<template>
  <el-tabs
    v-model="activeTab"
    class="page"
  >
    <el-tab-pane
      v-for="(item, index) in itemList"
      :key="index"
      :label="item.asset_name"
      :name="item.asset_name"
    >
      <component
        :is="getComponentName(item.asset_type)"
        :asset-id="item.asset_id"
        :type="item.asset_type"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
// import StockContent from './StockContentComponent'

export default {
  name: 'OtherAssetsDetail',
  // components: { StockContent },
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    ...mapState({
      itemList: state => state.otherAssets.itemList
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
        case 'S':
          return 'StockContent'
      }
    }
  }
}
</script>

