<template>
  <div class="audio-player">
    <i @click="toggle()" class="fa" :class="iconStatus" aria-hidden="true"></i>
    <progress-bar :progress="progress"></progress-bar>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'

export default {
  name: 'audio-player',
  components: {
    ProgressBar
  },
  props: {
    audio: ''
  },
  data () {
    return {
      player: new Audio(''),
      time: 0,
      duration: 0,
      status: 'PAUSED'
    }
  },
  created () {
    this.player.addEventListener('timeupdate', () => {
      this.time = this.player.currentTime
    })
    this.player.addEventListener('loadeddata', () => {
      this.duration = this.player.duration
      this.status = 'PAUSED'
      this.time = 0
    })
  },
  watch: {
    audio () {
      if (!this.audio) {
        this.status = 'ERROR'
        this.player.pause()
        return
      }
      this.player.src = this.audio
    }
  },
  computed: {
    progress () {
      return Math.ceil((this.time / this.duration) * 100)
    },
    iconStatus () {
      switch (this.status) {
        case 'PLAYING':
          return 'fa-pause'
        case 'PAUSED':
          return 'fa-play'
        case 'ERROR':
          return 'fa-sad'
      }
    }
  },
  methods: {
    toggle () {
      switch (this.status) {
        case 'PLAYING':
          this.status = 'PAUSED'
          return this.player.pause()
        case 'PAUSED':
          this.status = 'PLAYING'
          return this.player.play()
        case 'ERROR':
          return
      }
    }
  }

}
</script>

<style lang="stylus">
  .audio-player
    position relative
    display flex
    align-items center
    i
      color black
      border 5px solid black
      font-size 20px
      padding 8px 10px
      margin 5px 15px 5px 0
      box-shadow 4px 4px 0px 0px
    .fa-sad
      padding 8px
      &::before
        content ":("
        font-family 'Space Mono'
        white-space nowrap
        font-weight 900
</style>
