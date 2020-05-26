<template>
  <div class="bindWechat">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/user"></router-link>
    <div class="header">
      <span>微信</span>
    </div>
    <!-- 绑定区 -->
    <div class="reason">
      <van-cell title="微信号" is-link value="请填写" />
    </div>
    <div class="reason">
      <van-cell title="微信二维码">
        <template #right-icon>
          <i class="wechatma icon-iconfonterweima"></i>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
// import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'BindWechat',
    data() {
      return {};
    },
    methods: {}
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
  }
  .phone-icon {
    position: absolute;
    top: 0.26rem;
    left: 0.2rem;
    font-family: "iconfont";
    font-size: 0.45rem;
  }
  .reason {
    width: 95%;
    height: 1.2rem;
    margin: 0.4rem auto;
    padding-top: 0.16rem;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);
    border-radius: 10px;
    background-color: #fff;
    .wechatma {
      font-family: "iconfont";
      color: #4d4d4d;
      font-size: 0.5rem;
    }
  }
}
</style>
