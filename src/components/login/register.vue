<template>
  <div class="register-form">
    <!-- 请输入手机号码 -->
    <div class="register-position">
      <input class="register-tel" type="tel" placeholder="请输入手机号码" v-model="tel" />
      <span class="clear-tel icon-fork" @click="clearTel()" v-show="tel"></span>
    </div>
    <!-- 请输入验证码 -->
    <div class="register-position">
      <input
        class="register-tel verificationcode"
        type="tel"
        placeholder="请输入验证码"
        v-model="verificationcode"
      />
      <button class="sand" :disabled="show" @click="sendVerificationCode">获取验证码</button>
    </div>
    <!-- 请输入密码 -->
    <div class="register-position">
      <input
        ref="displayPassword1"
        class="register-tel"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
      <span class="display-password icon-ai-eye" @click="displayPassword1"></span>
    </div>
    <!-- 请确认密码 -->
    <div class="register-position">
      <input
        ref="displayPassword2"
        class="register-last"
        type="password"
        placeholder="请确认密码"
        v-model="confirmpassword"
      />
      <span class="display-password icon-ai-eye" @click="displayPassword2"></span>
    </div>
    <div class="information">
      <van-checkbox v-model="checked" checked-color="#AC63FB">请在同意前认真阅读下方协议：《用户服务协议》</van-checkbox>
    </div>
    <!-- 注册 -->
    <button class="login-button" @click="registerButton()">注册</button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Checkbox } from 'vant';
  Vue.use(Checkbox);

  export default {
    name: 'Register',
    data() {
      return {
        tel: '',
        verificationcode: '',
        password: '',
        confirmpassword: '',
        checked: false,

        show: false,
        count: '',
        timer: null
      };
    },
    methods: {
      // 清除手机号
      clearTel() {
        this.tel = '';
      },
      // 发送验证码
      sendVerificationCode(event) {
        // 验证码60秒倒计时
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              event.target.innerText = `重新发送(${this.count})`;
              event.target.style.color = '#999';
            } else {
              this.show = false;
              clearInterval(this.timer);
              this.timer = null;
              event.target.innerText = '重新发送';
              event.target.style.color = '#AC63FB';
            }
          }, 1000);
        }
      },
      // 显示密码
      displayPassword1(event) {
        if (this.$refs.displayPassword1.type === 'password') {
          this.$refs.displayPassword1.type = 'text';
          event.target.style.color = '#AC63FB';
        } else {
          this.$refs.displayPassword1.type = 'password';
          event.target.style.color = '#4d4d4d';
        }
      },
      displayPassword2(event) {
        if (this.$refs.displayPassword2.type === 'password') {
          this.$refs.displayPassword2.type = 'text';
          event.target.style.color = '#AC63FB';
        } else {
          this.$refs.displayPassword2.type = 'password';
          event.target.style.color = '#4d4d4d';
        }
      },
      // 注册
      registerButton() {}
    }
  };
</script>

<style lang="scss" scoped>
.register-form {
  text-align: center;
  input {
    width: 6.06rem;
    height: 0.8rem;
    padding-left: 0.09rem;
    padding-right: 0.35rem;
    border-bottom: 2px solid #e6e6e6;
    font-size: 0.3rem;
    &::-webkit-input-placeholder {
      color: #9b9b9b;
    }
  }
  .register-tel {
    margin-bottom: 0.8rem;
  }
  .verificationcode {
    padding-right: 3.5rem;
  }
  .sand {
    position: absolute;
    top: 0.25rem;
    right: 0;
    color: #ac63fb;
    font-size: 0.3rem;
    background-color: #fff;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -0.25rem;
      width: 0.01rem;
      height: 0.3rem;
      display: block;
      background: #ccc;
    }
  }
  .register-position {
    position: relative;
  }

  // 清除手机号
  .clear-tel {
    position: absolute;
    top: 0.25rem;
    right: 0;
    width: 0.3rem;
    height: 0.3rem;
    padding-top: 0.02rem;
    font-family: "iconfont";
    background-color: #b2b2b2;
    color: #fff;
    font-size: 0.2rem;
    border-radius: 0.17rem;
  }

  // 显示密码
  .display-password {
    position: absolute;
    top: 0.2rem;
    right: 0;
    font-family: "iconfont";
    color: #4d4d4d;
    font-size: 0.4rem;
  }
  .register-last {
    margin-bottom: 0.35rem;
  }
  .information {
    margin-bottom: 0.36rem;
    font-size: 0.25rem;
  }
  .login-button {
    display: block;
    width: 6.06rem;
    height: 0.95rem;
    margin: 0 auto;
    background-color: #ac63fb;
    line-height: 0.95rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
    border-radius: 47px;
  }
  .login-button:active {
    opacity: 0.9;
  }
}
</style>
