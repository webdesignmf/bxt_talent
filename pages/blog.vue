<template>
    <div class="blog"></div>
</template>

<script>
import { mapState } from 'vuex'
import url from '~/seo/components.js'
export default {
    async fetch({ store, error }) {
        try {
            const posts = await store.dispatch('blog/get', 'blog')

            await Promise.all([posts])
        } catch (e) {
            error({
                statusCode: 503,
                message: 'Unable to fetch Website Information'
                // message: e
            })
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            posts: (state) => state.blog.blog,
            baseUrl: (state) => state.baseUrl
        })
    },
    mounted() {},
    methods: {},
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: 'Blog',
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
// .blog {}
</style>
