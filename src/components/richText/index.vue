<template>
  <div class="rich-text-container">
    <div :id="richTextId" style="height: 100%"></div>
  </div>
</template>

<script>
import { uuid } from '@/utils/commonUtil'
import E from 'wangeditor'
function resetPlaceholder(editor) {
  editor.$textContainerElem.elems[0].lastChild.textContent = ''
}
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      richTextId: '',
    }
  },
  created() {
    const randomId = uuid()
    this.richTextId = `richText${randomId}`
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$nextTick()
      const editor = new E(`#${this.richTextId}`)
      editor.config.height = 300
      // 配置菜单栏，设置不需要的菜单
      editor.config.excludeMenus = ['emoticon', 'video', 'image', 'table', 'code', 'link', 'backColor']
      editor.config.onchange = (newHtml) => {
        this.$emit('input', newHtml)
      }
      editor.config.onchangeTimeout = 100
      editor.create()
      editor.txt.html(this.value)
      this.editor = editor
    },
  },
  watch: {
    value: function (newValue) {
      this.editor.txt.html(newValue)
      if (newValue) {
        resetPlaceholder(this.editor)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.rtf-page {
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .rtf-top {
    padding: 5px 0;
  }
  #rtfbox {
    height: 80%;
  }
}
</style>
