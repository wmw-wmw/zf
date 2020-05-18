<template>
  <div class="home">
    <div class="header">
      <div class="header-left">
        <i></i>
        <span>郑州</span>
      </div>
      <div class="header-middle">
        <span>租房APP</span>
      </div>
      <a @click="getuser(这里获取用户信息)" href="javascript:;" class="header-right"></a>
    </div>
    <div class="home-banner">
      <div class="title">选择意向信息</div>
      <div class="describe">根据选择，更精准推荐</div>
    </div>
    <div class="home-choice">
      <div class="choice-area" @click="selectArea">
        <i class="left"></i>
        <span>请选择意向区域</span>
        <i class="right"></i>
      </div>
      <div class="choice-area">
        <i class="metro"></i>
        <span>请选择地铁口</span>
        <i class="right"></i>
      </div>
      <div class="choice-area">
        <i class="price"></i>
        <span>请选择价格区间</span>
        <i class="right"></i>
      </div>
      <div class="button">提交</div>
    </div>

    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {};
    },
    methods: {
      selectArea() {}
    }
  };
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 0.9rem;
  color: #333333;
  font-size: 0.3rem;
}
.header-left {
  display: flex;
  margin: 0 0.3rem;
}
.header-left i {
  display: block;
  width: 0.22rem;
  height: 0.37rem;
  margin-right: 0.14rem;
  background: url("./img/header-left.png") no-repeat center;
  background-size: cover;
}

.header-middle {
  flex: 1;
  text-align: center;
  font-size: 0.36rem;
  font-weight: 700;
}

.header-right {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 0.3rem;
  background: url("./img/header-user.png") no-repeat center;
  background-size: cover;
}

.home-banner {
  width: 6.35rem;
  height: 1.28rem;
  margin: 0.3rem 0.56rem 1.42rem;
  background: url("./img/home-banner.png") no-repeat center;
  background-size: contain;
  overflow: hidden;
}

.home-banner .title {
  color: #1c1c1c;
  font-size: 0.42rem;
  text-align: center;
  letter-spacing: 0.06rem;
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
}
.home-banner .describe {
  color: #7e7e7e;
  font-size: 0.28rem;
  text-align: center;
  letter-spacing: 0.06rem;
}

.home-choice {
  padding: 0 0.45rem;
}

.choice-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 6.6rem;
  height: 0.84rem;
  padding: 0 0.4rem;
  border-radius: 0.42rem;
  background-color: #ededed;
  font-size: 0.36rem;
  color: #cccccc;
}

.choice-area .left {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background: url("./img/area-servic.png") no-repeat center;
  background-size: cover;
}

.choice-area .right {
  display: block;
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border-top: 0.2rem solid #cccccc;
  border-right: 0.2rem solid transparent;
  border-bottom: 0.2rem solid transparent;
  border-left: 0.2rem solid transparent;
  margin-top: 0.26rem;
}

.choice-area:nth-child(2) {
  margin: 0.88rem 0;
}

.choice-area .metro {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background: url("./img/metro.png") no-repeat center;
  background-size: cover;
}

.choice-area .price {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background: url("./img/price.png") no-repeat center;
  background-size: cover;
}
.button {
  width: 6.69rem;
  height: 0.95rem;
  margin-top: 1.7rem;
  background: url("./img/button.png") no-repeat center;
  background-size: cover;
  color: #ffffff;
  font-size: 0.36rem;
  text-align: center;
  line-height: 0.85rem;
}
</style>
