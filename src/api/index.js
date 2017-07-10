import axios from 'axios'
import { toQueryString } from '@/functions'
import Config from '../config.js'
const SPOTIFY = 'https://api.spotify.com/v1/'
const headers = {}

export function auth () {
  return `https://accounts.spotify.com/authorize?${toQueryString(Config.auth)}`
}

export function me (accessToken) {
  headers.Authorization = `Bearer ${accessToken}`
  return axios.get(`${SPOTIFY}me`, { headers })
}

export function createPlaylist (accessToken, userId) {
  headers.Authorization = `Bearer ${accessToken}`
  let data = {
    name: Config.app,
    description: `${Config.description}. Made with ${Config.auth.redirect_uri}`
  }
  return axios.post(`${SPOTIFY}users/${userId}/playlists`, data, { headers })
}

export function top (accessToken, type) {
  headers.Authorization = `Bearer ${accessToken}`
  let params = {
    limit: 5
  }
  return axios.get(`${SPOTIFY}me/top/${type}`, { headers, params })
}

export function recommendations (accessToken, artists) {
  headers.Authorization = `Bearer ${accessToken}`
  let params = {
    limit: 100,
    seed_artists: artists
  }
  return axios.get(`${SPOTIFY}recommendations`, { headers, params })
}

export function addTrack (accessToken, userId, playlistId, trackId) {
  headers.Authorization = `Bearer ${accessToken}`
  let data = {
    uris: ['spotify:track:' + trackId]
  }
  return axios.post(`${SPOTIFY}users/${userId}/playlists/${playlistId}/tracks`, data, { headers })
}
