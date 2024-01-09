<template>
  <div class="main-container">
    <TagsView class="main-container-tagsview"></TagsView>
    <div class="main-container-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" style="height: 100%" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import TagsView from '@/components/tagsView/index.vue'
export default {
  name: 'MainContainer',
  components: { TagsView },
  data() {
    return {}
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
  },
}
</script>

<style lang="less" scoped>
.main-container {
  .full-container();

  &-tagsview {
    height: 34px;
  }
  &-content {
    height: calc(100% - 34px);
    background: #fff;
    > div {
      overflow-y: auto;
    }
  }
}
</style>
