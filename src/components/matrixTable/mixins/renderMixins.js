// 这里只写矩阵渲染相关的逻辑,不涉及操作
import { MatrixType } from '../constants'

export default {
  data() {
    this.colWidth = {}
    this.colMinTotal = {}
    this.colMaxLength = {}
    return {
      headerProps: [],
      beforeColumn: [],
      maxDepth: 0,
      rowspan: [],
      lastIndex: [],
      visible: true,
    }
  },
  watch: {
    treeData: {
      handler() {
        this.onRefresh()
      },
      immediate: true,
    },
    headerData: {
      handler() {
        this.onRefresh()
      },
      immediate: true,
    },
    data: {
      handler() {
        this.valueData = [...this.data]
      },
      immediate: true,
    },
  },
  computed: {
    // 不传headerData的话,则默认为对称矩阵
    mainColumn() {
      if (this.headerData.length === 0) {
        return this.treeData
      }
      return this.headerData
    },
  },
  methods: {
    // 初始化渲染需要的数据
    initRenderData() {
      this.visible = false
      this.tableData = []
      this.maxDepth = 0
      this.rowspan = []
      this.lastIndex = []
      this.beforeColumn = []
      this.headerProps = []
      this.colWidth = {}
      this.colMinTotal = {}
      this.colMaxLength = {}
      this.treeData.forEach((item) => this.getChildrenTotal(item, 0))
      this.treeData.forEach((item) => this.listToTableData(item, {}, 0))
      // 实际关联的头部数据 指叶子节点
      this.mainColumn.forEach((item) => this.listToHeaderData(item, {}, 0))
      for (let i = 0; i <= this.maxDepth; ++i) {
        this.lastIndex.push(0)
        const data = {
          name: '',
          prop: '_name' + i,
        }
        // if (this.vertical) {
          // 最多有几行
          const maxLen = Math.ceil((this.colMinTotal[i] * 35 - 10) / 24)
          const maxWidth = Math.ceil((this.colMaxLength[i] / maxLen)) * 30 + 20
          if (this.colWidth[i]) {
            data.width = i === this.maxDepth ? this.colWidth[i] : Math.max(maxWidth, this.colWidth[i])
          } else {
            data.width = maxWidth
          }
        // } else {
        //   if (i !== this.maxDepth) {
        //     data.width = 40 + i * 10
        //   }
        // }
        this.beforeColumn.push(data)
      }
      this.getRowspan()
      this.$nextTick(() => {
        this.visible = true
      })
    },
    getChildrenTotal(parent, index) {
      if (parent.children) {
        parent._total = parent.children.reduce((total, item) => {
          return total + this.getChildrenTotal(item, index + 1)
        }, 0)
        if (!this.colMaxLength[index]) this.colMaxLength[index] = 1
        if (!this.colMinTotal[index]) this.colMinTotal[index] = 9999
        this.colMaxLength[index] = Math.max(this.colMaxLength[index], parent.name.length)
        this.colMinTotal[index] = Math.min(this.colMinTotal[index], parent._total)
        return parent._total
      }
      return 1
    },
    // 数组数据转换成表头
    listToHeaderData(data, parent, index) {
      const obj = {
        ...parent,
        _name: data.name,
        _id: data.id,
      }
      if (Array.isArray(data.children)) {
        obj['_parentName' + index] = data.name
        obj['_parentId' + index] = data.id
        data.children.forEach((item) => this.listToHeaderData(item, obj, index + 1))
      } else {
        this.headerProps.push(obj)
      }
    },
    // 数组数据转换成表格数据
    listToTableData(data, parent, index) {
      const obj = {
        ...data,
        ...parent,
        ['_name' + index]: data.name,
        ['_id' + index]: data.id,
        _name: data.name || '',
        _id: data.id,
        _index: index,
      }
      if (Array.isArray(data.children)) {
        data.children.forEach((item) => this.listToTableData(item, obj, index + 1))
      } else {
        if (!this.colWidth[index]) this.colWidth[index] = 15 + 20
        this.colWidth[index] = Math.max(obj._name.length * 15 + 20, this.colWidth[index])
        this.maxDepth = Math.max(index, this.maxDepth)
        this.tableData.push(obj)
      }
    },
    getRowspan() {
      this.tableData.forEach((item, index) => {
        this.rowspan.push([])
        for (let col = 0; col <= this.maxDepth; ++col) {
          this.rowspan[index].push(1)
          if (index > 0) {
            if (item['_id' + col] === this.tableData[index - 1]['_id' + col]) {
              this.rowspan[this.lastIndex[col]][col] += 1
              this.rowspan[index][col] = 0
            } else {
              this.lastIndex[col] = index
            }
          }
        }
      })
    },
    arraySpanMethod({ row, rowIndex, columnIndex }) {
      if (columnIndex <= this.maxDepth) {
        const rowspan = this.rowspan[rowIndex][columnIndex]
        if (rowspan) {
          return {
            rowspan: rowspan,
            colspan: (columnIndex < row._index) ? 1 : columnIndex > row._index ? 0 : (this.maxDepth + 1 - row._index),
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
    headerCellStyle({ column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0 && this.maxDepth != 0) {
          this.$nextTick(() => {
            const dom = document.querySelector(`.${column.id}`)
            dom.setAttribute('colspan', this.maxDepth + 1)
            dom.className = dom.className + ' matrixLine'
          })
        } else if (columnIndex <= this.maxDepth && this.maxDepth != 0) {
          this.$nextTick(() => {
            document.querySelector(`.${column.id}`).style = `display: none`
          })
        }
      }
    },
    cellMouseEnter(row, column, cell) {
      if (this.type === MatrixType.symmetric) {
        if (row._id === column.property) {
          return
        }
      }
      // 给这一竖上hover特效
      const colDomList = [...document.getElementsByClassName(column.id)]
      // 给这一行加上hover特效
      const rowDomList = [...cell.parentElement.cells]
      const domList = [...colDomList, ...rowDomList]
      domList.forEach((dom) => {
        if (!dom.className.includes('is-leaf')) dom.classList.add('hover')
      })
      cell.classList.add('cell-hover')
    },
    cellMouseLeave(row, column, cell) {
      const colDomList = [...document.getElementsByClassName(column.id)]
      const rowDomList = [...cell.parentElement.cells]
      const domList = [...colDomList, ...rowDomList]
      domList.forEach((dom) => {
        dom.classList.remove('hover')
      })
      cell.classList.remove('cell-hover')
    },
  },
}
