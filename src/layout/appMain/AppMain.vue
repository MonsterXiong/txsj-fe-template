<template>
  <div class="app-main">
    <SideBar @navMenuChange="onNavMenuChange"></SideBar>
    <splitpanes class="default-theme main-container-wrapper">
      <pane :size="isCollapseGuidance ? 0 : 15" class="initPanel" style="background: transparent">
        <Guidance :activeNavMenu="activeNavMenu" ref="GuidanceRef"></Guidance>
      </pane>
      <pane :size="isCollapseGuidance ? 100 : 85" class="initPanel2">
        <MainContainer></MainContainer>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideBar from '../sideBar/SideBar.vue'
import Guidance from '../guidance/Guidance.vue'
import MainContainer from './MainContainer.vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'AppMain',
  components: { SideBar, MainContainer, Splitpanes, Pane, Guidance },
  computed: {
    ...mapState('setting', ['isCollapseGuidance']),
  },
  data() {
    return {
      activeNavMenu: null,
    }
  },
  methods: {
    onNavMenuChange(menu) {
      this.activeNavMenu = menu
    },
  },
}
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  height: 100%;
  display: flex;

  .main-container-wrapper {
    flex: 1;
  }
}
// 防止初始化时宽度变化过大
.initPanel {
  width: 17%;
}
::v-deep {
  .splitpanes .splitpanes__pane.initPanel2 {
    width: 83%;
    background-color: @panel-border-color !important;
    clip-path: polygon(0 16px, 9px 0px, 100% 0%, 100% 100%, 0 100%);
    padding: 2px 0px 0px 2px;
    > div {
      clip-path: polygon(0 15px, 8.5px 0px, 100% 0%, 100% 100%, 0 100%);
    }
  }
}
</style>
