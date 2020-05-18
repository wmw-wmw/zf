<template>
  <div class="container">
    <router-link class="forget-icon icon-btn_return" tag="span" to="/login"></router-link>
    <div class="title">
      <div>忘记密码</div>
    </div>
    <div class="forget-form">
      <!-- 请输入手机号码 -->
      <div class="forget-position">
        <input
          class="forget-tel"
          type="tel"
          placeholder="请输入手机号码"
          v-model="tel"
          autocomplete="off"
          name="user"
          @input="changeInput()"
        />
        <span class="clear-tel icon-fork" @click="clearTel()" v-show="tel"></span>
      </div>
      <!-- 请输入验证码 -->
      <div class="forget-position">
        <input
          class="forget-tel verificationcode"
          type="tel"
          name="verificationcode"
          placeholder="请输入验证码"
          v-model="verificationcode"
          @input="changeInput()"
        />
        <button class="sand" :disabled="show" @click="sendVerificationCode">获取验证码</button>
      </div>
      <!-- 请输入新密码 -->
      <div class="forget-position">
        <input
          ref="displayPassword1"
          class="forget-tel"
          type="password"
          name="password"
          placeholder="请输入新密码"
          v-model="password"
          @input="changeInput()"
        />
        <span class="display-password icon-ai-eye" @click="displayPassword1"></span>
      </div>
      <!-- 请确认密码 -->
      <div class="forget-position">
        <input
          ref="displayPassword2"
          class="forget-last"
          type="password"
          name="confirmpassword"
          placeholder="请确认密码"
          v-model="confirmpassword"
          @input="changeInput()"
        />
        <span class="display-password icon-ai-eye" @click="displayPassword2"></span>
      </div>
      <!-- 错误信息 -->
      <div class="message icon-gantanhao" v-if="showMessage">{{message}}</div>
      <!-- 确认 -->
      <button class="forget-button" @click="forgetButton()">确认</button>
    </div>
    <!-- 底部图片 -->
    <div class="forget-banner"></div>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'Forget',
    data() {
      return {
        tel: '',
        verificationcode: '',
        password: '',
        confirmpassword: '',
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
      // 修改密码
      forgetButton() {
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
        } else {
          // 修改密码交互
          this.forgetButtonPost();
        }
      },
      // 修改密码交互
      async forgetButtonPost() {
        const res = await this.$http.post('api/register/forgetPwd', {
          mobile: this.tel,
          password: this.password,
          passwordTwo: this.confirmpassword,
          verifyCode: this.verificationcode
        });
        if (res.code !== SUCC_CODE) return this.$toast.fail('修改失败');
        this.$toast.success('修改成功');
        // 1. 通过编程式导航跳转到登录页，路由地址 /login
        this.$router.push('/login');
      },
      changeInput() {
        this.showMessage = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

.container {
  width: 100%;
  height: 100%;
  padding: 1.1rem 0.7rem 0 0.7rem;
  .forget-icon {
    position: absolute;
    top: 0.26rem;
    left: 0.2rem;
    font-family: "iconfont";
    font-size: 0.45rem;
  }
  .title {
    margin-bottom: 1.5rem;
    text-align: center;
    div {
      display: inline-block;
      width: 4.3rem;
      height: 0.75rem;
      color: $colorA;
      font-size: 0.4rem;
      border-bottom: 2px solid $colorA;
    }
  }
  .forget-form {
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
    .forget-tel {
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
    .forget-position {
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
    .forget-last {
      margin-bottom: 0.9rem;
    }
    .forget-button {
      display: block;
      width: 6.06rem;
      height: 0.95rem;
      margin: 0 auto;
      margin-top: 0.5rem;
      background-color: $colorA;
      line-height: 0.95rem;
      text-align: center;
      color: $colorC;
      font-size: 0.4rem;
      border-radius: 47px;
    }
    // 点击闪动效果
    .forget-button:active {
      opacity: 0.9;
    }
  }
  .forget-banner {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    height: 1.57rem;
    background: url("./img/login-banner.png") no-repeat center;
    background-size: cover;
  }
  // 错误信息
  .message {
    position: absolute;
    z-index: 10;
    left: 0.72rem;
    top: 9.5rem;
    font-family: "iconfont";
    color: $colorA;
  }
}
</style>
