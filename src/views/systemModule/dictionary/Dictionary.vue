<template>
  <PanelLayout>
    <template v-slot:left>
      <div class="dictionary-resource-tree">
        <el-tree :data="treeData" ref="treeRef" :expand-on-click-node="false" node-key="id" default-expand-all highlight-current @node-click="onNodeClick">
          <span slot-scope="_node">
            <span style="padding-right: 4px"><BaseIcon :icon-name="_node.data.icon"></BaseIcon></span>
            <span>{{ _node.data.label }}</span>
          </span>
        </el-tree>
      </div>
    </template>
    <div class="dictionary-resource-table" ref="dictionaryTableRef">
      <el-form ref="toolbarRef" class="inline-form-toolbar" inline size="small">
        <el-form-item>
          <el-button type="success" icon="el-icon-circle-plus-outline" size="small" @click="onAddDictionary">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border stripe :height="tableHeight">
        <el-table-column type="index" label="序号" fixed width="60" align="center"> </el-table-column>
        <el-table-column label="字典名称" min-width="120" fixed prop="eattriName"> </el-table-column>
        <el-table-column label="字典代码" min-width="120" prop="eattriCode"> </el-table-column>
        <el-table-column label="字典排序" width="100" prop="eattriSort" align="center"> </el-table-column>
        <el-table-column label="字典描述" min-width="180" prop="eattriDesc"> </el-table-column>
        <el-table-column label="操作" width="220" fixed="right" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="onEditDictionary(row)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" plain @click="onDeleteDictionary(row.eattriId)">删除</el-button>
          </template>
        </el-table-column>
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
    </div>
    <DictionaryEditDialog ref="dictionaryEditDialogRef" @refreshTable="getTableData"></DictionaryEditDialog>
  </PanelLayout>
</template>

<script>
import { DictionaryService } from '@/services/index.js'
import DictionaryEditDialog from './components/DictionaryEditDialog.vue'
import tools from '@/utils/tools'
import configData from '@/utils/config'
import { routesConstant } from '@/router/routeConstant'
import { InitPaginationData } from '@/common/baseConstants'
import PanelLayout from '@/components/panelLayout/PanelLayout.vue'

const DictionaryTypes = {
  dataBase: 'dataBase',
  data: 'data',
}

const TABLE_PADDING_VALUE = 8 * 2

export default {
  name: routesConstant.SYSTEM_DICTIONARY.name,
  components: { PanelLayout, DictionaryEditDialog },
  data() {
    return {
      treeData: [],
      selectedNode: null,
      tableHeight: '400px',
      tableData: [],
      pagination: { ...InitPaginationData },
      frameworkCode: configData.frameworkCode,
      frameworkVersion: configData.frameworkVersion,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //初始化数据
    async init() {
      this.$nextTick(() => {
        this.tableHeight =
          this.$refs['dictionaryTableRef'].offsetHeight -
          this.$refs['toolbarRef'].$el.offsetHeight -
          this.$refs['paginationRef'].$el.offsetHeight -
          TABLE_PADDING_VALUE +
          'px'
      })
      this.getTreeData()
    },

    async getTreeData() {
      const { data } = await DictionaryService.queryArchiDictStruct({
        frameworkCode: this.frameworkCode,
        frameworkVersion: this.frameworkVersion,
      })
      if (data && data.length > 0) {
        const tree = []
        let defaultSelectNode = null
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].metaFrameworkDTO) {
            const frameWorkNode = this.transferFrameworkToNode(data[i].metaFrameworkDTO)
            if (frameWorkNode) {
              const childrenNodes = this.transferEnumModelListToNodes(i, data[i].metaEnumModelList)
              frameWorkNode.children = childrenNodes
              if (!defaultSelectNode && childrenNodes.length > 0) {
                defaultSelectNode = childrenNodes[0]
              }
              tree.push(frameWorkNode)
            }
          }
        }
        this.treeData = tree
        this.setSelectedNode(defaultSelectNode)
      } else {
        this.treeData = []
      }
    },

    //转换framework为节点
    transferFrameworkToNode(frameworkDTO) {
      return {
        id: frameworkDTO.frameworkId,
        label: frameworkDTO.frameworkName,
        icon: 'icon-dictionary-database',
        type: DictionaryTypes.dataBase,
        disabled: true,
      }
    },

    //转换enumModelList为节点
    transferEnumModelListToNodes(bindex, enumModelList) {
      const nodes = []
      if (enumModelList && enumModelList.length > 0) {
        for (let index = 0, len = enumModelList.length; index < len; index++) {
          const enums = enumModelList[index]
          const node = {
            id: `${bindex}_${enums.eenumId}`,
            eenumId: enums.eenumId,
            label: enums.eenumName,
            icon: 'icon-dictionary',
            type: DictionaryTypes.data,
            eenumCode: enums.eenumCode,
          }
          nodes.push(node)
        }
      }
      return nodes
    },

    setSelectedNode(node) {
      this.selectedNode = node
      this.getTableData()
      this.$nextTick(function () {
        this.$refs['treeRef'].setCurrentKey(this.selectedNode.id)
      })
    },

    //处理点击节点事件
    onNodeClick(nodeData) {
      if (nodeData == this.selectedNode) {
        return
      }
      if (nodeData.type === DictionaryTypes.dataBase) {
        this.$nextTick(function () {
          this.$refs['treeRef'].setCurrentKey(this.selectedNode.id)
        })
        return
      }
      this.selectedNode = nodeData
      this.getTableData()
    },

    //更新表格展示数据
    async getTableData() {
      const params = {
        eenumId: this.selectedNode.eenumId,
        page: this.pagination.page,
        rows: this.pagination.rows,
      }
      const { data, count } = await DictionaryService.queryMetaEnumAttri(params)
      this.tableData = data || []
      this.pagination.count = count
    },

    onRefreshTable(isAdd) {
      if (isAdd) {
        this.pagination = { ...InitPaginationData }
      }
      this.getTableData()
    },

    //处理添加字典
    onAddDictionary() {
      if (this.selectedNode) {
        this.$refs['dictionaryEditDialogRef'].show({ eenumId: this.selectedNode.eenumId })
      } else {
        this.$message('请先选中需要新增到的数据')
      }
    },

    //处理编辑字典
    onEditDictionary(row) {
      this.$refs['dictionaryEditDialogRef'].show({ ...row })
    },

    //处理删除字典
    async onDeleteDictionary(eattriId) {
      tools.confirm('请确认是否删除该项字典?').then(async () => {
        const params = {
          frameworkCode: this.frameworkCode,
          frameworkVersion: this.frameworkVersion,
          eattriId,
        }
        await DictionaryService.deleteMetaEnumAttri(params)
        tools.message('删除成功')
        this.getTableData()
      })
    },

    //处理页面大小改变
    onPageSizeChange(rows) {
      this.pagination.rows = rows
      this.getTableData()
    },

    //处理页码改变
    onPageCurrentChange(page) {
      this.pagination.page = page
      this.getTableData()
    },
  },
}
</script>

<style scoped lang="less">
.dictionary-resource {
  &-tree {
    padding: 8px;
    overflow-y: auto;
    height: 100%;
  }

  &-table {
    height: 100%;
    padding: 8px 16px;
  }
}
</style>
