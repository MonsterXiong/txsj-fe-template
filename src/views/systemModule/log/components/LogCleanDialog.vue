<template>
  <base-dialog title="清理日志" :visible.sync="visible" :width="width" :before-close="onClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" size="small">
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker
          v-model="formData.startDate"
          type="date"
          placeholder="请选择开始时间"
          size="small"
          :picker-options="pickerOptionsCreate"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate">
        <el-date-picker v-model="formData.endDate" type="date" placeholder="请选择结束时间" size="small" style="width: 100%" :picker-options="pickerOptionsEnd">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small" @click="visible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </base-dialog>
</template>

<script>
import moment from 'moment'
import { LogService } from '@/services'
import { DialogWidths } from '@/common/baseConstants'

export default {
  data() {
    let that = this
    return {
      width: DialogWidths.SMALL_FORM,
      visible: false,
      formData: {
        startDate: '',
        endDate: '',
      },
      formRules: {
        startDate: [{ required: true, message: '请选择开始时间' }],
        endDate: [{ required: true, message: '请选择结束时间' }],
      },
      pickerOptionsCreate: {
        disabledDate(time) {
          //开始时间的禁用
          return time.getTime() > new Date(that.formData.endDate).getTime()
        },
      },
      //结束时间
      pickerOptionsEnd: {
        disabledDate(time) {
          //结束时间的禁用
          return time.getTime() < new Date(that.formData.startDate).getTime()
        },
      },
    }
  },
  methods: {
    show() {
      this.formData = {
        startDate: '',
        endDate: '',
      }
      this.visible = true
    },

    async onSubmit() {
      this.$refs['formRef'].validate(async (valid) => {
        if (valid) {
          const params = {
            startTime: this.formData.startDate == '' ? '' : moment(this.formData.startDate).format('YYYY-MM-DD'),
            endTime: this.formData.endDate == '' ? '' : moment(this.formData.endDate).format('YYYY-MM-DD'),
          }
          await LogService.cleanLogs(params)
          this.$message.success('操作成功')
          this.$emit('refreshTable')
          this.onClose()
        }
      })
    },

    onClose() {
      this.$refs['formRef'].resetFields()
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped></style>
