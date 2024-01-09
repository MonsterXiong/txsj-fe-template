<template>
  <svg class="icon" :style="{ fill: fill }" aria-hidden="true">
    <use :xlink:href="`#${iconName}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      require: true,
    },
    fill: {
      type: String,
      require: false,
    },
  },
}
</script>

<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
