<template>
  <div class="user">
    <router-link class="phone-icon icon-btn_return" tag="span" to="/home"></router-link>

    <div class="header">
      <div>
        <img src="./img/user.png" />
      </div>
      <span>15939483070</span>
    </div>
    <div class="contact">
      <router-link tag="div" to="/record">
        <div class="consultation first">
          <span class="zixun icon-zixun"></span>
          <span class="span-flex">咨询记录</span>
          <span class="gointo icon-jinru"></span>
        </div>
      </router-link>
      <div class="consultation">
        <span class="zixun icon-weixin"></span>
        <span class="span-flex">绑定微信</span>
        <span class="gointo icon-jinru"></span>
      </div>
    </div>
    <div class="adviser">
      <span class="icon1"></span>
      <span class="span-flex">申请成为租赁顾问</span>
      <span class="gointo icon-jinru"></span>
    </div>
    <div class="adviser set">
      <span class="zixun icon-shezhi"></span>
      <span class="span-flex">账号密码</span>
      <span class="gointo icon-jinru"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'My',
    data() {
      return {};
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

.user {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url("./img/user-bc.png") no-repeat top;
  background-size: contain;
  overflow: hidden;
  background-color: #f5f5f5;
  .phone-icon {
    position: absolute;
    top: 0.26rem;
    left: 0.2rem;
    font-family: "iconfont";
    font-size: 0.45rem;
    color: #fff;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 6.7rem;
    height: 1.8rem;
    margin: 0 auto;
    margin-top: 2.5rem;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: -1.23rem;
      margin-bottom: 0.4rem;
      border-radius: 50%;
    }
  }
  // 联系
  .contact {
    width: 6.7rem;
    height: 2.4rem;
    margin: 0.4rem auto;
    padding: 0 0.3rem;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);
    .first {
      border-bottom: 1px solid #ccc;
    }
    .consultation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.2rem;
      line-height: 1.2rem;
    }
  }
  .zixun {
    font-family: "iconfont";
    font-size: 0.5rem;
    color: $colorA;
    margin-right: 0.4rem;
  }
  .gointo {
    font-family: "iconfont";
    font-size: 0.4rem;
    float: right;
  }
  // 申请顾问
  .adviser {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 6.7rem;
    height: 1.2rem;
    margin: 0 auto;
    padding: 0 0.3rem;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);
    .icon1 {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url("./img/user-vip.png") no-repeat center;
      background-size: contain;
      margin-right: 0.4rem;
    }
    .icon2 {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url("./img/user-gl.png") no-repeat center;
      background-size: contain;
      margin-right: 0.4rem;
    }
  }
  .set {
    margin-top: 0.4rem;
  }
  .span-flex {
    flex: 1;
  }
}
</style>
