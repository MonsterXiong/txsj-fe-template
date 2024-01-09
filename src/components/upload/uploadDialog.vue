<template>
  <base-dialog title="导入" :visible.sync="dialogFormVisible" :width="width">
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="importFileUrl"
      :on-change="handleChange"
      :file-list="fileList"
      :auto-upload="false"
      :accept="transformat"
      :limit="1"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div>只能上传{{ transformatLabel }}文件</div>
    </el-upload>
    <template slot="footer">
      <el-button size="medium" @click="hide()">取 消</el-button>
      <el-button size="medium" type="primary" @click="submitUpload">导 入</el-button>
    </template>
  </base-dialog>
</template>

<script>
import { DialogWidths } from '@/common/baseConstants'
export default {
  data() {
    return {
      importFileUrl: '',
      dialogFormVisible: false,
      fileList: [],
      transformat: '',
      transformatLabel: '',
      width: DialogWidths.SMALL_FORM,
    }
  },
  mounted() {},
  methods: {
    show(str) {
      this.dialogFormVisible = true
      switch (str) {
        case 'xml_import':
          this.transformat = 'text/xml,charset=UTF-8'
          this.transformatLabel = 'xml'
          break
        case 'xls_import':
          this.transformat = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,'
          this.transformatLabel = 'xlsx / xls'
          break
        default:
          break
      }
    },
    hide() {
      this.dialogFormVisible = false
    },
    submitUpload() {
      if (this.transformatLabel == 'xml') {
        this.$emit('callBack', this.fileList, 'xml')
      } else {
        this.$emit('callBack', this.fileList, 'excel')
      }
      this.fileList = []
      this.hide()
    },
    handleChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file)
    },
  },
}
</script>

<style lang="less" scoped></style>
