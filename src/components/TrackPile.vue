<template>
  <div class="pile">
    <v-touch tag="div"
    @swipeleft="discardTrack"
    @swiperight="addTrack"
    @pan="pan" @panend="release"
    class="track"
    id="track-0"
    :style="style">
      <img :src="$store.getters.head.album.images[0].url" :alt="$store.getters.head.name">
      <a :href="$store.getters.head.external_urls.spotify" target="_blank"></a>
    </v-touch>

    <div class="track" v-for="track in $store.getters.tracks">
      <img :src="track.album.images[0].url" :alt="track.name">
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
      this.$store.dispatch('discardTrack')
    },
    addTrack () {
      this.release()
      this.$store.dispatch('addTrack')
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
  margin 0px 0 40px 0
  position relative
  .track
    width 100%
    position absolute
    &:last-child
      position relative
    img
      display block
      margin 0 auto
      border 5px solid $main-white
      width 80%

.pile .track:nth-child(1)
  z-index 10
  a
    position absolute
    width 100%
    height 100%
    top 0
.pile .track:nth-child(2)
  z-index 9
  transform translate3d(15px, 15px, 0)
.pile .track:nth-child(3)
  z-index 8
  transform translate3d(30px, 30px, 0)
.pile .track:nth-child(n+4)
  z-index -1

</style>
