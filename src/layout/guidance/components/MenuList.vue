<template>
  <div class="menu-list">
    <el-menu :default-active="activeMenuId" class="el-menu-vertical-demo" :default-openeds="menuList.map((ele, index) => ele.id)" :collapse-on-click="true">
      <MenuBarItem v-for="item in menuList" :menuItem="item" :key="item.id" />
    </el-menu>
  </div>
</template>

<script>
import { handleNavMenuClick } from '@/utils/navMenuUtil'
import MenuBarItem from './MenuBarItem.vue'
export default {
  components: {
    MenuBarItem,
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    $route: {
      handler: function (newRoute) {
        if (!newRoute) {
          return
        }
        this.setActiveMenu()
      },
      immediate: true,
    },
    menuList: {
      handler() {
        this.setActiveMenu()
      },
      immediate: true,
    },
  },
  data() {
    return {
      activeMenuId: '',
    }
  },
  methods: {
    setActiveMenu() {
      if (!this.$route) return
      const activeMenu = this.menuList.find((menu) => menu.url && (menu.url === this.$route.path || menu.url.split('?')[0] === this.$route.path))
      this.activeMenuId = activeMenu?.id ?? ''
      this.menuList.map((item) => {
        this.$set(item, 'menusClass', true)
      })
    },
    onMenuClick(menu) {
      console.log(menu)
      handleNavMenuClick(menu)
    },
  },
}
</script>

<style lang="less" scoped>
.menu-list {
  .full-container();
  overflow-y: auto;

  .guidance-item-wrapper {
    display: flex;
    padding: 6px 10px;
    align-items: center;
    border: 1px solid transparent;
  }
}
::v-deep {
  .el-menu {
    background: transparent !important;
    border: none;
    padding: 0 !important;
    border: 1px solid transparent;

    .el-submenu__title:hover,
    .el-menu-item:hover {
      // background-image: linear-gradient(to right, #002c6f, #00469a);
      background-image: linear-gradient(to right, @linear-bg-color-dark, @linear-bg-color-light);
      border-color: var(--base-theme-color, #409eff) !important;
    }
    .el-menu-item,
    .el-submenu__title {
      color: #fff !important;
      border: 1px solid transparent;
      background: transparent;
      // padding: 0px !important;
      // padding: 15px 0px !important;
      padding-top: 15px;
      padding-bottom: 15px;
      height: auto !important;
      line-height: 0 !important;
      min-width: 150px !important;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .submenu-menus {
      .el-submenu__title {
        background-image: linear-gradient(to right, @linear-bg-color-dark, @linear-bg-color-light);
        border-image: linear-gradient(to bottom, #1e7ec7, #0f4897) 1 !important;
        // background-image: linear-gradient(to right, #002c6f, #00469a);
      }
    }
    .el-menu-item.is-active {
      background-image: linear-gradient(to right, @linear-bg-color-dark, @linear-bg-color-light);
      // background-image: linear-gradient(to right, #002c6f, #00469a);
      border-color: var(--base-theme-color, #409eff) !important;
    }
    .el-submenu__icon-arrow {
      color: #fff;
    }
    .menu-item-menus {
      font-size: @font-size--middle;
      // background-image: linear-gradient(to right, #002c6f, #00469a);
    }
  }
}
</style>
