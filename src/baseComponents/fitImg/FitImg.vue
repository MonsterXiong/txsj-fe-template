<template>
  <div class="fit-img-wrapper">
    <img :src="url" />
  </div>
</template>

<script>
export default {
  props: {
    url: {},
  },
}
</script>

<style lang="less" scoped>
.fit-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
