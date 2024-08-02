// src/store/index.js
import { createStore } from 'vuex'
import apiClient from '../plugins/axios'
import router from '@/router'

const store = createStore({
  state: {
    auth: {
      token: localStorage.getItem('token') || '',
      user: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.auth.token = token
      localStorage.setItem('token', token)
    },
    setUser(state, user) {
      state.auth.user = user
    },
    logout(state) {
      state.auth.token = ''
      state.auth.user = {}
      localStorage.removeItem('token')
    }
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await apiClient.post('/login', credentials)
        commit('setToken', response.data.token)
        await dispatch('fetchUser')
      } catch (error) {
        console.error('Error during login:', error)
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await apiClient.get('/user')
        commit('setUser', response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    logout({ commit }) {
      commit('logout')
      router.push({ name: 'Login' })
    }
  }
})

export default store
