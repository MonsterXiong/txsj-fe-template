<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="(tag, index) in visitedViews"
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
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '../ScrollPane'
import { mixins } from './mixins'
export default {
  mixins: [mixins],
  components: { ScrollPane },

  data() {
    return {}
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
      this.$nextTick(() => {
        this.$refs.scrollPane.$refs.scrollContainer.update()
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import url(./tagsView.less);
</style>
