<template>
  <div class="report">
    <!-- 头部区 -->
    <router-link class="phone-icon icon-btn_return" tag="span" to="/record"></router-link>
    <div class="header">
      <span>举报</span>
    </div>
    <!-- 举报区 -->

  </div>
</template>

<script>
  export default {
    name: 'Report'
  };
</script>

<style lang="scss" scoped>
.report {
  width: 100%;
  height: 100%;
  margin: 0 auto;
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
}
</style>
