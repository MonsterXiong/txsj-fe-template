export default {
  inheritAttrs: false,
  data() {
    return {
      $_attrs: {},
      $_listeners: {},
    }
  },

  watch: {
    $attrs: {
      immediate: true,
      handler(val) {
        Object.keys(val).forEach((k) => {
          this.$set(this.$data.$_attrs, k, val[k])
        })
      },
    },

    $listeners: {
      immediate: true,
      handler(val) {
        Object.keys(val).forEach((k) => {
          this.$set(this.$data.$_listeners, k, val[k])
        })
      },
    },
  },
}
