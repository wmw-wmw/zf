<template>
  <div class="container">
    <router-link class="phone-icon icon-btn_return" tag="span" to="/login"></router-link>
    <div class="title">
      <div>手机号登录</div>
    </div>
    <div class="phone-form">
      <!-- 请输入手机号码 -->
      <div class="phone-position">
        <input class="phone-tel" type="tel" placeholder="请输入手机号码" v-model="tel" />
        <span class="clear-tel icon-fork" @click="clearTel()" v-show="tel"></span>
      </div>
      <!-- 请输入验证码 -->
      <div class="phone-position">
        <input
          class="phone-last verificationcode"
          type="tel"
          placeholder="请输入验证码"
          v-model="verificationcode"
        />
        <button class="sand" :disabled="show" @click="sendVerificationCode">获取验证码</button>
      </div>
      <div class="information">
        <van-checkbox v-model="checked" checked-color="#AC63FB">请在同意前认真阅读下方协议：《用户服务协议》</van-checkbox>
      </div>
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
  import Vue from 'vue';
  import { Checkbox } from 'vant';
  import 'vant/lib/checkbox/style';

  Vue.use(Checkbox);
  export default {
    name: 'phone',
    data() {
      return {
        tel: '',
        verificationcode: '',
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
      // 验证登录
      phoneButton() {}
    }
  };
</script>

<style lang="scss" scoped>
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
      color: #ac63fb;
      font-size: 0.4rem;
      border-bottom: 2px solid #ac63fb;
    }
  }
  .phone-form {
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
      margin-top: 0.4rem;
      margin-bottom: 0.5rem;
      background-color: #ac63fb;
      line-height: 0.95rem;
      text-align: center;
      color: #ffffff;
      font-size: 0.4rem;
      border-radius: 47px;
    }
    .phone-button:active {
      opacity: 0.9;
    }
  }
  .login-password {
    width: 100%;
    text-align: center;
    color: #ac63fb;
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
}
</style>
