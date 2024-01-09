<template>
  <div class="header">
    <!-- <img src="@/assets/image/header-bg.png" class="header-img" /> -->
    <div class="system-name-wrap gradient-text">{{ systemName }}</div>
    <system-menus class="header-menus"></system-menus>
  </div>
</template>

<script>
import configData from '@/utils/config'
import SystemMenus from './components/SystemMenus.vue'

export default {
  name: 'Header',
  data() {
    return {
      systemName: configData.systemName,
    }
  },
  methods: {},
  components: {
    SystemMenus,
  },
}
</script>

<style scoped lang="less">
.header {
  text-align: center;
  width: 100%;
  height: calc(100% - 10px);
  position: relative;
  // padding: 0 0 10px;
  display: flex;
  justify-content: center;
  background-image: url(../../assets/image/header-bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: @font-color-light;

  .header-img {
    width: 100%;
    height: calc(100% - 10px);
    position: absolute;
    top: 0;
    left: 0;
  }
  .system-name-wrap {
    line-height: 46px;
    position: relative;
    color: transparent !important;
    background-clip: text !important;
    font-family: @font-family;
    font-size: 24px;
    background-image: linear-gradient(to bottom, @font-color-theme-light, @font-color-light) !important;
  }
  .header-menus {
    position: absolute;
    right: 10px;
    line-height: 40px;
  }
  .menus-button-wrap:hover {
    color: @base-theme-color;
  }

  .system-menus {
    .el-menu--horizontal > .el-submenu .el-submenu__title {
      i,
      .icon {
        color: @font-color-light;
      }
    }

    .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
      i,
      .icon {
        color: @base-theme-color;
      }
    }
  }
  .gradient-text {
    background: linear-gradient(@font-color-theme-light 28%, @font-color-light 50%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
