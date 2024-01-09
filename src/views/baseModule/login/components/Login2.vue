<template>
  <div class="login" style="position: relative">
    <img style="position: absolute; width: 100%; height: 100%; z-index: 1" src="static/image/base/login2/bg-login.png" alt="" />
    <div style="position: absolute; width: 100%; height: 100%; z-index: 3; min-height: 750px">
      <div class="title">
        <span style="position: relative">
          <img style="position: absolute; width: 100%; height: 100%; left: 0; top: 0" src="static/image/base/login2/bg-title.png" alt="" />
          <span>{{ systemName }}</span>
        </span>
      </div>
      <div class="login-wrapper">
        <div class="login-card">
          <img style="position: absolute; width: 100%; height: 100%; left: 0; top: 0" src="static/image/base/login2/bg-box.png" alt="" />
          <el-form ref="formAccount" :model="formAccount" status-icon :rules="formAccountRules">
            <el-form-item prop="account">
              <el-input v-model="formAccount.account" placeholder="请输入登录账号">
                <i slot="prefix" class="el-input__icon el-icon-user login-icon"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input v-model="formAccount.pass" type="password" @keyup.enter.native="submitForm" placeholder="请输入密码">
                <i slot="prefix" class="el-input__icon el-icon-lock login-icon"></i>
              </el-input>
            </el-form-item>
            <el-form-item class="login-buttons">
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-footer">
        <div>
          <template v-if="companyName && companyName.trim().length > 0">
            Copyright
            <i>
              <svg viewBox="64 64 896 896" focusable="false" class data-icon="copyright" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"
                />
              </svg>
            </i>
          </template>

          {{ companyName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './loginMixin'
export default {
  mixins: [mixin],
  name: 'Login2',
}
</script>

<style scoped lang="less">
img {
  user-select: none;
  -webkit-user-drag: none;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  //background: url(/static/image/base/bg-login.png) no-repeat;
  overflow: auto;
  .title {
    // margin-top: 146px;
    margin-top: 7.5%;
    font-size: 57px;
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    letter-spacing: 10px;
    > span {
      padding: 0 80px 40px;
    }
  }
  .login-wrapper {
    box-sizing: border-box;

    .login-card {
      position: absolute;
      left: 50%;
      top: 59%;
      transform: translate(-50%, -50%);
      width: 620px;
      height: 550px;
      padding: 50px 130px 30px;

      h2 {
        text-align: center;
        margin-top: 0px;
        letter-spacing: 10px;
        margin-left: 36px;
      }
      .el-form-item {
        margin-top: 40px;
      }
      .login-icon {
        color: #0adfef;
        font-size: 20px;
      }

      .login-buttons {
        margin-top: 50px;
        text-align: center;
      }
    }
  }
  ::v-deep {
    .el-form-item {
      background-color: unset !important;
    }
    .el-input__inner {
      height: 50px;
      background-color: transparent !important;
      border: 1px solid #999999 !important;
      color: #fff !important;
      font-size: 20px;
      padding-left: 48px;
      line-height: 50px;
    }
    .el-input__icon {
      line-height: 50px;
      width: 34px;
    }
    .el-input__prefix {
      left: 10px;
    }
    .el-button {
      width: 100%;
      height: 50px;
      background: #fff !important;
      border: 1px solid #dcdfe6 !important;
      color: #606266 !important;

      font-size: 20px;
      letter-spacing: 5px;

      margin-top: 16px;
    }
    .el-button--primary {
      color: #fff !important;
      background-color: #136ce4 !important;
      border-color: #136ce4 !important;
    }
  }

  .login-footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    i {
      vertical-align: -2px;
    }
  }
}
</style>
