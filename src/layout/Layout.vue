<template>
  <el-container class="layout">
    <el-header :style="getHeaderStyle()">
      <Header></Header>
    </el-header>
    <el-container class="container" style="getContainerStyle()">
      <AppMain />
    </el-container>
    <ModalAll />
  </el-container>
</template>

<script>
import screenfull from 'screenfull'
import Header from './header/Header.vue'
import AppMain from './appMain/AppMain.vue'
import ModalAll from '../views/modalAll/index.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    AppMain,
    ModalAll,
  },
  data() {
    return {
      isFullScreen: false,
      headerHeight: 60,
    }
  },
  computed: {},
  methods: {
    fullScreen() {
      screenfull.toggle()
      this.isFullScreen = !this.isFullScreen
    },

    getContainerStyle() {
      return `height: calc((100% - ${this.headerHeight}px)`
    },

    getHeaderStyle() {
      return `height: ${this.headerHeight}px`
    },
  },
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  background-color: @background-color-layout;
}
.el-header {
  padding: 0;
}
.container {
  height: calc(100% - 115px);
}
</style>
