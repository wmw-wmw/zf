<template>
  <div class="container">
    <router-link class="phone-icon icon-btn_return" tag="span" to="/login"></router-link>
    <div class="title">
      <div>手机号登录</div>
    </div>
    <div class="phone-form">
      <!-- 请输入手机号码 -->
      <div class="phone-position">
        <input
          class="phone-tel"
          type="tel"
          placeholder="请输入手机号码"
          name="user"
          v-model="tel"
          autocomplete="off"
          @input="changeInput()"
        />
        <span class="clear-tel icon-fork" @click="clearTel()" v-show="tel"></span>
      </div>
      <!-- 请输入验证码 -->
      <div class="phone-position">
        <input
          class="phone-last verificationcode"
          type="number"
          name="verificationcode"
          placeholder="请输入验证码"
          v-model="verificationcode"
          @input="changeInput()"
        />
        <button class="sand" :disabled="show" @click="sendVerificationCode">获取验证码</button>
      </div>
      <div class="information" @click="service()">
        <van-checkbox v-model="checked" checked-color="#ac63fb">请在同意前认真阅读下方协议：《用户服务协议》</van-checkbox>
      </div>
      <!-- 错误信息 -->
      <div class="message icon-gantanhao" v-if="showMessage">{{message}}</div>
      <!-- 验证登录 -->
      <button class="phone-button" @click="phoneButton()">验证登录</button>
    </div>
    <div class="login-password">
      <router-link tag="span" to="/login">密码登录</router-link>
    </div>

    <!-- 底部图片 -->
    <div class="phone-banner"></div>
  </div>
</template>

<script>
  export default {
    name: 'phone',
    data() {
      return {
        tel: '',
        verificationcode: '',
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
              event.target.style.color = '#ac63fb';
            }
          }, 1000);
        }
      },
      // 同意服务
      service() {
        this.showMessage = false;
      },
      // 验证登录
      phoneButton() {
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
        } else if (this.checked === false) {
          this.message = '请勾选用户协议';
          this.showMessage = true;
        } else {
        }
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
  .phone-icon {
    position: absolute;
    top: 0.26rem;
    left: 0.2rem;
    font-family: "iconfont";
    font-size: 0.45rem;
  }
  .title {
    margin-bottom: 1.6rem;
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
  .phone-form {
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
    .phone-tel {
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
    .phone-position {
      position: relative;
    }
    .phone-last {
      margin-bottom: 0.35rem;
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
    .information {
      font-size: 0.25rem;
    }
    .phone-button {
      display: block;
      width: 6.06rem;
      height: 0.95rem;
      margin: 0 auto;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      background-color: $colorA;
      line-height: 0.95rem;
      text-align: center;
      color: $colorC;
      font-size: 0.4rem;
      border-radius: 47px;
    }
    // 点击闪动效果
    .phone-button:active {
      opacity: 0.9;
    }
  }
  .login-password {
    width: 100%;
    text-align: center;
    color: $colorA;
    font-size: 0.26rem;
  }
  .phone-banner {
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
    top: 7.02rem;
    font-family: "iconfont";
    color: $colorA;
  }
}
</style>
