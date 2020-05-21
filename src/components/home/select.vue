<template>
  <div class="select">
    <!-- 头部区 -->
    <div class="header">
      <div class="header-left">
        <i class="icon-dingwei"></i>
        <span>郑州</span>
      </div>
      <div class="header-middle">
        <span>租房APP</span>
      </div>
      <router-link tag="div" to="/user">
        <div class="header-right" @click="getuser(这里获取用户信息)"></div>
      </router-link>
    </div>
    <div class="select-banner">
      <div class="title">选择意向信息</div>
      <div class="describe">根据选择，更精准推荐</div>
    </div>
    <!-- 选择区 -->
    <div class="select-choice">
      <div class="choice-option" @click="showPic(1)">
        <i class="left area"></i>
        <span :class="{'black':area!='请选择意向区域'}">{{area}}</span>
        <i class="right icon-sanjiao"></i>
      </div>
      <div class="choice-option" @click="showPic(2)">
        <i class="left metro"></i>
        <span :class="{'black':metro!='请选择地铁口'}">{{metro}}</span>
        <i class="right icon-sanjiao"></i>
      </div>
      <div class="choice-option" @click="showPic(3)">
        <i class="left price"></i>
        <span :class="{'black':price!='请选择价格区间'}">{{price}}</span>
        <i class="right icon-sanjiao"></i>
      </div>
      <button class="select-button">提交</button>
      <!-- 弹出层 -->
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'Choice',
    data() {
      return {
        showPicker: false,
        columns: [],
        columns1: [],
        area: '请选择意向区域',
        metro: '请选择地铁口',
        price: '请选择价格区间',
        areaList: [],
        index: ''
      // index: ''
      // areaName: []
      };
    },
    mounted() {
      this.getArea();
    },
    methods: {
      onConfirm(area) {
        if (this.index === 1) {
          this.area = area;
        }
        if (this.index === 2) {
          this.metro = area[1];
        }
        this.showPicker = false;
      },
      // 获取数据
      async getArea() {
        const res = await this.$http.get('api/areaMetro/list');
        if (res.code !== SUCC_CODE) return this.$toast.fail('请求失败');
        console.log(res);
        res.msg.forEach(item => {
          this.columns.push(item.areaName);
        });
        this.areaList = res.msg;
      },
      // 选择
      showPic(index) {
        this.showPicker = true;

        this.index = index;
        if (index === 2) {
          if (this.area === '请选择意向区域') {
            return this.$toast.fail('请先选择区域');
          }
          const { listMetro: findMetro } = this.areaList.find(item => {
            return item.areaName === this.area;
          });
          // console.log(findMetro);
          findMetro.forEach(item => {
            const metroLine = {};
            metroLine.text = item.metroName;
            const { stationName: station } = item;
            const children = [];
            station.forEach(item1 => {
              const { subwayStation: subway } = item1;
              const subway1 = {};
              subway1.text = subway;
              console.log(subway1);
              // console.log(subway);
              children.push(subway1);
            });
            // console.log(children);
            metroLine.children = children;
            console.log(metroLine);
            this.columns1.push(metroLine);
            // console.log(station);
            console.log(this.columns1);
            this.columns = [];
            this.columns = this.columns1;
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

.select {
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
      display: flex;
      align-items: center;
      i {
        font-family: "iconfont";
        font-size: 0.45rem;
        margin-right: 0.08rem;
      }
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
    margin-bottom: 1.42rem;
    background: url("./img/select-banner.png") no-repeat center;
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
  // 选择区
  .select-choice {
    width: 6.6rem;
    margin: 0 auto;
    .choice-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6.6rem;
      height: 0.84rem;
      padding: 0 0.4rem;
      border-radius: 0.42rem;
      background-color: #ededed;
      font-size: 0.36rem;
      color: $colorB;
      .left {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
      }
      .area {
        background: url("./img/area-servic.png") no-repeat center;
        background-size: contain;
      }
      .metro {
        background: url("./img/metro.png") no-repeat center;
        background-size: contain;
      }
      .price {
        background: url("./img/price.png") no-repeat center;
        background-size: contain;
      }
      .right {
        font-family: "iconfont";
        font-size: 0.2rem;
        margin-top: 0.1rem;
      }
    }
    .choice-option:nth-child(2) {
      margin: 0.88rem 0;
    }
    .select-button {
      display: block;
      width: 6.06rem;
      height: 0.95rem;
      margin: 0 auto;
      margin-top: 1.8rem;
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
    .black {
      color: black;
    }
  }
}
</style>
