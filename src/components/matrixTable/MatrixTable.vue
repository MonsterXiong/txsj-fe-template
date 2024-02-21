<template>
  <div class="matrix">
    <el-table
      border
      :data="tableData"
      ref="tableRef"
      :height="type === MatrixType.default || type === MatrixType.input ? '100%' : 'calc(100% - 40px)'"
      :span-method="arraySpanMethod"
      :header-cell-style="headerCellStyle"
      :cell-class-name="getCellClassName"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      v-if="visible"
    >
      <el-table-column v-if="beforeColumn.length === 0"></el-table-column>
      <el-table-column v-for="item in beforeColumn" class-name="cell-header" :key="item.prop" align="center" v-bind="item"></el-table-column>
      <TreeColumn :vertical="vertical" v-for="item in mainColumn" :data="item" :key="item.id">
        <template slot-scope="{ row, column, $index }">
          <span v-if="type === MatrixType.relation">&nbsp;<i class="iconfont" :class="getData(row._id, column.property, row, column, $index)"></i>&nbsp;</span>
          <span v-else-if="type === MatrixType.symmetric"
            >&nbsp;<i
              :class="getData(row._id, column.property, row, column, $index)"
              :style="'color: ' + getColor(row._id, column.property, row, column, $index) + ';    font-weight: 900!important;'"
            ></i
            >&nbsp;</span
          >
          <template v-else-if="type === MatrixType.input">
            <span v-if="noInput.includes(column.property)" style="display: inline-block; height: 100%; width: 100%; min-height: 23px">{{
              inputData[row._id + '_' + column.property]
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="inputData[row._id + '_' + column.property]"
              @keyup.enter.native="onInputChange(row._id, column.property, row._id + '_' + column.property)"
              @blur="onInputChange(row._id, column.property, row._id + '_' + column.property)"
              :ref="row._id + '_' + column.property"
            ></el-input>
          </template>
          <template v-else> {{ getData(row._id, column.property, column) }} </template>
        </template>
      </TreeColumn>
    </el-table>
    <footer class="footer" v-if="type === MatrixType.relation">
      <div class="btn-box" v-for="item in relationList" :key="item.value" :class="{ active: curRelation === item.value }" @click="onChangeRelation(item.value)">
        <i class="iconfont" :class="item.value"></i> {{ item.name }}
      </div>
      <div class="btn-box" :class="{ active: curRelation === CLEARRELATION }" @click="onChangeRelation(CLEARRELATION)">
        <i class="el-icon-delete"></i>清除关系
      </div>
      <slot name="footer"></slot>
    </footer>
    <footer class="footer" v-if="type === MatrixType.symmetric">
      <div class="btn-box" :class="{ active: curRelation === 'el-icon-back' }" @click="onChangeRelation('el-icon-back')">
        &nbsp;&nbsp; <i class="el-icon-back"></i> &nbsp;&nbsp;
      </div>
      <div class="btn-box" :class="{ active: curRelation === 'el-icon-top' }" @click="onChangeRelation('el-icon-top')">
        &nbsp;&nbsp; <i class="el-icon-top"></i> &nbsp;&nbsp;
      </div>
      <div class="btn-box" :class="{ active: curRelation === CLEARRELATION }" @click="onChangeRelation(CLEARRELATION)">
        <i class="el-icon-delete"></i>清除关系
      </div>
      &nbsp;&nbsp;
      <slot name="footer"></slot>

      <div class="tip-box" style="cursor: initial">
        提示：【
        <div class="tip-text">B<i class="el-icon-back"></i>A<span>&nbsp;依赖关系:A依赖B &nbsp;&nbsp;&nbsp;“空”表示无关系 </span></div>
        】
      </div>
      <slot></slot>
    </footer>
  </div>
</template>

<script>
import TreeColumn from './components/TreeColumn.vue'
import renderMixins from './mixins/renderMixins'
import { MatrixType } from './constants'
import { ThemeCodes } from '../../common/constants'
import { mapState } from 'vuex'

const CLEARRELATION = 'CLEARRELATION'

export default {
  name: 'matrixTable',
  mixins: [renderMixins],
  props: {
    // 额外的头部数据
    headerData: {
      type: Array,
      default: () => [],
    },
    // 组成表格的数据
    treeData: {
      type: Array,
      default: () => [],
    },
    // 数据
    data: {
      type: Array,
      default: () => [],
      require: true,
    },
    // 是否只读
    readOnly: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: MatrixType.symmetric,
    },
    // 关系列表
    relationList: {
      type: Array,
      default: () => [],
    },
    // 是否是垂直
    vertical: {
      type: Boolean,
      default: false,
    },
    noInput: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TreeColumn,
  },
  data() {
    this.timer = null
    return {
      tableData: [],
      valueData: [],
      MatrixType,
      curRelation: 'el-icon-back',
      CLEARRELATION,
      inputData: {},
      isInput: '',
    }
  },
  watch: {
    relationList: {
      handler(val) {
        if (Array.isArray(val) && val.length > 0) {
          this.curRelation = val[0].value
        }
      },
      immediate: true,
    },
    data: {
      handler(val) {
        this.inputData = {}
        if (Array.isArray(val)) {
          val.map((ele) => {
            this.$set(this.inputData, `${ele.from}_${ele.to}`, ele.value)
          })
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState('theme', ['themeCode']),
    // 减少表格渲染的循环次数,优化效率
    valueMap() {
      const dataMap = new Map()
      this.valueData.forEach((item) => {
        dataMap.set(`${item.from}-${item.to}`, item)
      })
      return dataMap
    },
  },

  methods: {
    onRefresh() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.initData()
      }, 0)
    },
    initData() {
      // window.tableRef = this.$refs.tableRef
      this.initRenderData() // 初始化渲染需要的数据
    },
    getCellClassName({ row, column }) {
      const from = row._id
      const to = column.property
      if (from === to) return 'disable'
      const findValue = this.valueMap.get(`${from}-${to}`)
      return findValue?.readOnly ? 'readOnly' : ''
    },
    getData(from, to) {
      const findValue = this.valueMap.get(`${from}-${to}`)
      if (from === to) return ''
      if (findValue?.value == 0) {
        return findValue.value
      } else {
        return findValue?.value || ''
      }
    },

    getInputData() {
      return this.inputData
    },

    getColor(from, to) {
      const findValue = this.valueMap.get(`${from}-${to}`)
      if (findValue?.iconColor) return findValue?.iconColor
      return this.themeCode == ThemeCodes.DARK_BLUE ? '#fff' : '#2c3e50'
    },

    async changeInput(from, to) {
      let key = from + '_' + to,
        flag = false
      this.noInput.map((code) => {
        if (key.indexOf(code) != -1) flag = true
      })
      // 单位不可编辑
      if (flag) return
      if (this.isInput == '') {
        this.isInput = key
        setTimeout(() => {
          this.$refs[key][0].focus()
        }, 50)
      } else {
        await this.onInputChange(from, to, key)
        this.isInput = key
        setTimeout(() => {
          this.$refs[key][0].focus()
        }, 50)
      }
    },
    onInputChange(from, to, key) {
      // input框无法编辑
      if (isNaN(Number(this.inputData[key]))) {
        // 为 NaN
        this.$message.warning('当前仅可输入数字')
        this.isInput = ''
        return
      }
      this.isInput = ''
      this.$emit('changeInput', {
        from,
        to,
        value: this.inputData[key],
      })
    },
    cellClick(row, column) {
      const from = row._id
      const to = column.property
      const findValue = this.valueMap.get(`${from}-${to}`)
      if (from === to) return
      // 如果没选择关系,则默认点击操作
      if (!this.curRelation) {
        this.$emit('cellClick', {
          from,
          to,
          row,
          column,
          data: findValue,
        })
      } else if (!this.readOnly && this.type !== MatrixType.default) {
        // 如果选择了关系则默认修改关系操作
        const relation = this.curRelation === CLEARRELATION ? '' : this.curRelation
        // 只读数据不允许修改
        // if (findValue && findValue.readOnly) return
        if (findValue) {
          findValue.value = relation
        } else if (relation) {
          this.valueData.push({
            from,
            to,
            value: relation,
          })
        }
        this.$emit('change', {
          from,
          to,
          row,
          column,
          value: relation,
          data: findValue,
        })
      }
    },
    onChangeRelation(value) {
      if (this.curRelation === value) {
        this.curRelation = ''
      } else {
        this.curRelation = value
      }
    },
  },
}
</script>

<style scoped lang="less">
@import './matrix.less';
.iconfont {
  min-height: 16px;
}

.footer {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 16px;
  position: absolute;
  bottom: 0px;
  // left: 10px;
  overflow: auto;
  flex-wrap: wrap;
  .btn-box {
    font-size: 16px;
    line-height: 24px;
  }
  .tip-box {
    font-size: 16px;
    line-height: 24px;
    .tip-text {
      display: inline-block;
      font-weight: 600;
      font-size: 14px;
    }
  }
  > div {
    margin-right: 8px;
    > i {
      margin-right: 3px;
    }
    cursor: pointer;

    &.active {
      background: #416daf;
    }
  }
}
</style>
