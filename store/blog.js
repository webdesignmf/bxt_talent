import Vue from 'vue'
import blog from '~/services/blog.js'
export const state = () => ({})
export const mutations = {
    SET_BLOG(state, payload) {
        Vue.set(state, [payload.type], payload.blog)
    },
    ADD_ITEMS_BLOG(state, payload) {
        payload.blog.forEach((post) => state[payload.type].data.push(post))

        state[payload.type].current_page++
    },
    SET_BLOG_POST(state, post) {
        Vue.set(state, 'post', post)
    }
}
export const actions = {
    async get(context, type) {
        try {
            if (typeof context.state[type] !== 'undefined') {
                return context.state[type]
            }
            const response = await blog.get(type, {
                paginate: 10
            })
            context.commit('SET_BLOG', {
                type,
                blog: response.data
            })
        } catch (error) {
            return Promise.reject(error)
        }
        return context.state[type]
    },
    async getMore(context, payload) {
        try {
            const { type, page } = payload
            const { data: response } = await blog.get(type, {
                paginate: 6,
                page
            })
            context.commit('ADD_ITEMS_BLOG', {
                type,
                blog: response.data
            })
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async getPost(context, payload) {
        try {
            const { type, slug } = payload
            const { data: post } = await blog.getPostBySlug(type, slug)
            context.commit('SET_BLOG_POST', post)
        } catch (error) {
            return Promise.reject(error)
        }
        return context.state.post
    }
}
