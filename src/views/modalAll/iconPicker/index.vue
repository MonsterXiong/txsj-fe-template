<template>
  <base-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :before-close="handleDialogClose">
    <SvgIconPicker @selected="handleSelected" :groupList="groupList" :svgIcons="svgIcons"></SvgIconPicker>
    <template slot="footer">
      <el-button size="medium" @click="handleDialogClose">取 消</el-button>
      <el-button size="medium" type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </base-dialog>
</template>

<script>
import EventTypes from '@/common/eventTypes'
import { svgList } from '@/components/svgIconPicker/config'
import SvgIconPicker from '@/components/svgIconPicker/index.vue'
const groupList = [
  { code: 'all', label: '全部' },
  { code: 'dodaf', label: 'DoDaf' },
]

export default {
  name: 'IconPickerDialog',
  components: {
    SvgIconPicker,
  },
  data() {
    return {
      dialogVisible: false,
      groupList,
      svgIcons: svgList,
      title: '图标',
      props: null,
      selectedSvgItem: null,
      okCbFn: () => {},
      cancelCbFn: () => {},
    }
  },
  mounted() {
    this.$emitter.on(EventTypes.OPEN_ICON_PICKER, ({ groupList, svgList, params, okCbFn, cancelCbFn }) => {
      this.show(groupList, svgList, params)
      this.okCbFn = okCbFn
      this.cancelCbFn = cancelCbFn
    })
  },
  methods: {
    handleSelected(svgItem) {
      this.selectedSvgItem = svgItem
    },
    show(groupList, svgList, params) {
      this.groupList = groupList
      this.svgIcons = svgList
      this.params = params
      this.dialogVisible = true
    },
    handleDialogClose() {
      this.cancelCbFn(this.props)
      this.dialogVisible = false
      this.cancelCbFn = () => {}
    },
    handleSubmit() {
      this.okCbFn({ params: this.params, selectedSvgItem: this.selectedSvgItem })
      this.dialogVisible = false
      this.cancelCbFn = () => {}
    },
  },
}
</script>

<style scoped lang="less">
.dialog {
}
</style>
