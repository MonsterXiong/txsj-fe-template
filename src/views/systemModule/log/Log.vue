<template>
  <div class="common-table-page">
    <div ref="logRef">
      <el-form ref="toolbarRef" class="inline-form-toolbar" :model="queryForm" inline size="small">
        <el-form-item label="操作用户">
          <el-input v-model="queryForm.account" placeholder="请输入操作用户" clearable></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="queryForm.search" placeholder="请输入搜索关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="queryForm.startDate" type="date" placeholder="请选择开始时间" size="small" :picker-options="pickerOptionsCreate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="queryForm.endDate" type="date" placeholder="请选择结束时间" size="small" :picker-options="pickerOptionsEnd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onQuery">查询</el-button>
          <el-button icon="el-icon-refresh-left" @click="onReset">重置</el-button>
          <el-button type="success" icon="el-icon-upload" @click="onExport">导出日志</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="onCleanLog">清理日志</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe border :height="tableHeight" row-key="id" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column label="日志类型" width="180" sortable prop="type"> </el-table-column>
        <el-table-column label="日志内容" width="180" sortable prop="content"> </el-table-column>
        <el-table-column label="操作日期" width="180" sortable prop="cjsj"> </el-table-column>
        <el-table-column label="操作用户" width="120" prop="cjr" sortable> </el-table-column>
        <el-table-column label="访问IP" width="140" prop="ip" sortable> </el-table-column>
        <el-table-column label="访问地址" min-width="140" prop="url" sortable> </el-table-column>
        <el-table-column label="备注" width="180" prop="content" sortable> </el-table-column>
      </el-table>
      <base-pagination
        ref="paginationRef"
        @size-change="onPageSizeChange"
        @current-change="onPageCurrentChange"
        :current-page="this.pagination.page"
        :page-size="this.pagination.rows"
        :total="this.pagination.count"
      >
      </base-pagination>
      <LogCleanDialog ref="logCleanDialogRef" v-on:refreshTable="onQuery" />
    </div>
  </div>
</template>

<script>
import { LogService } from '@/services'
import moment from 'moment'
import LogCleanDialog from './components/LogCleanDialog.vue'
import tools from '@/utils/tools'
import { exportFile } from '@/utils/commonUtil'
import { routesConstant } from '@/router/routeConstant'
import { InitPaginationData } from '@/common/baseConstants'

const InitQueryForm = {
  account: '',
  search: '',
  startDate: '',
  endDate: '',
  // sort: '',
}

export default {
  name: routesConstant.LOG.name,
  components: { LogCleanDialog },
  data() {
    let that = this
    return {
      queryForm: {
        ...InitQueryForm,
      },
      pickerOptionsCreate: {
        disabledDate(time) {
          //开始时间的禁用
          return time.getTime() > new Date(that.queryForm.endDate).getTime()
        },
      },
      //结束时间
      pickerOptionsEnd: {
        disabledDate(time) {
          //结束时间的禁用
          return time.getTime() < new Date(that.queryForm.startDate).getTime()
        },
      },
      loading: false,
      tableData: [],
      tableHeight: '400px',
      pagination: { ...InitPaginationData },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.tableHeight = this.$refs['logRef'].offsetHeight - this.$refs['toolbarRef'].$el.offsetHeight - this.$refs['paginationRef'].$el.offsetHeight + 'px'
        // this.$nextTick(() => {
        //   this.$refs.tableRef.doLayout()
        // })
      })
      this.getTableData()
    },

    async getTableData() {
      try {
        this.loading = true
        const params = this.getQueryParams()
        const { data, count } = await LogService.findLog(params)
        this.tableData = data || []
        this.pagination.count = count
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    getQueryParams() {
      const params = { page: this.pagination.page, rows: this.pagination.rows }
      Object.keys(this.queryForm).forEach((key) => {
        const value = this.queryForm[key]
        if (value) {
          if (key === 'startDate' || key === 'endDate') {
            params[key] = moment(value).format('YYYY-MM-DD')
          } else {
            params[key] = value
          }
        }
      })
      return params
    },
    // onSort(data) {
    //   this.queryForm.sort = data.prop
    //   this.onQuery()
    // },
    onQuery() {
      this.pagination = { ...InitPaginationData }
      this.getTableData()
    },

    onReset() {
      this.queryForm = { ...InitQueryForm }
      this.onQuery()
    },

    onExport() {
      tools.confirm('确定导出该数据吗', { type: 'info' }).then(async () => {
        const params = this.getQueryParams()
        const result = await LogService.exportExcel(params)
        exportFile('操作日志', result, 'application/vnd.ms-excel')
      })
    },

    onCleanLog() {
      this.$refs['logCleanDialogRef'].show()
    },

    onPageSizeChange(rows) {
      this.pagination.rows = rows
      this.onQuery()
    },

    onPageCurrentChange(page) {
      this.pagination.page = page
      this.onQuery()
    },
  },
}
</script>

<style scoped lang="less"></style>
