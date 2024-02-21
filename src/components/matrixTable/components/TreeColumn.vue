<template>
  <el-table-column :label="data.name" align="center" :prop="data.id" :class-name="isVertical ? 'vertical' : ''" :width="isVertical ? '35px' : ''">
    <template v-if="data.children && Array.isArray(data.children)">
      <tree-column :vertical="vertical" v-for="item in data.children" :data="item" :key="item.id">
        <template slot-scope="{ row, column }">
          <slot :row="row" :column="column"></slot>
        </template>
      </tree-column>
    </template>
    <template slot-scope="{ row, column }">
      <slot :row="row" :column="column"></slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'TreeColumn',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    vertical: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    isVertical() {
      if (this.data.children && Array.isArray(this.data.children) && this.data.children.length) {
        return false
      }
      return this.vertical
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="less"></style>
