<template>
  <div class="bindWechat">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/user"></router-link>
    <div class="header">
      <span>手机号验证</span>
    </div>
    <!-- 信息区 -->
    <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="verificationcode" center clearable label="验证码" placeholder="请输入短信验证码">
      <template #button>
        <van-button size="small" type="primary" color="#ac63fb" @click="sendVerificationCode">发送验证码</van-button>
      </template>
    </van-field>
    <van-button class="button" type="primary" block color="#ac63fb" round @click="apply()">提交</van-button>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'PhoneText',
    data() {
      return {
        tel: '',
        verificationcode: ''
      };
    },
    methods: {
      // 发送验证码
      async sendVerificationCode(event) {
        // 校验手机号
        const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.tel === '') {
          this.$toast.fail('请输入手机号');
        } else if (!reg.test(this.tel)) {
          this.$toast.fail('手机号格式不正确');
        } else {
          // 发送验证码
          const res = await this.$http.get('YanzhengCode/downCode', {
            params: { mobileCode: this.tel }
          });
          if (res.code !== SUCC_CODE) return this.$toast.fail('验证码发送失败');
          this.$toast.success('验证码发送成功');
        }
      },
      // 提交验证
      async apply() {
        const res = await this.$http.post('api/userAll/mobileCode', {
          mobile: this.tel,
          codeNum: this.verificationcode
        });
        // console.log(res);
        if (res.code !== SUCC_CODE) return this.$toast.fail('手机号验证失败');
        this.$toast.success('手机号验证成功');
        // 1. 通过编程式导航跳转到手机号验证页，路由地址是 /phoneText
        this.$router.push('/phoneText');
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
