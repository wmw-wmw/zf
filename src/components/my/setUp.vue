<template>
  <div class="bindWechat">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/user"></router-link>
    <div class="header">
      <span>修改密码</span>
    </div>
    <!-- 密码修改区 -->
    <div>
      <van-field v-model="oldPassword" type="password" label="旧密码" placeholder="请输入旧密码" />
      <van-field v-model="password1" type="password" label="新密码" placeholder="请输入新密码" />
      <van-field v-model="password2" type="password" label="确认密码" placeholder="请确认密码" />
    </div>
    <van-button class="button" type="primary" block color="#ac63fb" round @click="setup">保存</van-button>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'SetUp',
    data() {
      return {
        oldPassword: '', // 旧密码
        password1: '',
        password2: '',
        user: JSON.parse(localStorage.getItem('userInf'))
      };
    },
    methods: {
      setup() {
        if (this.oldPassword === '') {
          this.$toast.fail('请输入旧密码');
        } else if (this.password1 === '') {
          this.$toast.fail('请输入新密码');
        } else if (this.password1 !== this.password2) {
          this.$toast.fail('两次输入密码不一致');
        } else {
          // 修改密码交互
          this.setupPost();
        }
      },
      async setupPost() {
        const res = await this.$http.post('api/updateUserbyPwd', {
          mobile: this.user.mobile,
          password: this.oldPassword,
          passwordTwo: this.password1
        });
        console.log(res);
        if (res.code !== SUCC_CODE) return this.$toast.fail('修改失败');
        this.$toast.success('修改成功');
        // 1. 通过编程式导航跳转到用户页，路由地址 /user
        setTimeout(() => {
          this.$router.push('/user');
        }, 2000);
      }
    }
  };
</script>
<style lang="scss" scoped>
.bindWechat {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #f5f5f5;

  // 头部区
  .header {
    width: 100%;
    height: 0.9rem;
    padding: 0 0.25rem;
    color: #333333;
    line-height: 1rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 700;
    background-color: #fff;
    margin-bottom: 0.3rem;
  }
  .phone-icon {
    position: absolute;
    top: 0.26rem;
    left: 0.2rem;
    font-family: "iconfont";
    font-size: 0.45rem;
  }
  .button {
    margin: 0 auto;
    margin-top: 2rem;
    width: 6rem;
    font-size: 0.3rem;
  }
}
</style>
