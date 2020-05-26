<template>
  <div class="bindWechat">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/phoneText"></router-link>
    <div class="header">
      <span>申请成为租赁顾问</span>
    </div>
    <!-- 信息区 -->
    <img src="../img/pay.png" />
    <div class="text">
      <p>您的资料已提交，现需缴纳88元/年审核费用</p>
      <!-- <p>你的信息已提交，我们将在1-3个工作日内 进行审核，请耐心等待...</p> -->
    </div>
    <van-button class="button" type="primary" block color="#ac63fb" round>支付</van-button>
  </div>
</template>

<script>
// import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'ApplyAdviserFinish',
    data() {
      return {
        user: JSON.parse(localStorage.getItem('userInf'))
      };
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
.bindWechat {
  width: 100%;
  height: 100%;
  margin: 0 auto;

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
  img {
    display: block;
    width: 5.54rem;
    height: 3.64rem;
    margin: 2rem auto 0;
  }
  .text {
    width: 5.6rem;
    margin: 0.32rem auto 0;
    color: #333333;
    font-size: 0.28rem;
    text-align: center;
  }
  .button {
    margin: 0 auto;
    margin-top: 2rem;
    width: 6rem;
    font-size: 0.3rem;
  }
}
</style>
