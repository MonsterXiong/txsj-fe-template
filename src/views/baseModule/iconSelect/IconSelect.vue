<template>
  <div class="icons-container">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="Special Svg" name="first">
        <div class="grid">
          <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons" name="second">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Iconfont Svg" name="third">
        <div class="grid">
          <div v-for="item of iconfont" :key="item.icon" @click="handleClipboard(generateIconfontSvgCode(item.icon), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconfontSvgCode(item.icon) }}
              </div>
              <div class="icon-item">
                <BaseIcon :iconName="'icon-' + item.icon" />
                <span>{{ item.name }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Iconfont Font Class" name="fourth">
        <div class="grid">
          <div v-for="item of iconfont" :key="item.icon" @click="handleClipboard(generateIconfontCode(item.icon), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconfontCode(item.icon) }}
              </div>
              <div class="icon-item">
                <span :class="['iconfont', 'icon-' + item.icon]"></span>
                <span>{{ item.name }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
import iconfont from './iconfont.js'

export default {
  name: 'Icons',
  data() {
    return {
      svgIcons,
      elementIcons,
      iconfont,
      activeTab: 'third',
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    },
    generateIconfontSvgCode(symbol) {
      return `<BaseIcon iconName="icon-${symbol}" />`
    },
    generateIconfontCode(symbol) {
      return `<span class="iconfont icon-${symbol}" />`
    },
  },
}
</script>

<style lang="less" scoped>
.icons-container {
  overflow: hidden;
  height: 100vh;
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    height: 100%;
    overflow: auto;
  }
  ::v-deep {
    .el-tabs {
      height: 100%;
    }
    .el-tabs__content {
      height: 100%;
      overflow: auto;
    }
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: @title-font-size-huge;
    color: @font-color-dark-gray;
    cursor: pointer;
    > span:first-child {
      font-size: @title-font-size-huge;
    }
  }

  span {
    display: block;
    font-size: @font-size--middle;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
