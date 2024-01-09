<template>
  <component :is="loginPage"></component>
</template>

<script>
import { getLoginPage } from './loginConfig.js'
import baseConfigData from '@/utils/config'

export default {
  // name: routesConstant.LOGIN.name,
  data() {
    return {
      loginPage: getLoginPage(baseConfigData.loginPageName),
    }
  },
}
</script>
