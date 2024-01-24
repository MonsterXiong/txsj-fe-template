<template>
  <div class="side-bar">
    <div class="side-bar-main">
      <div
        v-for="item in navMenuList"
        :key="item.id"
        :class="['side-menu-wrapper', getActiveNavMenuClass(item.id)]"
        @click="onMenuClick(item)"
        :title="item.title"
      >
        <div class="icon-wrap">
          <span :class="['iconfont', item.icon || 'icon--_dakaixiangmu-copy']" />
        </div>
        <div class="side-menu-name">{{ item.title }}</div>
      </div>
    </div>
    <div class="side-bar-togggle" :title="isCollapseGuidance ? '展开' : '收缩'">
      <i :class="[isCollapseGuidance ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']" @click="onToggle" style="font-size: 18px"></i>
    </div>
  </div>
</template>

<script>
import { SettingMutations } from '@/store/modules/setting'
import { mapState } from 'vuex'
import { menuList } from './menuData'
export default {
  data() {
    return {
      navMenuList: [],
      activeNavMenu: null,
      currentActiveMenu: '',
    }
  },

  computed: {
    recentOpenProjectIds() {
      return this.$store.getters['project/recentOpenProjectIds']
    },
    ...mapState('setting', ['isCollapseGuidance']),
  },
  mounted() {
    this.setNavMenuList()
  },
  destroyed() {},
  methods: {
    async setNavMenuList() {
      const menuData = menuList.map((item) => {
        return {
          ...item,
          title: item.name,
          children: item.children?.length ? item.children : [],
        }
      })
      // this.navMenuList = znTool.treeTool.listToTree(menuData, { pidKey: 'parent' })
      this.navMenuList = this.listToTree(menuData, { pidKey: 'parent' })
    },
    getMenuList(menuData) {
      return this.listToTree(menuData, { pidKey: 'parent' })
      // return znTool.treeTool.listToTree(menuData, { pidKey: 'parent' })
    },
    listToTree(list, { idKey = 'id', pidKey = 'parentId', childKey = 'children' } = {}) {
      if (!Array.isArray(list)) {
        return []
      }
      const idMap = {}
      const tree = []
      list.forEach((item) => {
        idMap[item[idKey]] = item
      })
      list.forEach((item) => {
        const parent = idMap[item[pidKey]]
        if (parent) {
          ;(parent[childKey] || (parent[childKey] = [])).push(item)
        } else {
          tree.push(item)
        }
      })
      return tree
    },
    onMenuClick(menu) {
      //重复点击
      if (this.activeNavMenu && menu.id === this.activeNavMenu.id) {
        return
      } else {
        this.activeNavMenu = menu
        this.$emit('navMenuChange', menu)
        this.$store.commit(`setting/${SettingMutations.SET_IS_COLLAPSE_GUIDANCE}`, false)
      }
    },

    onToggle() {
      this.$store.commit(`setting/${SettingMutations.SET_IS_COLLAPSE_GUIDANCE}`, !this.isCollapseGuidance)
    },
    getActiveNavMenuClass(key) {
      let className = ''
      if (this.activeNavMenu) {
        className = key === this.activeNavMenu?.id ? 'side-menu-active' : ''
      }
      return className
    },
  },
}
</script>

<style lang="less" scoped>
.side-bar {
  max-width: 120px;
  min-width: 46px;
  overflow: auto;
  background-image: url('~@/assets/image/sidebar-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .flex-column();
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 15px 14px;
  transition: width 0.1s linear;
  color: @font-color;
  .side-bar-togggle {
    i {
      cursor: pointer;
    }
  }
  .side-bar-main {
    flex: 1;
  }
  .side-search-wrapper {
    .icon-wrap {
      background-color: @border-color-base;
      color: @font-color-dark-gray;
    }
  }

  .side-search-wrapper:hover {
    .icon-wrap {
      color: @font-color;
    }
  }
  .side-menu-wrapper {
    margin-bottom: 20px;
    width: 30px;
    cursor: pointer;
    .icon-wrap {
      height: 30px;
      width: 100%;
      border-radius: 100%;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .side-menu-name {
      text-align: center;
    }
  }
  .side-menu-active {
    .icon-wrap {
      background: @base-theme-color !important;
    }
  }

  .side-menu-active,
  .side-menu-wrapper:hover {
    .icon-wrap {
      background: @base-theme-color;
    }
  }
}
</style>
