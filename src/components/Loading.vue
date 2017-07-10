<template lang="html">
  <transition name="fade">
    <div v-if="show" class="loading">
      <span>Loading</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: false
  }
}
</script>

<style lang="stylus">
  @require '../assets/style/colors'

  .loading
    position absolute
    width 100%
    height 100%
    background-color $main-white
    display flex
    justify-content center
    align-items center
    top 0
    z-index 100
    span
      font-size 50px

  .fade-enter-active, .fade-leave-active
    transition opacity .3s

  .fade-enter, .fade-leave-to
    opacity 0

</style>
