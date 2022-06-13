<template>
    <div class="post">
        <div class="post--cover">
            <div class="post--cover__actions">
                <nuxt-link :to="`/${$i18n.locale}/blog`"
                    ><img class="back" src="/desktop/back.png"
                /></nuxt-link>
                <img
                    class="share"
                    src="/desktop/share.png"
                    @click="sharePost()"
                />
            </div>
            <img :src="baseUrl + post.cover" />
        </div>
        <div class="post--text" v-html="post.content" />
    </div>
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
    methods: {
        async sharePost() {
            const shareData = {
                title: 'BXT | Blog',
                text: this.post.description,
                url: window.location.href
            }

            try {
                await navigator.share(shareData)
            } catch (err) {
                console.error(err)
            }
        }
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: `Blog`,
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
.post {
    &--cover {
        @apply relative w-full;
        img {
            @apply w-full object-contain select-none;
        }
        &__actions {
            @apply absolute h-full top-0 grid py-4 select-none;
            left: 24px;
            .back {
                @apply self-start cursor-pointer;
            }
            .share {
                @apply self-end cursor-pointer;
            }
        }
    }
    &--text {
        @apply p-6 font-light text-white;
    }
}
@screen lg {
    .post {
        &--cover {
            @apply relative h-full flex justify-center;
            height: 600px;
            img {
                @apply h-full w-auto;
            }
            &__actions {
                @apply relative py-0 gap-y-6 content-start;
                left: -40px;
                .back {
                    @apply self-start;
                }
                .share {
                    @apply self-end;
                }
            }
        }
        &--text {
            @apply py-6 w-3/4 m-auto;
        }
    }
}
</style>
