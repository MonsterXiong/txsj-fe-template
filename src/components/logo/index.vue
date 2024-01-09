<template>
  <div class="logo-wrapper">
    <img :src="systemIconSrc" v-if="showLogo == '1'" />
    <h1>{{ systemName }}</h1>
  </div>
</template>

<script>
import configData from '@/utils/config'
export default {
  name: 'Logo',
  data() {
    return {
      systemName: '',
      systemIconSrc: process.env.BASE_URL + 'static/image/base/',
      showLogo: 1,
    }
  },
  mounted() {
    this.systemName = configData.systemName
    const icon = configData.systemIcon ? configData.systemIcon : 'logo.png'
    this.systemIconSrc = this.systemIconSrc + icon
    this.showLogo = configData.showLogo
  },
}
</script>

<style lang="less">
.logo-wrapper {
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;

  img {
    height: 60px;
  }
  h1 {
    margin-left: 10px;
    color: @font-color-light;
  }
}
</style>
