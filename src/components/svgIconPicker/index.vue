<template>
  <div class="svg-icon-picker">
    <div class="tag-container">
      <el-tag :type="activeGroup === item.code ? '' : 'info'" v-for="item in groupList" :key="item.code" @click="handleTag(item.code)">{{ item.label }}</el-tag>
    </div>
    <ul>
      <li v-for="svgItem in listByType" :key="svgItem.key" @click="handleClick(svgItem)" :class="{ active: activeItem && activeItem.key == svgItem.key }">
        <base-icon :iconName="svgItem.value" style="width: 24px; height: 24px"></base-icon>
      </li>
    </ul>
  </div>
</template>

<script>
import { svgList } from './config'
export default {
  name: 'SvgIconPicker',
  props: {
    groupList: {
      type: Array,
      default: () => [{ code: 'all', label: '全部' }],
    },
    svgIcons: {
      type: Array,
      default: () => svgList,
    },
  },
  data() {
    return {
      activeItem: null,
      activeGroup: 'all',
      listByType: [],
    }
  },
  mounted() {
    this.listByType = _.cloneDeep(this.svgIcons)
  },
  methods: {
    handleTag(tag) {
      this.activeGroup = tag
      if (tag === 'all') return (this.listByType = this.svgIcons)
      this.listByType = this.svgIcons.filter((item) => item.group === tag)
    },
    handleClick(svgItem) {
      this.activeItem = svgItem
      this.$emit('selected', svgItem)
    },
  },
}
</script>

<style scoped lang="less">
.svg-icon-picker {
  max-height: 400px;
  overflow-y: auto;
  .tag-container {
    .el-tag {
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      padding: 4px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      &:hover {
        transform: scale(1.1);
        cursor: pointer;
      }
      &.active {
        background: rgba(0, 0, 0, 0.35);
      }
    }
  }
}
</style>
