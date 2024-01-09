<template>
  <div class="system-menus">
    <div class="menus-button-wrap" v-for="item in menuList" :key="item.code" @click="onMenuClick(item)" :title="item.text">
      <span :class="['iconfont', item.icon]" v-if="item.icon" />
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'

const MenuCodes = Object.freeze({
  GO_HOME: 'goHome',
  FULL_SCREEN: 'fullScreen',
  SKIN_PILLER: 'skinPiller',
  QUIT: 'quit',
})

export default {
  name: 'SystemMenus',
  data() {
    return {
      menuList: [
        {
          text: '首页',
          code: MenuCodes.GO_HOME,
          icon: 'icon-shouye1',
          handler: this.goHomePage,
          subMenu: [],
        },
        {
          text: '全屏',
          code: MenuCodes.FULL_SCREEN,
          icon: 'icon-quanping',
          handler: this.setFullScreen,
          subMenu: [],
        },
        {
          text: '退出',
          code: MenuCodes.QUIT,
          icon: 'icon-tuichu',
          handler: this.onQuit,
          subMenu: [],
        },
      ], //操作栏按钮
      isFullScreen: false,
    }
  },
  methods: {
    onMenuClick(item) {
      if (item.handler) {
        item.handler()
      }
    },
    goHomePage() {
      this.$router.push('/')
    },
    setFullScreen() {
      // todo 全屏事件
      if (!screenfull.enabled) {
        this.$message('该浏览器不支持全屏功能，请使用其他浏览器')
        return
      } else {
        screenfull.toggle()
        this.isFullScreen = !this.isFullScreen
        this.setFullScreenMenuIcon()
      }
    },
    setFullScreenMenuIcon() {
      const menuItem = this.menuList.find((ele) => ele.code === MenuCodes.FULL_SCREEN)
      if (!menuItem) {
        return
      }
      if (this.isFullScreen) {
        //todo 需要找一下非全屏的icon
        menuItem.icon = 'icon-quanping'
      } else {
        menuItem.icon = 'icon-quanping'
      }
    },
    async onQuit() {
      // 退出登录事件
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirectUrl=${this.$router.currentRoute.fullPath}`)
    },
  },
}
</script>

<style lang="less" scoped>
.system-menus {
  display: flex;
  .menus-button-wrap {
    cursor: pointer;
    margin-right: 20px;
  }
}
::v-deep {
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
    padding: 0px 10px 0 0;
    background: transparent;
    width: 20px;
  }
  .el-submenu {
    width: 20px;
  }
  .el-submenu__title {
    padding: 0px;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 40px;
    line-height: 36px;
    padding: 2px 0 0;
    i {
      width: 20px;
      margin: 0;
    }
    .icon {
      font-size: 18px;
    }
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: transparent;
  }
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: none;
  }
  .el-menu--horizontal {
    .el-menu--popup {
      padding: 0;
    }
  }
}
</style>
