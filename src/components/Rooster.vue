<template>
  <div class="rooster">
    <track-pile></track-pile>
    <div class="info">
      <audio-player :audio="audio"></audio-player>
      <div class="track-info">
        <span class="title">{{title}}</span>
        <br>
        <span>{{artist}} | {{album}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TrackPile from './TrackPile'
import AudioPlayer from './AudioPlayer'

export default {
  components: {
    TrackPile,
    AudioPlayer
  },
  methods: {
    addTrack () {
      this.$store.dispatch('addTrack').then(() => console.log('Track Added'))
    },
    discardTrack () {
      this.$store.dispatch('dimissTrack').then(() => console.log('Track Removed'))
    }
  },
  computed: {
    title () {
      return this.$store.getters.head.name
    },
    artist () {
      return this.$store.getters.head.album.artists.map(artist => artist.name).join(' & ')
    },
    album () {
      return this.$store.getters.head.album.name
    },
    audio () {
      return this.$store.getters.head.preview_url
    }
  }
}
</script>

<style lang="stylus">
  @require '../assets/style/colors'

  .info
    padding 0 10px
  .track-info
    margin 15px 0
    .title
      text-decoration line-through
      font-size 25px
    span
      font-size 20px
      font-family 'Space Mono'
      padding 5px
      background-color $primary-text
      color white

</style>
