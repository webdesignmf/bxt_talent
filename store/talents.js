import Vue from 'vue'
import talents from '~/services/talents.js'
export const state = () => ({
    favorites: {}
})
export const mutations = {
    SET_TALENTS(state, payload) {
        state[payload.type] = payload.talents
        Vue.set(state, 'categoryActive', payload.type)
    },
    SET_TALENT(state, payload) {
        state.profile = payload
    },
    ADD_FAVORITE(state, payload) {
        Vue.set(state.favorites, [payload.id], payload)
        window.localStorage.setItem(
            'favorites',
            JSON.stringify(state.favorites)
        )
    },
    DELETE_FAVORITE(state, payload) {
        if (state.favorites[payload.id]) {
            Vue.delete(state.favorites, payload.id)
        }
        window.localStorage.setItem(
            'favorites',
            JSON.stringify(state.favorites)
        )
    },
    SET_FAVORITES(state, payload) {
        state.favorites = payload
    }
}
export const actions = {
    async get(context, payload) {
        try {
            const { type, filters, paginate } = payload
            if (typeof context.state[type] !== 'undefined') {
                return context.state[type]
            }
            const { data: response } = await talents.get({
                filters,
                paginate
            })
            context.commit('SET_TALENTS', {
                type,
                talents: response.data
            })
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async setFavorite({ commit }, talent) {
        await commit('ADD_FAVORITE', talent)
        return true
    },
    async deleteFavorite({ commit }, talent) {
        await commit('DELETE_FAVORITE', talent)
        return true
    },
    async initFavorites({ commit }, payload) {
        await commit('SET_FAVORITES', payload)
        return true
    },
    async getTalent({ commit }, payload) {
        try {
            const { data: response } = await talents.getTalent(payload)
            commit('SET_TALENT', response)
        } catch (error) {
            return Promise.reject(error)
        }
        return true
    }
}
