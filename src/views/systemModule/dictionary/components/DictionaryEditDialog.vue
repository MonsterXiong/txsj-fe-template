<template>
  <base-dialog :title="title" :visible.sync="visible" :before-close="onClose" :width="width">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto">
      <el-form-item label="字典名称" prop="eattriName">
        <el-input v-model.trim="formData.eattriName" placeholder="请输入字典名称"></el-input>
      </el-form-item>
      <el-form-item label="字典代码" prop="eattriCode">
        <el-input v-model.trim="formData.eattriCode" placeholder="请输入字典代码"></el-input>
      </el-form-item>
      <el-form-item label="字典排序">
        <el-input-number v-model="formData.eattriSort"></el-input-number>
      </el-form-item>
      <el-form-item label="字典描述" prop="eattriDesc">
        <el-input type="textarea" v-model="formData.eattriDesc" placeholder="请输入字典描述"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="small" @click="onClose">取 消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </base-dialog>
</template>

<script>
import { DictionaryService } from '@/services'
import configData from '@/utils/config'
import { DialogWidths } from '@/common/baseConstants'

export default {
  name: 'DictionaryEdit',
  data() {
    return {
      visible: false,
      title: '新增字典',
      width: DialogWidths.FORM,
      formData: {},
      formRules: {
        eattriName: [{ required: true, message: '请输入字典名称' }],
        eattriCode: [{ required: true, message: '请输入字典代码' }],
      },
    }
  },
  methods: {
    //显示弹窗,同时初始化数据
    async show(data) {
      if (data.eattriId) {
        this.title = '编辑字典'
        this.formData = { ...data }
      } else {
        this.title = '新增字典'
        this.formData = { ...data, eattriSort: 1 }
      }
      this.visible = true
    },

    //处理点击提交事件
    onSubmit() {
      this.$refs['formRef'].validate(async (valid) => {
        if (valid) {
          const frameworkData = {
            frameworkCode: configData.frameworkCode,
            frameworkVersion: configData.frameworkVersion,
          }
          const params = Object.assign(frameworkData, this.formData)
          const isAdd = this.formData.eattriId ? false : true
          if (isAdd) {
            await DictionaryService.insertEnumAttri(params)
          } else {
            await DictionaryService.updateMetaEnumAttri(params)
          }
          this.$message.success('操作成功')
          this.$emit('refreshTable', isAdd)
          this.onClose()
        } else {
          return false
        }
      })
    },

    //处理点击关闭事件
    onClose() {
      this.$refs['formRef'].resetFields()
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped></style>
