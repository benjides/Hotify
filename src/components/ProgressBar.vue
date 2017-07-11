<template>
  <div class="progress">
    <div class="determinate" :style="{'width': progress + '%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    progress: 0
  }
}
</script>

<style lang="stylus">
  .progress
    position relative
    height 4px
    width 100%
    background-color #787878
    margin 0 10px
    .determinate
      position absolute
      background-color inherit
      top 0
      bottom 0
      background-color black
      transition width 1s linear
      &::after
        content ''
        width 15px
        height 15px
        background-color #000
        position absolute
        right -5px
        z-index 100
        top -5px
        border-radius 50px
</style>
