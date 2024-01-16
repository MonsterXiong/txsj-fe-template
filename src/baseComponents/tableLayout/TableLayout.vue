<template>
  <div class="table-layout-container">
    <template v-if="$slots.query">
      <div class="query-wrapper">
        <BaseFitImg :url="require('@/assets/image/queryBg.png')" class="queryBg"></BaseFitImg>
        <div style="position: relative; height: 100%; display: flex; align-items: center">
          <slot name="query"></slot>
        </div>
      </div>
    </template>
    <div class="content-wrapper" :style="{ height: $slots.query ? 'calc(100% - 88px)' : 'calc(100% - 0px)' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.table-layout-container {
  height: 100%;
  background: white;
  padding: 0 10px;
  .query-wrapper {
    padding: 0 20px;
    margin-top: 10px;
    height: 78px;
    width: 100%;
    position: relative;
  }
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
  .content-wrapper {
    // height: calc(100% - 30px);
    width: 100%;
    padding: 10px 0px;
    overflow-y: auto;
  }
}
</style>
