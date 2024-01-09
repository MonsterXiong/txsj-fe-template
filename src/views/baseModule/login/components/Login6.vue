<template>
  <div class="login" style="position: relative">
    <img style="position: absolute; width: 100%; height: 100%; z-index: 1" src="static/image/base/login6/bg-login.png" alt="" />
    <div class="header">
      <span>{{ systemName }}</span>
      <img style="position: absolute; left: 0; bottom: 0; width: 100%; z-index: 1" src="static/image/base/login6/head.png" alt="" />
    </div>
    <div class="login-box">
      <img style="position: absolute; height: 100%; width: 100%" src="static/image/base/login6/login-box.png" alt="" />
      <header>您好，欢迎登录</header>
      <el-form class="login-form" ref="formAccount" :model="formAccount" :rules="formAccountRules">
        <el-form-item prop="account">
          <el-input v-model="formAccount.account" placeholder="请输入账号">
            <!-- <i slot="prefix" class="el-input__icon el-icon-user login-icon"></i> -->
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 38px" prop="pass">
          <el-input v-model="formAccount.pass" type="password" @keyup.enter.native="submitForm" placeholder="请输入密码">
            <!-- <i slot="prefix" class="el-input__icon el-icon-lock login-icon"></i> -->
          </el-input>
        </el-form-item>
        <el-form-item class="login-buttons">
          <img style="position: absolute; height: 100%; width: 100%" src="static/image/base/login6/login-button.png" alt="" />
          <div class="login-button" style="width: 100%" type="primary" @click="submitForm()">登 录</div>
        </el-form-item>
      </el-form>
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
  height: 100%;
  width: 100%;
}
.header {
  position: relative;
  z-index: 1;
  width: 100%;
  font-size: 36px;
  line-height: 67px;
  // font-family: SourceHanSansCN;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  letter-spacing: 6px;
  background-image: linear-gradient(to bottom, #0080ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.login-box {
  position: relative;
  z-index: 1;
  height: 402px;
  width: 602px;
  left: 50%;
  top: calc(50% - 70px);
  transform: translate(-50%, -50%);
  height: 402px;
  width: 602px;

  > header {
    font-size: 26px;
    line-height: 72px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    letter-spacing: 2px;
    background-image: linear-gradient(to bottom, #0080ff, #ffffff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .login-form {
    padding: 35px 100px;
    ::v-deep {
      .el-input {
        font-size: 18px;
      }
      .el-form-item {
        margin-bottom: 28px;
      }
      .el-input__inner {
        color: #fff;
        border: 1px solid #2469bd;
        background: transparent !important;
        height: 45px;
        line-height: 45px;
        letter-spacing: 2px;
      }
      .el-input__icon {
        line-height: 45px;
      }
    }
  }
  .login-button {
    cursor: pointer;
    position: relative;
    font-size: 18px;
    letter-spacing: 2px;
    color: #fff;
    text-align: center;
    line-height: 50px;
  }
}
</style>
