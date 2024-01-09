<template>
  <div class="guidance">
    <div class="guidance-title">
      <div class="project-name-wrap">
        <span :class="['iconfont', activeNavMenu?.iconCls]" /> <span>{{ activeNavMenu?.text || '' }}</span>
      </div>
    </div>
    <component :is="curComponent" :menuList="menuList" class="guidance-container" ref="guidanceCurComponentRef"></component>
  </div>
</template>
<script>
import MenuList from './components/MenuList.vue'

export default {
  props: {
    activeNavMenu: {
      type: Object,
      default: null,
    },
  },
  computed: {
    recentOpenProjectIds() {
      return this.$store.getters['project/recentOpenProjectIds']
    },
  },
  watch: {
    activeNavMenu: {
      handler(newVal) {
        this.setData(newVal)
      },
      immediate: true,
    },
    recentOpenProjectIds: {
      handler(val) {},
      immediate: true,
    },
  },
  data() {
    return {
      curComponent: MenuList,
      menuList: [],
      projectName: '请先打开项目',
      curProjectId: '',
    }
  },
  methods: {
    setData(menu) {
      if (menu) {
        if (Array.isArray(menu.children)) {
          this.menuList = menu?.children || []
        } else {
          this.menuList = []
        }
      }
      console.log('this.menuList', this.menuList)
    },
  },
}
</script>

<style lang="less" scoped>
// 目前两个变量只在guidance用到一次，改到guidance内部
@base-light-border-color: #1a538f;
@base-deep-border-color: #1778cb;
.guidance {
  .full-container();
  padding: 12px 0px 20px;
  background-image: url('~@/assets/image/guidance-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  user-select: none;
  color: @font-color;
  .guidance-title {
    font-size: 16px;
    border-bottom: 1px solid @base-light-border-color;
    width: calc(100% - 2px);
    padding: 0 20px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .project-name-wrap {
      width: calc(100% - 28px);
      gap: 4px;
      display: flex;
      align-items: center;
      // .text-ellipsis();
    }
    .location-container {
      cursor: pointer;
      display: flex;
      align-items: center;
      &:nth-of-type(2) {
        margin-left: 5px;
      }
    }
    .location-container:hover {
      color: @base-theme-color;
    }
  }

  .guidance-container {
    height: calc(100% - 30px);
    padding: 10px 10px 0 8px;
  }
  .guidance-item-wrapper.active,
  .guidance-item-wrapper:hover {
    cursor: pointer;
    background-color: @background-color-layout;
    border-color: @base-theme-color;
  }

  // 树 el-tree
  ::v-deep {
    .el-tree {
      background: transparent;
      color: @font-color;

      .el-tree-node__content {
        border: 1px solid transparent;
      }
    }

    .el-tree-node__content:hover,
    .el-upload-list__item:hover {
      background-image: linear-gradient(to right, @linear-bg-color-dark, @linear-bg-color-light);
      border: 1px solid @base-theme-color;
    }

    .el-tree-node:focus > .el-tree-node__content {
      background-color: transparent;
    }

    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background-image: linear-gradient(to right, @linear-bg-color-dark, @linear-bg-color-light);
      border: 1px solid @base-theme-color;
    }

    // button
    .el-input-group__append,
    .el-input-group__prepend {
      background-color: @background-color-layout;
      color: @font-color;
      border-color: @base-deep-border-color;
    }

    .el-input-group__append:hover,
    .el-input-group__prepend:hover {
      background-color: @base-theme-color;
    }
  }

  .width-border-hover:hover {
    border: 1px solid @base-theme-color!important;
    background-image: linear-gradient(to right, @linear-bg-color-dark, @linear-bg-color-light);
  }
}
</style>
