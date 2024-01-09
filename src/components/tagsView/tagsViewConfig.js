import scrollView from './components/scrollView.vue'
import drawerView from './components/drawerView.vue'

const tagsViewPages = {
  scroll: scrollView,
  drawer: drawerView,
}

const tagsViewConfig = (key) => {
  if (tagsViewPages[key]) {
    return tagsViewPages[key]
  } else {
    return tagsViewPages.scroll
  }
}

export default tagsViewConfig
