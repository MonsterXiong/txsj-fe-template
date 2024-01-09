<template>
  <el-dialog v-bind="Object.assign({}, defaultOptions, $data.$_attrs)" v-on="$data.$_listeners" v-dragdialog class="form-dialog">
    <template v-slot:title><slot name="title" /></template>
    <template v-slot>
      <slot />
    </template>
    <template v-slot:footer><slot name="footer" /></template>
  </el-dialog>
</template>

<script>
import attrsListenersHack from './mixins/attrsListenersHack'

export default {
  name: 'BaseDialog',
  mixins: [attrsListenersHack],
  data() {
    return {
      defaultOptions: Object.freeze({
        width: '700px',
        modal: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        appendToBody: true,
      }),
    }
  },

  methods: {},
}
</script>

<style lang="less" scoped>
.el-icon-loading {
  font-size: 26px;
  color: #001529;
}
::v-deep {
  .el-dialog {
    background-color: #fff;
    box-shadow: 4px 12px 22px rgba(0, 0, 0, 0.2);
    clip-path: polygon(-50% 0, calc(100% - 9px) 0%, 100% 10px, calc(100% + 10px) 10px, 150% 150%, -50% 150%);
  }
  .el-dialog__header {
    border: 1px solid #fff;
    border-bottom: none;
    // background-image: linear-gradient(to right, #1b6dd9, #002150);
    // background-image: linear-gradient(to right, @linear-bg-color-light, @linear-bg-color-dark);
    clip-path: polygon(
      0 0,
      calc(100% - 11px) 0%,
      100% 12px,
      100% 15px,
      calc(100% - 4px) 15px,
      calc(100% - 4px) 18px,
      100% 18px,
      100% 21px,
      calc(100% - 4px) 21px,
      calc(100% - 4px) 24px,
      100% 24px,
      100% 27px,
      calc(100% - 4px) 27px,
      calc(100% - 4px) 30px,
      100% 30px,
      100% 100%,
      0 100%
    );
  }
}
</style>
