import path from 'path'
import { TagsViewMutations } from '@/store/modules/tagsView'
import { ProjectMutations } from '@/store/modules/project'
import { ModelService } from '@/services'
import { routesConstant } from '@/router/routeConstant'
const tagsViewAddType = {
  INITIAL: 'initial',
}

export const mixins = {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      dragIndex: '',
    }
  },
  computed: {
    visitedViews() {
      // 直接return出去watch监听的visitedViews中的新值跟旧值一样
      return [...this.$store.state.tagsView.visitedViews]
    },
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
  },
  mounted() {
    this.addTags(tagsViewAddType.INITIAL)
  },
  methods: {
    dragover(e, index) {
      e.preventDefault()
    },
    dragenter(e, index) {
      e.preventDefault()
      // 避免源对象触发自身的dragenter事件
      if (this.dragIndex !== index) {
        const source = this.visitedViews[this.dragIndex]
        this.$store.commit(`tagsView/${TagsViewMutations.DRAG_SORT_VISITED_VIEW}`, {
          dragIndex: this.dragIndex,
          index,
          view: source,
        })
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index
      }
    },
    dragstart(index) {
      this.dragIndex = index
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },

    async addTags(type) {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
        // if (tagsViewAddType.INITIAL === type) {
        //   // 网页第一次渲染的时候，判断模型对应的项目是否已经在左侧sideTree中打开，如果没有打开，则打开对应的项目
        //   if (this.$route.name === routesConstant.MODEL.name) {
        //     const { isOpen, projectId } = await this.checkProjectIsOpen(this.$route.params?.modelId || this.$route.query.modelId)
        //     if (!isOpen) {
        //       this.$store.commit(`project/${ProjectMutations.ADD_PROJECT}`, projectId)
        //     }
        //   }
        // }
      }
      return false
    },
    async checkProjectIsOpen(modelId) {
      const { data } = await ModelService.detailArchModelById(modelId)
      const recentOpenProjectIds = this.$store.getters['project/recentOpenProjectIds']
      if (recentOpenProjectIds.includes(data.projectId)) {
        return { isOpen: true }
      }
      return { isOpen: false, projectId: data.projectId }
    },
    async leftMenuAddProject() {
      const visitedViews = this.$store.getters['tagsView/visitedViews']
      const modelInfo = visitedViews.find((item) => item.name === 'Model')
      const modelId = modelInfo.params.modelId
      const { data } = await ModelService.detailArchModelById(modelId)
      this.$store.commit(`project/${ProjectMutations.ADD_PROJECT}`, data.projectId)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane?.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    // 优化:可在scrollView文件中点击时先判断，再触发时刷新、关闭的后续操作，就可以避免在后续操作函数中都进行一次validateClose调用
    async validateClose(view) {
      const message = '存在已编辑未保存的页面，是否继续进行操作'
      if (Array.isArray(view)) {
        if (view.some((item) => item.isEdit)) {
          return await confirm(message)
        }
      } else {
        // 判断是否编辑以及不是首页tag时
        if (!view.path.endsWith(routesConstant.WELCOME.path) && view.isEdit) {
          return await confirm(`【${view.title}】已编辑未保存,是否继续进行操作`)
        }
      }
      return true
    },
    async refreshSelectedTag(view) {
      if (!(await this.validateClose(view))) return
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath,
          })
        })
      })
    },
    async closeSelectedTag(view) {
      if (!(await this.validateClose(view))) return
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    async closeOthersTags() {
      const views = this.$store.state.tagsView.visitedViews.filter((item) => item.path !== this.selectedTag.path)
      if (!(await this.validateClose(views))) return
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    async closeAllTags(view) {
      if (!(await this.validateClose(this.$store.state.tagsView.visitedViews))) return
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      // const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = left - 80
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
  },
}
