import Vue from 'vue'
import { config } from '~/services/config.js'
import login from '~/services/login.js'
import forms from '~/services/forms.js'
export const state = () => ({
    token: {
        mf: '',
        panel: ''
    },
    loading: false,
    baseUrl: process.env.BASE_URL,
    locale: ''
})

export const getters = {
    loading: (state) => state.loading
}

export const mutations = {
    SET_TOKEN(state, payload) {
        Vue.set(state.token, 'mf', payload.mf)
        Vue.set(state.token, 'panel', payload.panel)
        config('integration', payload.mf)
        config('panel', payload.panel)
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    SET_OPTIONS(state, payload) {
        state.options = payload
    },
    SET_LANG(state, payload) {
        state.locale = payload
    }
}

export const actions = {
    async nuxtServerInit({ commit }, { $config }) {
        const integration = login.mf({
            salt: $config.MF_SALT,
            api_key: $config.MF_API_KEY
        })
        const panel = login.panel({
            salt: $config.PANEL_SALT,
            api_token: $config.PANEL_API_TOKEN
        })
        const [{ data: responseMF }, { data: responsePanel }] =
            await Promise.all([integration, panel])
        await commit('SET_TOKEN', {
            mf: responseMF.access_token
                ? `Bearer ${responseMF.access_token}`
                : '',
            panel: responsePanel.access_token
                ? `Bearer ${responsePanel.access_token}`
                : ''
        })
    },
    async updateLoad({ commit }, payload) {
        await commit('SET_LOAD', payload)
    },
    async contact(context, payload) {
        await forms.contact(payload)
    },
    async getScouted(context, payload) {
        await forms.getScouted(payload)
    },
    async getOptions({ commit }, payload) {
        const { data } = await forms.options(payload)
        commit('SET_OPTIONS', data)
    },
    setLocale({ commit }, payload) {
        commit('SET_LOADING', true)
        commit('SET_LANG', payload)
        setTimeout(function () {
            commit('SET_LOADING', false)
        }, 600)
    },
    setLoading({ commit }, payload) {
        commit('SET_LOADING', payload)
    }
}
