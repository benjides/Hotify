<template>
  <div class="pile">
    <v-touch tag="div"
    @swipeleft="discardTrack"
    @swiperight="addTrack"
    @pan="pan" @panend="release"
    class="track"
    id="track-0"
    :style="style">
      <img :src="tracks[0].album.images[0].url" :alt="tracks[0].name">
    </v-touch>
    <div class="track" id="track-1">
      <img :src="tracks[1].album.images[0].url" :alt="tracks[1].name">
    </div>
    <div class="track" id="track-2">
      <img :src="tracks[2].album.images[0].url" :alt="tracks[2].name">
    </div>
  </div>
</template>

<script>
export default {
  name: 'track-pile',
  data () {
    return {
      x: 0,
      width: screen.width / 2
    }
  },
  props: {
    tracks: Array
  },
  computed: {
    style () {
      let x = this.x / this.width * 100
      let deg = this.x / this.width * 13
      let opacity = 1.2 - Math.abs(this.x / this.width)
      return {
        'transform': `rotate(${deg}deg) translate3d(${x}%, 0px, 0px)`,
        'opacity': opacity
      }
    }
  },
  methods: {
    pan (e) {
      this.x = e.deltaX
    },
    discardTrack () {
      this.release()
      this.$emit('discardTrack')
    },
    addTrack () {
      this.release()
      this.$emit('addTrack')
    },
    release () {
      this.x = 0
    }
  }
}
</script>

<style lang="stylus">

@require '../assets/style/colors'

.pile
  margin 0px 0 50px 0
  .track
    position absolute
    &:last-child
      position relative
    img
      display block
      margin 0 auto
      border 5px solid $main-white
      width 80%

#track-0
  z-index 10
#track-1
  z-index 9
  transform translate3d(15px, 15px, 0)
#track-2
  z-index 8
  transform translate3d(30px, 30px, 0)

@keyframes release
  to
    transform rotate(0deg) translate3d(0px, 0px, 0px)
    opacity 1

</style>
