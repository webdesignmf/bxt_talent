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
        <div class="post--slides">
            <div
                v-for="slide in post.slides"
                :key="slide.id"
                :class="{
                    'post--slides__item': true,
                    landscape: slide.mode === 'landscape'
                }"
            >
                <img :src="baseUrl + slide.slide_url" />
            </div>
        </div>
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
    &--slides {
        @apply px-6 flex justify-center items-center mt-4 mb-8 gap-4 flex-wrap;
        // &__item {
        // }
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
        &--slides {
            @apply px-0 w-3/4 m-auto mt-4 mb-8 gap-8;
            &__item {
                @apply relative;
                width: calc(100% / 3 - 32px);
                align-self: stretch;
                &.landscape {
                    width: calc(100% / 2 - 32px);
                }
                & > img {
                    @apply w-full h-full object-cover;
                }
            }
        }
    }
}
</style>
