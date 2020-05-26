<template>
  <div class="bindWechat">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/user"></router-link>
    <div class="header">
      <span>申请成为租赁顾问</span>
    </div>
    <!-- 信息区 -->
    <div>
      <van-field v-model="adviserName" label="姓名" placeholder="请填写真实姓名" />
      <van-field v-model="adviserID" type="number" label="身份证号码" placeholder="请输入身份证号码" />
      <!-- 上传身份证 -->
      <div class="sfzID">
        <van-cell-group>
          <van-cell title="身份证正反面照片" value="点击图片添加照片" />
        </van-cell-group>
        <div class="user-id">
          <van-uploader :after-read="afterRead1" :max-size="5 * 1024 * 1024" @oversize="onOversize">
            <img src="../img/user-id-1.png" class="user-id-1" ref="userId1" />
          </van-uploader>

          <van-uploader :after-read="afterRead2" :max-size="5 * 1024 * 1024" @oversize="onOversize">
            <img src="../img/user-id-2.png" class="user-id-2" ref="userId2" />
          </van-uploader>
          <p class="text">
            温馨提示：
            <br />1、拍摄正面照时，请确保姓名，证件号码等信息清晰可见。
            <br />2、拍摄反面照时，请确保签发机关，有效期限清晰可见。
            <br />3、请填写真实信息，以便平台进行审核。
          </p>
        </div>
      </div>
      <van-button class="button" type="primary" block color="#ac63fb" round @click="goNext()">下一步</van-button>
    </div>
  </div>
</template>

<script>
  import { SUCC_CODE } from 'api/config.js';

  export default {
    name: 'ApplyAdviser',
    data() {
      return {
        adviserName: '',
        adviserID: '',
        user: JSON.parse(localStorage.getItem('userInf')),
        imgList: [] // 返回的图片路径
      };
    },
    methods: {
      // 正面照上传
      async afterRead1(file) {
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true
        });
        // console.log(file);
        const res = await this.$http.post('oss/uploadBase64', {
          file: file.content
        });
        if (res.code !== SUCC_CODE) return this.$toast.fail('上传失败');
        this.$refs.userId1.src = res.imgUrl;
        this.imgList[0] = res.imgUrl;
      // console.log(this.imgList);
      },
      // 反面照上传
      async afterRead2(file) {
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true
        });
        // console.log(file);
        const res = await this.$http.post('oss/uploadBase64', {
          file: file.content
        });
        if (res.code !== SUCC_CODE) return this.$toast.fail('上传失败');
        this.$refs.userId2.src = res.imgUrl;
        this.imgList[1] = res.imgUrl;
      // console.log(this.imgList);
      },
      onOversize(file) {
        this.$toast.fail('图片大小不能超过5M');
      },
      goNext() {
        if (!this.adviserName.trim()) {
          this.$toast.fail('请输入姓名');
        } else if (!this.adviserID.trim()) {
          this.$toast.fail('请输入身份证号');
        } else if (
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.adviserID.trim())
        ) {
          this.$toast.fail('身份证号格式错误');
        } else if (this.imgList.length !== 2) {
          this.$toast.fail('请上传照片');
        } else {
          this.apply();
        }
      },
      // 申请
      async apply() {
        const res = await this.$http.post('api/userAll/updateGwMsgById', {
          userId: this.user.userId,
          mobile: this.user.mobile,
          gwName: this.adviserName,
          identityCardNum: this.adviserID,
          identityCardImgReverse: this.imgList[0],
          identityCardImgFront: this.imgList[1]
        });
        // console.log(res);
        if (res.code !== SUCC_CODE) return this.$toast.fail('提交失败');
        this.$toast.success('提交成功');
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
  // 上传身份证
  .sfzID {
    width: 100%;
    height: 5.5rem;
    background-color: #fff;
    margin-top: 0.3rem;
    .user-id {
      width: 89%;
      margin: 0 auto;
      margin-top: 0.3rem;
    }
    .user-id-1,
    .user-id-2 {
      width: 3.2rem;
      height: 2.12rem;
    }
    .user-id-2 {
      margin-left: 0.25rem;
    }
    .text {
      margin-top: 0.3rem;
      color: #aaa;
      font-size: 0.25rem;
      line-height: 0.4rem;
    }
  }
}
</style>
