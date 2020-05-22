<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core';

  export default {
    name: 'Scroll',
    props: {
      // 默认情况下BScroll是不可以实时的监听滚动位置
      // probeType: 0和1 都是不侦测实时的位置
      // probeType: 2 在手指滚动的过程中侦测,手指离开后的惯性滚动过程不侦测
      // probeType: 3 只要是滚动,都侦测
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, 20);
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          bounce: {
            top: false,
            bottom: true,
            left: true,
            right: true
          },
          probeType: this.probeType,
          click: this.click
        });

        // 2.监听滚动的位置
        if (this.listenScroll) {
          let me = this;
          this.scroll.on('scroll', pos => {
            me.$emit('scroll', pos);
          });
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: {
      // 一旦data发生变化，刷新better-scroll
      data() {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      }
    }
  };
</script>

<style scoped>
</style>
