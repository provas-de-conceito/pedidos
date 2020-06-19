/* eslint-disable no-console */
import { GetterTree, ActionTree, MutationTree } from 'vuex'

import signIn from '../graphql/signIn.gql'
import signUp from '../graphql/signUp.gql'
import getCurrentUser from '../graphql/getCurrentUser.gql'

import allClientes from '../graphql/allClientes.gql'
import allProdutos from '../graphql/allProdutos.gql'
import allPedidos from '../graphql/allPedidos.gql'

export const state = () => ({
  loading: false,
  user: null,
  error: null
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_LOADING: (state, payload: boolean) => { state.loading = payload },
  SET_USER: (state, payload: any) => { state.user = payload },
  CLEAR_USER: (state) => { state.user = null },
  SET_ERROR: (state, payload: any) => { state.error = payload },
  CLEAR_ERROR: (state) => { state.error = null }
}

export const getters: GetterTree<RootState, RootState> = {
  isLoading: state => state.loading,
  currentUser: state => state.user
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getCurrentUser')
  },

  async getCurrentUser ({ commit }) {
    if (!this.app.$apolloHelpers.getToken()) {
      commit('CLEAR_ERROR')
      commit('CLEAR_USER')
      return
    }
    commit('SET_LOADING', true)
    try {
      const result = await this.app.apolloProvider.defaultClient.query({
        query: getCurrentUser
      })
      commit('SET_USER', result.data.getCurrentUser)
    } catch (error) {
      commit('SET_ERROR', error)
    }
    commit('SET_LOADING', false)
  },

  async signUp ({ commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    try {
      const result = await this.app.apolloProvider.defaultClient.mutate({
        mutation: signUp,
        variables: payload
      })
      await this.app.$apolloHelpers.onLogin(result.data.signUp.token)
      await dispatch('getCurrentUser')
    } catch (error) {
      commit('SET_ERROR', error)
    }
    commit('SET_LOADING', false)
  },

  async signIn ({ commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    try {
      const result = await this.app.apolloProvider.defaultClient.mutate({
        mutation: signIn,
        variables: payload
      })
      await this.app.$apolloHelpers.onLogin(result.data.signIn.token)
      await dispatch('getCurrentUser')
    } catch (error) {
      commit('SET_ERROR', error)
    }
    commit('SET_LOADING', false)
  },

  async allClientes ({ commit }) {
    commit('SET_LOADING', true)
    const result = await this.app.apolloProvider.defaultClient.query({
      query: allClientes
    })
    commit('SET_LOADING', false)
    return result
  },

  async allPedidos ({ commit }) {
    commit('SET_LOADING', true)
    const result = await this.app.apolloProvider.defaultClient.query({
      query: allPedidos
    })
    commit('SET_LOADING', false)
    return result
  },

  async allProdutos ({ commit }) {
    commit('SET_LOADING', true)
    const result = await this.app.apolloProvider.defaultClient.query({
      query: allProdutos
    })
    commit('SET_LOADING', false)
    return result
  }
}
