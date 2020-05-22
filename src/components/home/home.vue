<template>
  <div class="home">
    <!-- 头部区 -->
    <div class="header">
      <div class="header-left"></div>
      <div class="header-middle">
        <span>租房APP</span>
      </div>
      <div class="header-right" @click="getuser()"></div>
    </div>
    <div class="select-banner">
      <div class="title">为您匹配</div>
      <div class="describe">根据选择，为您匹配</div>
    </div>
    <!-- 顾问区 -->
    <scroll :data="adviserList" class="wrapper">
      <div class="adviser">
        <!-- 滑动 -->
        <div class="adviser-list" v-for="(item ,index) in adviserList" :key="item.userId">
          <div>
            <img class="adviser-img" :src="item.userImg" />
          </div>
          <div class="adviser-info">
            <div class="adviser-name">{{item.gwName}}</div>
            <van-tag
              class="adviser-subsidy"
              v-if="item.subsidyMoney"
            >补{{item.subsidyMoney}}/分{{item.installment}}期</van-tag>
            <van-tag class="adviser-subsidy">补300/分3期</van-tag>
          </div>
          <div class="adviser-weixin" @click="seeAdviser(index)" :ref="`seeAdviser${index}`">
            <span class="weixin icon-weixin"></span>
            <span>联系</span>
          </div>
        </div>
      </div>
    </scroll>
    <div class="home-bottom">
      <router-link to="/select" v-if="adviserList">
        <van-button class="button" type="primary" block color="#ac63fb" round>重填信息</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll';

  export default {
    name: 'Home',
    components: {
      Scroll
    },
    data() {
      return {
        area: this.$route.query.area, // select页传过来的参数
        userId: '',
        adviserList: [] // 顾问列表
      };
    },
    mounted() {
      this.getAdviser();
    },
    methods: {
      async getAdviser() {
        // 不登录就不显示租赁顾问
        if (localStorage.getItem('userInf')) {
          this.userId = JSON.parse(localStorage.getItem('userInf')).userId;
        } else {
          return this.$toast.fail('请先登录');
        }
        const res = await this.$http.get('api/userAll/listUserGwAll', {
          params: { areaParam: this.area, zhId: this.userId }
        });
        // console.log(res);
        this.adviserList = res.msg;
        console.log(this.adviserList);
      },
      // 查看顾问
      seeAdviser(index) {
        // 点击改变联系颜色
        this.$refs[`seeAdviser${index}`][0].style.color = 'black';
      },
      // 跳转用户信息页
      getuser() {
        if (!localStorage.getItem('token')) {
          this.$router.push('/login');
          this.$toast.fail('请先登录');
          return;
        }
        // const tok = localStorage.getItem('token');
        this.$router.push('/user');
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

// .wrapper {
//   width: 7.2rem;
//   margin: 0 auto;
//   position: absolute;
//   top: 0;
//   bottom: 52px;
//   left: 0;
//   right: 0;
//   height: 3rem;
//   overflow: hidden;
// }
.home {
  width: 100%;
  height: 100%;
  // 头部区
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.25rem;
    width: 100%;
    height: 0.9rem;
    color: #333333;
    font-size: 0.3rem;
    &-left {
      width: 0.6rem;
    }
    &-middle {
      flex: 1;
      text-align: center;
      font-size: 0.36rem;
      font-weight: 700;
    }
    &-right {
      width: 0.6rem;
      height: 0.6rem;
      background: url("./img/header-user.png") no-repeat center;
      background-size: contain;
    }
  }
  // banner区
  .select-banner {
    width: 6.35rem;
    height: 1.28rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    background: url("./img/home-banner.png") no-repeat center;
    background-size: contain;
    // 解决垂直外边距重叠
    overflow: hidden;
    .title {
      color: #1c1c1c;
      font-size: 0.42rem;
      text-align: center;
      letter-spacing: 0.05rem;
      margin-top: 0.15rem;
      margin-bottom: 0.22rem;
    }
    .describe {
      color: #7e7e7e;
      font-size: 0.28rem;
      text-align: center;
      letter-spacing: 0.06rem;
    }
  }
  // 顾问区
  .adviser-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7.1rem;
    height: 1.2rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    padding: 0 0.2rem;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);
    border-radius: 10px;
    .adviser-img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .adviser-info {
      width: 3.6rem;
      .adviser-name {
        color: #333333;
        font-size: 0.32rem;
      }
      .adviser-subsidy {
        background-color: $colorA;
        height: 0.35rem;
        line-height: 0.4rem;
        color: #ffffff;
        font-size: 0.2rem;
        padding: 0 0.08rem;
        margin-top: 0.15rem;
        border-radius: 4px;
      }
    }
    .adviser-weixin {
      display: flex;
      align-items: center;
      width: 1.6rem;
      height: 0.6rem;
      padding: 0 0.2rem;
      border: 1px solid $colorA;
      border-radius: 0.3rem;
      .weixin {
        font-family: "iconfont";
        font-size: 0.45rem;
        margin-right: 0.1rem;
      }
      &:last-child {
        font-size: 0.28rem;
        color: $colorA;
      }
    }
  }

  .home-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    margin-top: 0.5rem;
    .button {
      margin: 0 auto;
      width: 6.06rem;
      font-size: 0.3rem;
    }
  }
}
</style>
