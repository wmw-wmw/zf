<template>
  <div id="app" class="g-container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style lang="scss" scoped>
.g-container {
  overflow: hidden;
  position: relative;
  width: 7.5rem;
  height: 100%;
  margin: 0 auto;
}
</style>
