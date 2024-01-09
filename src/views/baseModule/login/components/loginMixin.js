import baseConfigData from '@/utils/config'
export default {
  data() {
    return {
      baseConfigData: baseConfigData,
      systemName: baseConfigData.systemName,
      companyName: baseConfigData.companyName,
      formAccount: {
        account: '',
        pass: '',
      },
      formAccountRules: {
        account: [{ required: true, message: '请输入账号' }],
        pass: [{ required: true, message: '请输入密码' }],
      },
      isRemember: false, //默认不记住密码
    }
  },
  created() {
    //设置点击回车键直接登录
    document.onkeydown = (event) => {
      const e = event || window.event
      if (e && e.keyCode == 13) {
        this.submitForm()
      }
    }
  },
  mounted() {
    // this.systemName = this.baseConfigData.systemName
    // this.companyName = this.baseConfigData.companyName
    this.getCookie() //首先判断cookie中的值
  },
  methods: {
    getCookie() {
      if (window.document.cookie.length > 0) {
        const arr = document.cookie.split(';')
        for (let i = 0; i < arr.length; i++) {
          const userKey = arr[i].split('=')
          if (userKey[0].trim() == 'account') {
            this.formAccount.account = userKey[1]
          } else if (userKey[0].trim() == 'pass') {
            this.formAccount.pass = userKey[1]
          } else if (userKey[0].trim() == 'isRemember') {
            this.isRemember = Boolean(userKey[1])
          }
        }
      }
    },
    //存储
    setCookie(account, pass, days) {
      var curDate = new Date()
      curDate.setTime(curDate.getTime() + 24 * 60 * 60 * 1000 * days) //设置cookie存储的有效时间
      window.document.cookie = 'account' + '=' + account + ';path=/;expires=' + curDate.toGMTString()
      window.document.cookie = 'pass' + '=' + pass + ';path=/;expires=' + curDate.toGMTString()
      window.document.cookie = 'isRemember' + '=' + this.isRemember + ';path=/;expires=' + curDate.toGMTString()
    },
    clearCookie() {
      this.setCookie('', '', -1)
    },
    submitForm() {
      this.$refs['formAccount'].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('user/login', this.formAccount)
          if (this.isRemember === true) {
            this.setCookie(this.formAccount.account, this.formAccount.pass, 7)
          } else {
            this.clearCookie()
          }
          this.redirectRouter()
        } else {
          console.error('error submit!!')
          return false
        }
      })
    },
    redirectRouter() {
      window.location.reload()
      if (this.$route.query.redirectUrl) {
        this.$router.push(this.$route.query.redirectUrl)
      } else {
        this.$router.push('/')
      }
    },

    resetForm() {
      this.$refs['formAccount'].resetFields()
    },
  },
}
