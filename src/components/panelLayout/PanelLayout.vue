<template>
  <splitpanes class="panel-layout" :class="{ absolute }" @resize="onResize">
    <pane :maxSize="showLeftPanel ? 100 : 0" class="left-side" :style="{ width: `${leftWidth}%` }" v-if="$slots.left" :size="leftWidth">
      <header v-if="$slots['left-title']" class="side-header">
        <div class="side-header-content"><slot name="left-title"></slot></div>
      </header>
      <aside class="aside" v-show="showLeftPanel">
        <i v-show="!isCollapseLeft" :title="isShowToggleTitle ? '收缩左侧边栏' : ''" class="collapse-icon el-icon-d-arrow-left" @click="onToggleLeft"></i>
        <i v-show="isCollapseLeft" :title="isShowToggleTitle ? '展开左侧边栏' : ''" class="unfold-icon el-icon-d-arrow-right" @click="onToggleLeft"></i>
      </aside>
      <nav class="side-nav">
        <slot name="left"></slot>
      </nav>
    </pane>
    <pane class="main" :size="mainWidth">
      <slot></slot>
    </pane>
    <pane :maxSize="showRightPanel ? 100 : 0" class="right-side" :style="{ width: `${rightWidth}%` }" v-if="$slots.right" :size="rightWidth">
      <header v-if="$slots['right-title']" class="side-header">
        <div class="side-header-content"><slot name="right-title"></slot></div>
      </header>
      <aside class="aside" v-show="showRightPanel">
        <i v-show="!isCollapseRight" :title="isShowToggleTitle ? '收缩右侧边栏' : ''" class="collapse-icon el-icon-d-arrow-right" @click="onToggleRight"></i>
        <i v-show="isCollapseRight" :title="isShowToggleTitle ? '展开右侧边栏' : ''" class="unfold-icon el-icon-d-arrow-left" @click="onToggleRight"></i>
      </aside>
      <nav class="side-nav">
        <slot name="right"></slot>
      </nav>
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
export default {
  components: { Splitpanes, Pane },
  props: {
    // 初始化左侧栏宽度
    defaultLeftWidth: {
      type: Number,
      default: 18,
    },
    // 初始化右侧栏宽度
    defaultRightWidth: {
      type: Number,
      default: 18,
    },
    defaultCollapseLeft: {
      type: Boolean,
      default: false,
    },
    defaultCollapseRight: {
      type: Boolean,
      default: false,
    },
    isShowToggleTitle: {
      type: Boolean,
      default: true,
    },
    // 吸附模式
    absolute: {
      type: Boolean,
      default: false,
    },
    // 是否显示左右侧菜单 如果为false,会完全隐藏
    showLeftPanel: {
      type: Boolean,
      default: true,
    },
    showRightPanel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    this.splitPaneKey = []
    return {
      leftWidth: this.defaultLeftWidth ?? 18,
      mainWidth: 85,
      rightWidth: this.defaultRightWidth ?? 18,
      isCollapseLeft: false,
      isCollapseRight: false,
    }
  },
  created() {
    this.splitPaneKey = []
    this.leftWidth = 0
    this.rightWidth = 0
    if (this.$slots.left) {
      this.leftWidth = this.defaultCollapseLeft || !this.showLeftPanel ? 0 : this.defaultLeftWidth
      this.isCollapseLeft = this.defaultCollapseLeft
      this.splitPaneKey.push('leftWidth')
    }
    this.splitPaneKey.push('mainWidth')
    if (this.$slots.right) {
      this.rightWidth = this.defaultCollapseRight || !this.showRightPanel ? 0 : this.defaultRightWidth
      this.isCollapseRight = this.defaultCollapseRight
      this.splitPaneKey.push('rightWidth')
    }
    this.onComputeSize()
  },
  watch: {
    showLeftPanel(val) {
      this.leftWidth = val && this.$slots.left ? this.defaultLeftWidth : 0
      this.onComputeSize()
    },
    showRightPanel(val) {
      // this.rightWidth = val && this.$slots.right ? this.defaultRightWidth : 0
      this.rightWidth = val ? this.defaultRightWidth : 0
      this.onComputeSize()
    },
  },
  methods: {
    onResize(values) {
      values.forEach((item, index) => {
        this[this.splitPaneKey[index]] = item.size
      })
      this.onComputeSize()
    },
    onToggleLeft() {
      this.isCollapseLeft ? this.onUnfoldLeft() : this.onCollapseLeft()
    },
    onCollapseLeft() {
      this.isCollapseLeft = true
      this.leftWidth = 0
      this.onComputeSize()
    },
    onUnfoldLeft() {
      this.isCollapseLeft = false
      this.leftWidth = this.defaultLeftWidth
      this.onComputeSize()
    },
    onToggleRight() {
      this.isCollapseRight ? this.onUnfoldRight() : this.onCollapseRight()
    },
    onCollapseRight() {
      this.isCollapseRight = true
      this.rightWidth = 0
      this.onComputeSize()
    },
    onUnfoldRight() {
      this.isCollapseRight = false
      this.rightWidth = this.defaultRightWidth
      this.onComputeSize()
    },
    // 重新计算大小 以及是否收缩的状态
    onComputeSize() {
      this.isCollapseLeft = this.leftWidth == 0
      this.isCollapseRight = this.rightWidth == 0
      this.mainWidth = 100 - this.leftWidth - this.rightWidth
    },
  },
}
</script>

<style scoped lang="less">
@import './panel-layout.less';
.panel-layout.absolute {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
.panel-layout {
  ::v-deep {
    > .splitpanes__splitter {
      position: relative;
      width: 1px !important;
      border: none;
      pointer-events: initial;

      &::before {
        content: '';
        position: absolute;
        z-index: 10;
        left: 0px;
        height: 100%;
        width: 8px;
        background: transparent;
        pointer-events: initial;
      }
    }
  }
}
</style>
