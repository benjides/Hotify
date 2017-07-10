import Vue from 'vue'
import Vuex from 'vuex'
import { me, createPlaylist, top, recommendations, addTrack } from '@/api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accessToken: null,
    id: null,
    playlist: null,
    tracks: []
  },
  actions: {
    init: ({ commit, dispatch }, { accessToken }) => {
      commit('SET_TOKEN', { accessToken })
      return dispatch('getId').then(id => {
        return dispatch('getPlaylist')
      }).then(playlist => {
        return dispatch('getRecommendations')
      })
    },
    getId: ({ commit, state }) => {
      let id = localStorage.getItem('userId')
      if (id) {
        commit('SET_ID', { id })
        return Promise.resolve(id)
      }
      return me(state.accessToken).then(res => {
        id = res.data.id
        commit('SET_ID', { id })
        window.localStorage.setItem('userId', id)
        return id
      })
    },
    getPlaylist: ({ commit, state }) => {
      let playlist = localStorage.getItem('playlistId')
      if (playlist) {
        commit('SET_PLAYLIST_ID', { playlist })
        return Promise.resolve(playlist)
      }
      return createPlaylist(state.accessToken, state.id).then(res => {
        playlist = res.data.id
        commit('SET_PLAYLIST_ID', { playlist })
        window.localStorage.setItem('playlistId', playlist)
        return playlist
      })
    },
    getRecommendations: ({commit, state}) => {
      return top(state.accessToken, 'artists').then(res => {
        let artists = res.data.items.map(item => item.id).join(',')
        return recommendations(state.accessToken, artists)
      }).then(res => {
        commit('SET_TRACKS', { tracks: res.data.tracks })
        return state.id
      })
    },
    addTrack: ({ commit, state }) => {
      commit('POP_TRACK')
      return addTrack(state.accessToken, state.id, state.playlist, state.tracks[0].id)
    },
    dimissTrack: ({ commit, state }) => {
      commit('POP_TRACK')
      return Promise.resolve()
    }
  },
  mutations: {
    SET_TOKEN: (state, { accessToken }) => {
      state.accessToken = accessToken
    },
    SET_ID: (state, { id }) => {
      state.id = id
    },
    SET_PLAYLIST_ID: (state, { playlist }) => {
      state.playlist = playlist
    },
    SET_TRACKS: (state, { tracks }) => {
      tracks.map((track, i) => {
        Vue.set(state.tracks, i, track)
      })
    },
    POP_TRACK: (state) => {
      state.tracks = state.tracks.splice(1)
    }
  },
  getters: {
    tracks: state => {
      return state.tracks.slice(0, 3)
    }
  }
})

export default store
