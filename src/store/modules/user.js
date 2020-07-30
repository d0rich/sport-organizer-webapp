import axios from 'axios'
import crypto from 'crypto'

const decipher_token = function(token) {
  if (token) {
    const [enc_header, enc_payload, enc_signature] = token.split(".")
    const header = JSON.parse(Buffer.from(enc_header, 'base64').toString('ascii'))
    const payload = JSON.parse(Buffer.from(enc_payload, 'base64').toString('ascii'))
    const signature = Buffer.from(enc_signature, 'base64').toString('ascii')
    if (crypto.createHmac('sha256', 'S4vEHyg69aLL1uLLlk4').update(`${enc_header}.${enc_payload}`).digest('hex') == signature) {
      return { header, payload }
    } else {
      localStorage.removeItem('token')
      return null
    }
  }
}

export default {
  state: {
    status: '',
    auth_user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    set_auth_user(state, userData) {
      state.auth_user = userData
    },
    set_status(state, status) {
      state.status = status
    },
    set_token(state, token = null) {
      if (token == null)
        state.token = localStorage.getItem('token')
      else {
        localStorage.setItem('token', token)
        state.token = token
      }
    },
    del_token(state) {
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  actions: {
    fetch_auth_user(ctx, id = '') {
      axios
        .get(`${ctx.rootState.server}/user?id=${id}`)
        .then(response => {
          ctx.commit('set_auth_user', response.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    login(ctx, token = null) {
      ctx.commit('set_token', token)
      token = ctx.state.token
      const decToken = decipher_token(token)
      if (decToken != null) {
        ctx.dispatch('fetch_auth_user', decToken.payload.userID)
      } else {
        ctx.dispatch('logout')
      }
    },
    logout(ctx) {
      ctx.commit('set_auth_user', null)
      ctx.commit('del_token')
    }
  },
  getters: {
    auth_status(state) {
      if (state.auth_user) return true
      else return false
    },
    get_auth_user(state) {
      return state.auth_user
    },
    auth_username(state) {
      if (state.auth_user)
        return `${state.auth_user.Name} ${state.auth_user.Surname}`
      else return ''
    },
    auth_login(state) {
      if (state.auth_user)
        return state.auth_user.Login
      else return ''
    },
    user_confirmed(state) {
      if (state.auth_user == null) return true
      if (state.auth_user.ActivateCode == null) return true
      else return false
    }
  }
}