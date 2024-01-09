<template>
  <div v-if="menuItem.children">
    <template v-if="!menuItem.children.length">
      <el-menu-item :index="menuItem.id" @click="onMenuClick(menuItem)" class="menu-item-menus">
        <span :class="['iconfont', menuItem.icon ? menuItem.icon : 'icon-wenjian']" class="inline-icon" />
        <span slot="title">{{ menuItem.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="menuItem.id" :class="menuItem.children && menuItem.children.length ? 'submenu-menus' : ''">
      <template slot="title">
        <div :class="menuItem.menusClass ? 'menu-item-menus' : ''">
          <span :class="['iconfont', menuItem.icon ? menuItem.icon : 'icon-wenjian']" class="inline-icon" />
          <span slot="title">{{ menuItem.title }}</span>
        </div>
      </template>
      <template v-for="childMenu in menuItem.children">
        <MenuBarItem v-if="childMenu.children && childMenu.children.length" :menuItem="childMenu" :key="childMenu.id" />
        <el-menu-item
          :class="childMenu.id"
          class="header-el-menu-item"
          v-else
          :key="childMenu.id + 'else'"
          :index="childMenu.id"
          @click="onMenuClick(childMenu)"
        >
          <span :class="['iconfont', childMenu.icon ? childMenu.icon : 'icon-wenjian']" class="inline-icon" />
          <span slot="title">{{ childMenu.title }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { handleNavMenuClick } from '@/utils/navMenuUtil'
export default {
  name: 'MenuBarItem',
  props: {
    menuItem: { type: Object, required: true },
  },
  methods: {
    onMenuClick(menu) {
      handleNavMenuClick(menu)
    },
  },
}
</script>

<style lang="less" scoped>
.menu-item-menus {
  span {
    font-size: 16px;
  }
  .el-submenu__title {
    border: 1px solid red;
  }
}
</style>
