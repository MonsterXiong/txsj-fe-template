<template>
  <div id="tags-view-container" class="tags-view-container" v-resize="domResize" v-click-outside="hideDrawer">
    <div class="tags-view-wrapper">
      <router-link
        v-for="(tag, index) in tagsVisitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        draggable
        @dragenter.native="dragenter($event, index)"
        @dragover.native="dragover($event, index)"
        @dragstart.native="dragstart(index)"
        class="tags-view-item"
        :modelId="tag.params.modelId"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
      <div v-if="modelIds.length > 0" class="icon-container" @click="showDrawer">
        <i class="el-icon-d-arrow-left"></i>
      </div>
    </div>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
    <ul
      v-show="tagsViewBeyondVisible"
      style="
         {
          top: 30px;
          right: 0;
          max-height: 500px;
          overflow-y: auto;
          z-index: 3000;
        }
      "
      class="contextmenu"
    >
      <li v-for="item in tagsViewsBryond" :key="item.path" @click="updateModelIds(item)">
        {{ item.title }}
        <span class="el-icon-close" @click.prevent.stop="deleteModelIds(item)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mixins } from './mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      tagsViewBeyondVisible: false,
      modelIds: [],
      tagsViews: [],
      tagsViewsBryond: [],
      wrapperWidth: 0,
      delBryond: false,
    }
  },
  computed: {
    tagsVisitedViews() {
      return this.modelIds.length > 0 ? this.tagsViews.filter((item) => !this.modelIds.includes(item.params.modelId)) : this.tagsViews
    },
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
      this.$nextTick(() => {
        if (this.$route.params.modelId !== undefined && this.modelIds.includes(this.$route.params.modelId)) {
          const view = this.tagsViews.find((item) => item.params.modelId == this.$route.params.modelId)
          this.updateModelIds(view, 'route')
        }
      })
    },
    tagsViews: {
      handler(newTagsViews, oldTagsViews) {
        this.$nextTick(() => {
          this.updateTagsViewItem(newTagsViews, oldTagsViews)
        })
      },
      immediate: true,
    },
    visitedViews: {
      handler(newVal) {
        this.tagsViews = newVal
      },
      immediate: true,
    },
  },
  methods: {
    showDrawer() {
      this.tagsViewBeyondVisible = true
    },
    hideDrawer() {
      this.tagsViewBeyondVisible = false
    },
    updateModelIds(view, type) {
      this.$store.dispatch('tagsView/delView', view)
      let index = this.modelIds.findIndex((item) => item === view.params.modelId)
      this.modelIds.splice(index, 1)
      if (type == 'route') {
        this.$store.dispatch('tagsView/addView', view)
      } else {
        this.$router.push(view.fullPath)
      }
      this.tagsViews = this.visitedViews
    },
    deleteModelIds(view) {
      let index = this.modelIds.findIndex((item) => item === view.params.modelId)
      this.modelIds.splice(index, 1)
      this.delBryond = true
      this.closeSelectedTag(view)
    },
    domResize() {
      const wrapperDom = document.getElementsByClassName('tags-view-wrapper')[0]
      const wrapperWidth = wrapperDom.clientWidth - 30
      if (wrapperWidth < this.wrapperWidth) {
        this.updateTagsViewItem()
      } else {
        const spanDoms = []
        // 将tagsViewsBryond中的所有数据添加到wrapper中
        for (let index = this.tagsViewsBryond.length - 1; index >= 0; index--) {
          const eleTagsViews = this.tagsViewsBryond[index]
          const spanDom = document.createElement('span')
          spanDom.setAttribute('class', 'tags-view-item')
          spanDom.setAttribute('modelid', eleTagsViews.params.modelId)
          spanDom.innerHTML = eleTagsViews.title
          wrapperDom.prepend(spanDom)
          spanDoms.push(spanDom)
        }

        this.updateTagsViewItem()

        spanDoms.forEach((dom) => {
          wrapperDom.removeChild(dom)
        })
      }
    },
    updateTagsViewItem(newTagsViews = [], oldTagsViews = []) {
      const wrapperWidth = document.getElementsByClassName('tags-view-wrapper')[0].clientWidth - 30
      this.wrapperWidth = wrapperWidth
      const tagsViewItem = document.getElementsByClassName('tags-view-item')
      // 初始化modelIds
      this.modelIds = []
      this.tagsViews.forEach((item) => {
        let obj
        for (let i = 0; i < tagsViewItem.length; i++) {
          const ele = tagsViewItem[i]
          if (ele.getAttribute('modelId') == item.params.modelId) {
            obj = ele
          }
        }
        if (!obj) this.modelIds.push(item.params.modelId)
      })
      if (newTagsViews.length < oldTagsViews.length && this.modelIds.length > 0 && !this.delBryond) {
        let view = this.tagsViewsBryond[this.tagsViewsBryond.length - 1]
        view && this.updateModelIds(view, 'route')
      }
      let itemWidth = 0
      for (let index = tagsViewItem.length - 1; index >= 0; index--) {
        const item = tagsViewItem[index]
        itemWidth += item.offsetWidth + 5
        if (itemWidth >= wrapperWidth) {
          const modelId = item.getAttribute('modelId') || undefined
          if (!this.modelIds.includes(modelId)) {
            this.modelIds.push(modelId)
          }
        }
      }
      this.delBryond = false
      this.tagsViewsBryond = this.modelIds.length > 0 ? this.tagsViews.filter((item) => this.modelIds.includes(item.params.modelId)) : []

      if (this.tagsViewsBryond.length === 0) this.hideDrawer()
    },
  },
}
</script>

<style lang="less" scoped>
@import url(./tagsView.less);
</style>
