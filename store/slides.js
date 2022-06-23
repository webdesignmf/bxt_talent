import Vue from 'vue'
import slides from '~/services/slides.js'
export const state = () => ({})
export const mutations = {
    SET_SLIDES(state, payload) {
        const sections = {}
        payload.slides.forEach((slide) => {
            if (!Object.keys(sections).includes(slide.section)) {
                sections[slide.section] = []
            }
            sections[slide.section].push(slide)
        })
        console.log(sections)

        Vue.set(state, 'all', sections)
    }
}
export const actions = {
    async get(context, payload) {
        try {
            const { data: response } = await slides.get()
            context.commit('SET_SLIDES', {
                slides: response
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
