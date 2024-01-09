import login from './components/Login.vue'
import login1 from './components/Login1.vue'
import login2 from './components/Login2.vue'
import login3 from './components/Login3.vue'
import login4 from './components/Login4.vue'
import login5 from './components/Login5.vue'
import login6 from './components/Login6.vue'

const loginPages = {
  login,
  login1,
  login2,
  login3,
  login4,
  login5,
  login6,
}

export function getLoginPage(key) {
  if (key && loginPages[key]) {
    return loginPages[key]
  } else {
    return loginPages.login
  }
}
