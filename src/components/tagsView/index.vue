<template>
  <component :is="tagsViewPage"></component>
</template>

<script>
import configData from '@/utils/config'
import tagsViewConfig from './tagsViewConfig.js'
export default {
  data() {
    return {
      tagsViewPage: tagsViewConfig(configData.tagsViewMode),
    }
  },
}
</script>
