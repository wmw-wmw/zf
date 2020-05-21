<template>
  <div>00000000000000000</div>
</template>

<script>
  export default {
    name: 'Home',
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
      // console.log(this.adviserList);
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
