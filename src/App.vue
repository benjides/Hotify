<template>
<div id="app">
  <header>
    <span class="title">{{app}}</span>
  </header>
  <div class="container">
    <span class="hero">Spotify Playlists Tinder-like</span>
    <login v-if="!id"></login>
    <rooster v-if="id" ></rooster>
  </div>
  <loading :show="loading"></loading>
</div>

</template>

<script>

import { getHashParams } from './functions'
import Config from './config'
import Login from './components/Login'
import Rooster from './components/Rooster'
import Loading from './components/Loading'

export default {
  name: 'app',
  components: {
    Login,
    Rooster,
    Loading
  },
  data () {
    return {
      app: Config.app,
      id: null,
      loading: false
    }
  },
  created () {
    let accessToken = getHashParams().access_token
    if (!accessToken) {
      return
    }
    window.location.hash = ''
    this.loading = true
    this.$store.dispatch('init', {accessToken}).then(id => {
      this.id = id
      this.loading = false
    })
  }
}

</script>

<style lang="stylus">
  @require './assets/style/main'

  header
    height 55px
    display flex
    align-items center
    justify-content center
    .title
      font-family 'Montserrat', sans-serif
      font-size 30px
      font-weight 900
      letter-spacing -2px
      text-transform uppercase
      color white
      background-color $primary-color
      padding 4px 8px
  .hero
    color $primary-color
    font-size 42px
    transform rotate(90deg)
    transform-origin left
    position absolute
    left 10px
    font-weight 900

</style>
