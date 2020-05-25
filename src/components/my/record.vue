<template>
  <div class="home">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/user"></router-link>
    <div class="header">
      <span>咨询记录</span>
    </div>

    <!-- 顾问区 -->
    <van-empty description="无联系租赁顾问" v-if="!adviserList.length" />
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
              v-if="item.guaranteeMoney===guarantee"
            >补{{item.subsidyMoney}}/分{{item.installment}}期</van-tag>
            <!-- <van-tag class="adviser-subsidy">补300/分3期</van-tag> -->
          </div>
          <div class="adviser-weixin">
            <span
              class="weixin icon-weixin"
              @click="seeAdviser(index,item)"
              :ref="`seeAdviser${index}`"
            ></span>
            <router-link tag="span" to="/report">举报</router-link>
          </div>
        </div>
      </div>
    </scroll>
    <div class="home-bottom">
      <router-link to="/select">
        <van-button class="button" type="primary" block color="#ac63fb" round>重填信息</van-button>
      </router-link>
    </div>
    <!-- 弹出遮罩层 -->
    <van-overlay :show="show" @click="show = false">
      <div class="showOverlay">
        <img :src="imgSrc" class="block" />
        <span class="weixin-phone">微信号 {{weixinPhone}}</span>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import Scroll from 'base/scroll';

  export default {
    name: 'Record',
    components: {
      Scroll
    },
    data() {
      return {
        adviserList: [], // 顾问列表
        guarantee: 100, // 保证金变量
        show: false, // 弹出遮罩层
        imgSrc: '', // 微信二维码路径
        weixinPhone: '', // 微信手机号
        user: JSON.parse(localStorage.getItem('userInf'))
      };
    },
    mounted() {
      this.getAdviser();
    },
    methods: {
      async getAdviser() {
        const res = await this.$http.post('api/userAll/userListBrowseRecord', {
          userId: this.user.userId
        });
        // console.log(res);
        this.adviserList = res.msg;
      // console.log(this.adviserList);
      },
      // 查看顾问
      seeAdviser(index, item) {
        // 点击改变联系颜色
        this.$refs[`seeAdviser${index}`][0].style.color = 'black';
        this.imgSrc = item.wechatImg;
        // console.log(this.imgSrc);
        this.weixinPhone = item.wechatUsername;
        // console.log(this.weixinPhone);

        this.show = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

.wrapper {
  // width: 100%;
  position: absolute;
  top: 0.9rem;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  overflow: hidden;
}
.home {
  width: 100%;
  height: 100%;
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
  }
  .phone-icon {
    position: absolute;
    top: 0.26rem;
    left: 0.2rem;
    font-family: "iconfont";
    font-size: 0.45rem;
  }

  // 顾问区
  .adviser {
    padding-top: 0.01rem;
    padding-bottom: 0.3rem;
  }

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
      .weixin {
        font-family: "iconfont";
        font-size: 0.5rem;
        margin-right: 0.35rem;
        color: $colorA;
      }
      &:last-child {
        color: $colorB;
      }
    }
  }

  .home-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    background-color: #fff;
    .button {
      margin: 0 auto;
      margin-top: 0.3rem;
      width: 6.06rem;
      font-size: 0.3rem;
    }
  }
}
// 弹出遮罩层
.showOverlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 5rem;
    height: 5rem;
  }
  .weixin-phone {
    position: absolute;
    bottom: 1.5rem;
    left: 0.75rem;
    width: 6rem;
    height: 0.9rem;
    background-color: #fff;
    line-height: 0.9rem;
    text-align: center;
    border-radius: 10px;
  }
}
</style>
