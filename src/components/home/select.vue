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
      <div class="header-right" @click="getuser()"></div>
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
      <button class="select-button" @click="button()">提交</button>
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
        showPicker: false, // 控制弹出隐藏

        columns: [], // 配置每一列显示的数据
        areaList: [], // 总数据
        region: [], // 区域变量
        subwayLine: [], // 地铁线
        priceList: ['300-500', '500-800', '800-1000', '1000-1500', '1500以上'], // 价格范围

        area: '请选择意向区域',
        metro: '请选择地铁口',
        price: '请选择价格区间',
        index: ''
      };
    },
    mounted() {
      this.getArea();
    },
    methods: {
      // 获取数据
      async getArea() {
        const res = await this.$http.get('api/areaMetro/list');
        if (res.code !== SUCC_CODE) return this.$toast.fail('请求失败');
        console.log(res);
        res.msg.forEach(item => {
          // 页面加载拿到区域名称
          this.region.push(item.areaName);
        });
        // 保存总数据
        this.areaList = res.msg;
      },
      onConfirm(value) {
        if (this.index === 1) {
          this.area = value;
          // 清空地铁线,不然每次循环都在末尾追加线路
          this.subwayLine = [];
          // index = 1的时候就循环准备好index =2的columns数据
          const { listMetro } = this.areaList.find(item => {
            // 从areaList[]中找到areaName与area相同的对象
            return item.areaName === value;
          });
          // console.log(listMetro);

          listMetro.forEach(item => {
            const metroLineText = {};
            metroLineText.text = item.metroName;
            // console.log(metroLineText);

            const { stationName } = item;
            const children = [];
            stationName.forEach(item1 => {
              const { subwayStation } = item1;
              const subway = {};
              subway.text = subwayStation;
              // console.log(subway);
              children.push(subway);
            });
            // console.log(children);
            metroLineText.children = children;
            // console.log(metroLineText);
            this.subwayLine.push(metroLineText);
          // console.log(this.subwayLine);
          });
        } else if (this.index === 2) {
          this.metro = value[0] + '-' + value[1];
        } else if (this.index === 3) {
          this.price = value;
        }
        this.showPicker = false;
      },

      // 选择
      showPic(index) {
        this.index = index;
        if (index === 1) {
          this.columns = this.region;
        } else if (index === 2 && this.area === '请选择意向区域') {
          return this.$toast.fail('请先选择区域');
        } else if (index === 2) {
          this.columns = this.subwayLine;
        } else if (index === 3) {
          this.columns = this.priceList;
        }
        this.showPicker = true;
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
      },
      // 提交选项
      button() {
        if (this.area === '请选择意向区域' && this.metro === '请选择地铁口') {
          return this.$toast.fail('您有未选项');
        }
        this.$store.commit('changeArea', this.area);
        this.$router.push({
          path: '/home'
        // query: {
        //   area: this.area
        // }
        });
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
