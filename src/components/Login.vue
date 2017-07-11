<template>
  <div class="login">
    <div class="disclaimer">
      <h2>
        Spotify Playlists Tinder-like
      </h2>
    </div>
    <div class="center">
      <a :href="auth" class="button">
        <i class="fa fa-spotify" aria-hidden="true"></i>Sign In with Spotify
      </a>
    </div>
    <div class="github center">
      <a href="https://github.com/benjides/Hotify" target="_blank">
        <i class="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</div>

</template>


<script>

import { auth } from '.././api'

export default {
  computed: {
    auth () {
      return auth()
    }
  }
}

</script>

<style lang="stylus">
  @require '../assets/style/colors'
  .disclaimer
    display block
    text-align end
    padding 0 20px
    h2
      color $primary-text
      padding 20px
      border 5px solid black
      font-size 40px
      position relative
      font-family 'Montserrat'
      z-index 10
      box-shadow 12px 12px 0px 0px

  .center
    display flex
    justify-content center
    margin-top 10px
    .fa-spotify
      color $green
      font-size 40px
      margin-right 10px

.github
  width 100%
  position absolute
  bottom 90px
  margin 10px 0
  a:visited, a:link
    color $primary-text
  i
    font-size 40px

</style>
