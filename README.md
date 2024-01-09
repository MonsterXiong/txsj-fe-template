# 建议的一些编码规范

- ！！！尽量命名语义化，方便你我他！！！
- ！！！尽量不要出现魔法数字（magic number）！！！
- ！！！尽量不要出现重复的代码！！！
- ！！！代码提交到 svn 时，请尽量写一点注释！！！

# 项目须知

- 跨多个组件通信约定用 mitt 已在 Vue 上挂载了 emitter，在组件中直接使用 this.$emitter 即可发射接收事件

  > https://www.npmjs.com/package/mitt

- 对应需要在 TagsView 中打开的标签页(组件)，请使用路由的 query 传参，而不是 params 或者其他，因为标签页可能会给直接给外部系统嵌入使用！反正就是不要依赖父组件以及祖先组件！

- 交互对话框使用 tools.confirm()，默认显示取消确定按钮，标题为提示，类型为 warning。若需要修改在 option 中进行传参即可，也可使用 this.$confirm
- 由于绝大部分错误提示都已经被拦截，所以简单的提示信息使用,默认是成功提示 tool.message(),成功的提示不需要传入 type 也可使用 this.$message
- 项目所有图标来源于阿里巴巴 iconfont，如果你需要新加图标，最好联系管理员，把你添加进图标库项目中，这样便于图标的统一管理，当然，你也可以不加入项目添加新的图标
- 富文本编辑器 wangEditor
  > https://www.wangeditor.com/v5/

# lowcode

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 关于项目中加载图片

若需要动态加载渲染图片，需要把图片放到 public/static 文件夹中【不打包，不压缩，可以直接获取】，参考 styletoolbar
若不需要动态加载进行渲染，把图片放到 assets/image 目录下【可自己新建相关文件夹，该文件会进行打包处理】,参考 login
建议非必要情况下不使用 css 中的 background 进行图片配置，最好直接使用 img 标签。尤其是需要进行动态加载的内容。
图片路径(src 或 url)均使用相对路径（./,../,@/），不可使用绝对路径（C：test/img.png）

### dialog

统一使用 base-dialog 标签，方便对所有弹窗公用行为进行统一管理
