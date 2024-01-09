<template>
  <div id="app" v-loading="loading">
    <router-view />
    <RightPanel v-if="isShowSetting">
      <IconSelect />
    </RightPanel>
  </div>
</template>

<script>
import emitter from '@/utils/eventBus'
import EventTypes from './common/eventTypes'
import { setHtmlNodeId } from './utils/domUtil'
import { mapGetters } from 'vuex'
import RightPanel from './components/RightPanel/index.vue'
import IconSelect from './views/baseModule/iconSelect/IconSelect.vue'
export default {
  mounted() {
    emitter.on(EventTypes.PUSH_ROUTE, (route) => {
      this.$router.push(route)
    })
    setHtmlNodeId(document.body, 'default')
  },
  computed: {
    ...mapGetters({
      loading: 'setting/getLoading',
    }),
    isShowSetting() {
      return process.env.NODE_ENV !== 'production'
    },
  },
  components: { RightPanel, IconSelect },
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
div {
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  user-select: text; //支持文本复制
}
</style>
