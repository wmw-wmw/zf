<template>
  <div class="register-form">
    <!-- 请输入手机号码 -->
    <div class="register-position">
      <input
        class="register-tel"
        type="tel"
        name="phone"
        placeholder="请输入手机号码"
        v-model="tel"
        autocomplete="off"
        @input="changeInput()"
      />
      <span class="clear-tel icon-fork" @click="clearTel()" v-show="tel"></span>
    </div>
    <!-- 请输入验证码 -->
    <div class="register-position">
      <input
        class="register-tel verificationcode"
        type="number"
        name="verificationcode"
        placeholder="请输入验证码"
        v-model="verificationcode"
        @input="changeInput()"
      />
      <button class="sand" :disabled="show" @click="sendVerificationCode">获取验证码</button>
    </div>
    <!-- 请输入密码 -->
    <div class="register-position">
      <input
        ref="displayPassword1"
        class="register-tel"
        type="password"
        name="password"
        placeholder="请输入密码"
        v-model="password"
        @input="changeInput()"
      />
      <span class="display-password icon-ai-eye" @click="displayPassword1"></span>
    </div>
    <!-- 请确认密码 -->
    <div class="register-position">
      <input
        ref="displayPassword2"
        class="register-last"
        type="password"
        name="confirmpassword"
        placeholder="请确认密码"
        v-model="confirmpassword"
        @input="changeInput()"
      />
      <span class="display-password icon-ai-eye" @click="displayPassword2"></span>
    </div>
    <div class="information" @click="service()">
      <van-checkbox v-model="checked" checked-color="#ac63fb">请在同意前认真阅读下方协议：《用户服务协议》</van-checkbox>
    </div>
    <!-- 错误信息 -->
    <div class="message icon-gantanhao" v-if="showMessage">{{message}}</div>
    <!-- 注册 -->
    <button class="login-button" @click="registerButton()">注册</button>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'Register',
    data() {
      return {
        tel: '',
        verificationcode: '',
        password: '',
        confirmpassword: '',
        checked: false,
        // 校验变量
        message: '',
        showMessage: false,
        // 验证码变量
        show: false,
        count: '',
        timer: null
      };
    },
    methods: {
      // 清除手机号
      clearTel() {
        this.tel = '';
        this.showMessage = false;
      },
      // 显示密码
      displayPassword1(event) {
        if (this.$refs.displayPassword1.type === 'password') {
          this.$refs.displayPassword1.type = 'text';
          event.target.style.color = '#ac63fb';
        } else {
          this.$refs.displayPassword1.type = 'password';
          event.target.style.color = '#4d4d4d';
        }
      },
      displayPassword2(event) {
        if (this.$refs.displayPassword2.type === 'password') {
          this.$refs.displayPassword2.type = 'text';
          event.target.style.color = '#ac63fb';
        } else {
          this.$refs.displayPassword2.type = 'password';
          event.target.style.color = '#4d4d4d';
        }
      },
      // 发送验证码
      async sendVerificationCode(event) {
        // 校验手机号
        const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.tel === '') {
          this.message = '请输入手机号';
          this.showMessage = true;
        } else if (!reg.test(this.tel)) {
          this.message = '手机号格式不正确';
          this.showMessage = true;
        } else {
          // 判断用户是否存在
          const user = await this.$http.post('api/register/getfalseUser', {
            mobile: this.tel
          });
          if (user.code === 500) return this.$toast.fail('此用户已存在');
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
                event.target.style.color = '#ac63fb';
              }
            }, 1000);
          }
          // 发送验证码
          const res = await this.$http.get('YanzhengCode/downCode', {
            params: { mobileCode: this.tel }
          });
          if (res.code !== SUCC_CODE) return this.$toast.fail('验证码发送失败');
          this.$toast.success('验证码发送成功');
        }
      },

      // 注册
      registerButton() {
        // 校验
        const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.tel === '') {
          this.message = '请输入手机号';
          this.showMessage = true;
        } else if (!reg.test(this.tel)) {
          this.message = '手机号格式不正确';
          this.showMessage = true;
        } else if (this.verificationcode === '') {
          this.message = '请输入验证码';
          this.showMessage = true;
        } else if (this.password === '') {
          this.message = '请输入密码';
          this.showMessage = true;
        } else if (this.password !== this.confirmpassword) {
          this.message = '两次输入密码不一致';
          this.showMessage = true;
        } else if (this.checked === false) {
          this.message = '请勾选用户协议';
          this.showMessage = true;
        } else {
          // 注册交互
          this.registerButtonPost();
        }
      },
      // 注册交互
      async registerButtonPost() {
        const res = await this.$http.post('api/register/register', {
          mobile: this.tel,
          password: this.password,
          verifyCode: this.verificationcode
        });
        if (res.code !== SUCC_CODE) return this.$toast.fail('未知异常');
        this.$toast.success('注册成功');
        // 1. 通过编程式导航跳转到登录页，延迟2秒跳转，路由地址 /login
        const tim = window.setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        window.clearTimeout(tim);
      },
      // 同意服务
      service() {
        this.showMessage = false;
      },
      changeInput() {
        this.showMessage = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

// 注册区
.register-form {
  text-align: center;
  input {
    width: 6.06rem;
    height: 0.8rem;
    padding-left: 0.09rem;
    padding-right: 0.35rem;
    border-bottom: 2px solid $colorD;
    font-size: 0.3rem;
    &::-webkit-input-placeholder {
      color: $colorB;
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
    color: $colorA;
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
    margin-bottom: 1rem;
    font-size: 0.25rem;
  }
  .login-button {
    display: block;
    width: 6.06rem;
    height: 0.95rem;
    margin: 0 auto;
    background-color: $colorA;
    line-height: 0.95rem;
    text-align: center;
    color: $colorC;
    font-size: 0.4rem;
    border-radius: 47px;
  }
  // 点击闪动效果
  .login-button:active {
    opacity: 0.9;
  }
  // 错误信息
  .message {
    position: absolute;
    z-index: 10;
    left: 0.72rem;
    top: 10rem;
    font-family: "iconfont";
    color: $colorA;
  }
}
</style>
