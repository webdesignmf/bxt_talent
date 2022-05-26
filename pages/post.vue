<template>
    <div class="post"></div>
</template>

<script>
import { mapState } from 'vuex'
import url from '~/seo/components.js'
export default {
    async fetch({ params, store, error }) {
        try {
            const { slug } = params
            const post = await store.dispatch('blog/getPost', {
                type: 'blog',
                slug
            })
            await Promise.all([post])
        } catch (e) {
            error({
                statusCode: 404,
                message: 'Unable to fetch Website Information'
                // message: e
            })
        }
    },
    computed: {
        ...mapState({
            baseUrl: (state) => state.baseUrl,
            post: (state) => state.blog.post
        })
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: `${this.post.title} | Blog`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.post.description
                },
                ...items
            ]
        }
    }
}
</script>

<style lang="scss">
//.post {}
</style>
