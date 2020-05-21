<template>
  <div class="container">
    <div class="title">
      <div :class="{'active': titleActive === '登录' }" @click="login()">登录</div>
      <div :class="{'active': titleActive === '注册' }" @click="register()">注册</div>
    </div>
    <!-- 登录区 -->
    <div class="login-form" v-if="index===1">
      <!-- 请输入手机号码 -->
      <div class="login-position">
        <input
          class="login-tel"
          type="tel"
          name="user"
          placeholder="请输入手机号码"
          autocomplete="off"
          v-model="tel"
          @input="changeInput()"
        />
        <span class="clear-tel icon-fork" @click="clearTel()" v-show="tel"></span>
      </div>
      <!-- 请输入密码 -->
      <div class="login-position">
        <input
          ref="displayPassword"
          class="login-password"
          type="password"
          name="password"
          placeholder="请输入密码"
          autocomplete="off"
          v-model="password"
          @input="changeInput()"
        />
        <span class="display-password icon-ai-eye" @click="displayPassword"></span>
      </div>
      <!-- 错误信息 -->
      <div class="message icon-gantanhao" v-if="showMessage">{{message}}</div>
      <!-- 登录 -->
      <button class="login-button" @click="loginButton()">登录</button>
      <div class="login-other">
        <router-link tag="span" to="/login/phone">验证码登陆</router-link>
        <router-link tag="span" to="/login/forget">忘记密码？</router-link>
      </div>
    </div>
    <!-- 注册区 -->
    <register v-if="index===2"></register>

    <!-- 底部图片 -->
    <div class="login-banner"></div>
  </div>
</template>

<script>
  import Register from './register';
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'Login',
    components: {
      Register
    },
    data() {
      return {
        titleActive: '登录',
        tel: '',
        password: '',
        index: 1,
        // 校验变量
        message: '',
        showMessage: false
      };
    },
    methods: {
      login() {
        this.titleActive = '登录';
        this.index = 1;
      },
      register() {
        this.titleActive = '注册';
        this.index = 2;
      },

      // 清除手机号
      clearTel() {
        this.tel = '';
        this.showMessage = false;
      },

      // 显示密码
      displayPassword(event) {
        if (this.$refs.displayPassword.type === 'password') {
          this.$refs.displayPassword.type = 'text';
          event.target.style.color = '#ac63fb';
        } else {
          this.$refs.displayPassword.type = 'password';
          event.target.style.color = '#4d4d4d';
        }
      },

      // 登录
      loginButton() {
        // 校验
        const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.tel === '') {
          this.message = '请输入手机号';
          this.showMessage = true;
        } else if (!reg.test(this.tel)) {
          this.message = '手机号格式不正确';
          this.showMessage = true;
        } else if (this.password === '') {
          this.message = '请输入密码';
          this.showMessage = true;
        } else {
          // 登录交互
          this.loginButtonPost();
        }
      },
      // 登录交互
      async loginButtonPost() {
        const res = await this.$http.post('api/login', {
          mobile: this.tel,
          password: this.password
        });
        if (res.code !== SUCC_CODE) return this.$toast.fail('手机号或密码不正确');
        this.$toast.success('登录成功');
        // 1. 将登录成功之后的 token，保存到客户端的 localStorage 中
        localStorage.setItem('token', res.token);
        // 获取用户信息
        const res1 = await this.$http.get('/api/userInfo', {
          params: { token: res.token }
        });
        console.log(res1);
        localStorage.setItem('userInf', JSON.stringify(res1.user));
        // 2. 通过编程式导航跳转到主页，路由地址是 /select
        this.$router.push('/select');
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
  .title {
    margin-bottom: 1.5rem;
    text-align: center;
    div {
      display: inline-block;
      width: 2.2rem;
      height: 0.75rem;
      color: $colorB;
      font-size: 0.4rem;
      border-bottom: 1px solid $colorD;
    }
    .active {
      color: $colorA;
      border-bottom: 2px solid $colorA;
    }
  }

  // 登录区
  .login-form {
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
    .login-tel {
      margin-bottom: 0.8rem;
    }
    .login-position {
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

    .login-password {
      margin-bottom: 1rem;
    }
    .login-button {
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
      // 点击闪动效果
      &:active {
        opacity: 0.9;
      }
    }

    .login-other {
      margin: 0 auto;
      margin-top: 0.5rem;
      width: 5.8rem;
      overflow: hidden;
      color: $colorA;
      font-size: 0.26rem;
      span:first-child {
        float: left;
      }
      span:last-child {
        float: right;
        color: #808080;
      }
    }
  }
  // 底部图片
  .login-banner {
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
    left: 0.7rem;
    top: 6.14rem;
    font-family: "iconfont";
    color: $colorA;
  }
}
</style>
