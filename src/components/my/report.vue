<template>
  <div class="report">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/record"></router-link>
    <div class="header">
      <span>举报</span>
    </div>
    <!-- 举报区 -->
    <div class="reason">
      <van-cell title="举报原因" is-link :value="value1" @click="showPicker = true" />
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 举报描述 -->
    <div class="describe">
      <span class="title">举报描述</span>
      <textarea placeholder="请输入举报描述" v-model="describe"></textarea>
      <div>
        <van-uploader
          v-model="fileList"
          :max-count="3"
          :max-size="8 * 1024 * 1024"
          :after-read="afterRead"
          @oversize="onOversize"
        />
        <p>{{fileList.length}}/3</p>
      </div>
    </div>
    <van-button class="button" type="primary" block color="#ac63fb" round @click="report">提交</van-button>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'Report',
    data() {
      return {
        showPicker: false, // 控制弹出隐藏
        columns: ['欺骗顾客', '不良行为', '其他'], // 配置每一列显示的数据
        value1: '请选择',
        describe: '',
        fileList: [],
        imgList: [], // 返回的图片路径
        gwID: this.$route.query.userId // 被举报顾问ID
      };
    },
    methods: {
      onConfirm(value) {
        this.value1 = value;
        this.showPicker = false;
      },
      // 图片上传
      async afterRead(file) {
        // console.log(file);
        const res = await this.$http.post('oss/uploadBase64', {
          file: file.content
        });
        this.imgList.push(res.imgUrl);
      // console.log(this.imgList);
      },
      onOversize(file) {
        this.$toast.fail('图片大小不能超过8M');
      },
      async report() {
        if (
          this.value1 !== '请选择' &&
          this.describe !== '' &&
          this.imgList.length !== 0
        ) {
          const res = await this.$http.post('api/report/saveReportJL', {
            userId: this.gwID,
            reportName: this.value1,
            description: this.describe,
            imger: this.imgList.join(',')
          });
          // console.log(res);
          if (res.code !== SUCC_CODE) return this.$toast.fail('举报失败');
          this.$toast.success('举报成功');
        } else {
          this.$toast.fail('请完善举报原因');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.report {
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
    padding-top: 0.18rem;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);
    border-radius: 10px;
    background-color: #fff;
  }
  // 举报描述
  .describe {
    width: 95%;
    margin: 0 auto;
    padding: 0.3rem 0.2rem;
    height: 7rem;
    font-size: 0.3rem;
    box-shadow: 0 3px 29px 0px rgba(4, 0, 0, 0.15);
    border-radius: 10px;
    background-color: #fff;
    .title {
      display: block;
      margin-bottom: 0.5rem;
    }
    textarea {
      width: 100%;
      height: 50%;
    }
  }

  .button {
    margin: 0 auto;
    margin-top: 1rem;
    width: 6rem;
    font-size: 0.3rem;
  }
}
</style>
