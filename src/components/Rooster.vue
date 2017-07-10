<template>
  <div class="rooster">
    <track-pile
      :tracks="$store.getters.tracks"
      @discardTrack="discardTrack()"
      @addTrack="addTrack()">
    </track-pile>
    <div class="info">
      <div class="track-info">
        <span class="title">{{title}}</span>
        <br>
        <span>{{artist}} | {{album}}</span>
      </div>
      <div class="action-buttons">
        <button @click="discardTrack()" class="dislike">DISLIKE</button>
        <button @click="addTrack()" class="like">LIKE</button>
      </div>
    </div>
  </div>
</template>

<script>
import TrackPile from './TrackPile'

export default {
  components: {
    TrackPile
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
      return this.$store.state.tracks[0].name
    },
    artist () {
      return this.$store.state.tracks[0].album.artists.map(artist => artist.name).join(' & ')
    },
    album () {
      return this.$store.state.tracks[0].album.name
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

  .action-buttons
    display flex
    justify-content space-between
    padding-right 10px
    .dislike
      background-color $red
    .like
      background-color $green

</style>
