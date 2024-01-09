<template>
  <div class="panel-layout float-panel-layout">
    <div class="bottom-layer">
      <slot></slot>
    </div>
    <div class="top-layer">
      <splitpanes class="default-theme" @resize="onResize">
        <pane class="left-side" v-if="$slots.left" :size="leftWidth">
          <header v-if="$slots['left-title']" class="side-header">
            <div class="side-header-content"><slot name="left-title"></slot></div>
          </header>
          <aside class="aside">
            <i v-show="!isCollapseLeft" :title="isShowToggleTitle ? '收缩左侧边栏' : ''" class="collapse-icon el-icon-d-arrow-left" @click="onToggleLeft"></i>
            <i v-show="isCollapseLeft" :title="isShowToggleTitle ? '展开左侧边栏' : ''" class="unfold-icon el-icon-d-arrow-right" @click="onToggleLeft"></i>
          </aside>
          <nav class="side-nav">
            <slot name="left"></slot>
          </nav>
        </pane>
        <pane class="main" :size="mainWidth"> </pane>
        <pane class="right-side" v-if="$slots.right" :size="rightWidth">
          <header v-if="$slots['right-title']" class="side-header">
            <div class="side-header-content"><slot name="right-title"></slot></div>
          </header>
          <aside class="aside">
            <i
              v-show="!isCollapseRight"
              :title="isShowToggleTitle ? '收缩右侧边栏' : ''"
              class="collapse-icon el-icon-d-arrow-right"
              @click="onToggleRight"
            ></i>
            <i v-show="isCollapseRight" :title="isShowToggleTitle ? '展开右侧边栏' : ''" class="unfold-icon el-icon-d-arrow-left" @click="onToggleRight"></i>
          </aside>
          <nav class="side-nav">
            <slot name="right"></slot>
          </nav>
        </pane>
      </splitpanes>
    </div>
  </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
export default {
  name: 'FloatPanelLayout',
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
      this.leftWidth = this.defaultCollapseLeft ? 0 : this.defaultLeftWidth
      this.isCollapseLeft = this.defaultCollapseLeft
      this.splitPaneKey.push('leftWidth')
    }
    this.splitPaneKey.push('mainWidth')
    if (this.$slots.right) {
      this.rightWidth = this.defaultCollapseRight ? 0 : this.defaultRightWidth
      this.isCollapseRight = this.defaultCollapseRight
      this.splitPaneKey.push('rightWidth')
    }
    this.onComputeSize()
  },
  methods: {
    test() {
      alert('ddd')
    },
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
.float-panel-layout {
  position: relative;
  width: 100%;
  height: 100%;
  .bottom-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .top-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    pointer-events: none;
    ::v-deep {
      .left-side,
      .right-side,
      .splitpanes__splitter {
        pointer-events: auto;
      }
      .splitpanes__splitter {
        border: none;
      }
      .main {
        pointer-events: none;
      }
    }
  }
}
</style>
