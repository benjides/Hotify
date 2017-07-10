import {APP, CLIENT_ID, REDIRECT_URI, SCOPES} from './.env.js'

export default {
  auth: {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    state: APP,
    scope: SCOPES.join(' '),
    show_dialog: 'false'
  },
  app: APP,
  description: 'Spotify Playlists Tinder-like'
}
