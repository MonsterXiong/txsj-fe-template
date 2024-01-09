<template>
  <div class="login">
    <img style="position: absolute; width: 100%; height: 100%" src="static/image/base/login5/bg-login.png" alt="" />
    <div class="login-card">
      <main>
        <div class="border left top"></div>
        <div class="border right top"></div>
        <div class="border left bottom"></div>
        <div class="border right bottom"></div>
        <h1>{{ systemName }}</h1>
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
          <div style="margin-bottom: 4px; font-size: 14px">
            <el-checkbox v-model="isRemember">记住用户名及密码</el-checkbox>
          </div>
          <el-form-item class="login-buttons">
            <el-button type="primary" @click="submitForm()">登 录</el-button>
          </el-form-item>
        </el-form>
      </main>
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
</template>

<script>
import mixin from './loginMixin'
export default {
  mixins: [mixin],
  name: 'Login5',
}
</script>

<style lang="less" scoped>
img {
  user-select: none;
  -webkit-user-drag: none;
}

.login {
  position: relative;
  width: 100%;
  height: 100%;
}

.login-card {
  position: absolute;
  width: 580px;
  height: 609px;
  border-radius: 28px;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
  padding: 12px;
  background-color: rgba(13, 56, 126, 0.78);
  color: #fff;
  border: 1px solid rgb(93, 123, 159);
  box-shadow: 0px 0px 8px 2px #387ab1;

  main {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .border {
      position: absolute;
      width: 68px;
      height: 54px;
      border: 4px solid #30a9e4;
      border-radius: 28px;
    }
    .top {
      top: 0;
      border-bottom: none;
    }
    .bottom {
      bottom: 0;
      border-top: none;
    }
    .left {
      left: 0;
      border-right: none;
    }
    .right {
      right: 0;
      border-left: none;
    }
    .right.top,
    .left.bottom {
      border-radius: 0 28px;
    }
    .left.top,
    .right.bottom {
      border-radius: 28px 0;
    }
  }

  h1 {
    text-align: center;
    margin-bottom: 56px;
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

::v-deep {
  .el-form-item {
    background-color: unset !important;
    margin-bottom: 32px;
  }
  .el-form-item__content {
    text-align: center;
  }
  .el-form-item__error {
    top: 103%;
    left: 10px;
  }
  .el-input__inner {
    height: 72px;
    width: 440px;
    background-color: #fff !important;
    border: 1px solid #999999 !important;
    border-radius: 14px;
    color: #7d7d7d !important;
    font-weight: 400;
    font-size: 28px;
    padding-left: 74px;
    padding-right: 68px;
    line-height: 74px;
  }
  .el-input__icon {
    color: rgb(48, 169, 228);
    font-size: 38px;
    line-height: 74px;
    width: 60px;
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

    margin-top: 24px;
  }
  .el-button--primary {
    color: #fff !important;
    background-color: rgb(48, 169, 228) !important;
    border-color: #136ce4 !important;
    border-radius: 35px;
    width: 278px;
    height: 60px;
    font-size: 32px;
  }
  .el-checkbox__input {
    line-height: 20px;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  .el-checkbox__label {
    color: #fff;
    line-height: 20px;
    font-size: 18px;
  }
}
</style>
