import Vue from 'vue'
import slides from '~/services/slides.js'
export const state = () => ({})
export const mutations = {
    SET_SLIDES(state, payload) {
        Vue.set(state, [payload.type], payload.slides)
    }
}
export const actions = {
    async get(context, payload) {
        try {
            if (typeof context.state[payload] !== 'undefined') {
                return context.state[payload]
            }
            const { data: response } = await slides.get(payload)
            context.commit('SET_SLIDES', {
                type: payload,
                slides: response
            })
        } catch (error) {
            return Promise.reject(error)
        }
        return context.state[payload]
    }
}
