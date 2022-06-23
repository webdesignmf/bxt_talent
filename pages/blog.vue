<template>
    <div :class="{ blog: true, _home: isHome }">
        <div class="blog--title">
            {{ $t('blog.title') }}
        </div>
        <div v-if="posts.length > 0" class="blog--posts">
            <nuxt-link
                v-for="post in posts"
                :key="post.id"
                :to="`/${$i18n.locale}/blog/${post.slug}`"
                class="blog--posts__item shimmer"
            >
                <img v-lazy="baseUrl + post.cover" class="lazy" />
                <div class="blog--posts__item--mask">
                    <div class="blog--posts__item--mask__description">
                        {{ post.description }}
                    </div>
                </div>
            </nuxt-link>
        </div>
        <div v-else class="blog--noposts">{{ $t('blog.noposts') }}</div>
    </div>
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
            allPosts: (state) => state.blog.blog,
            baseUrl: (state) => state.baseUrl
        }),
        posts() {
            const locale = this.$i18n.locale
            let posts = this.allPosts.filter((post) => post.lang === locale)
            if (this.isHome) {
                posts = posts.filter((post, index) => index < 4)
            }
            return posts
        },
        isHome() {
            return (
                this.$route.path === '/en' ||
                this.$route.path === '/es' ||
                this.$route.path === '/'
            )
        }
    },
    mounted() {},
    methods: {},
    head() {
        if (this.isHome) return
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
.blog._home {
    .blog--title {
        @apply block mt-0;
    }
}
.blog {
    @apply px-6 pb-8;
    &--title {
        @apply mt-8 mb-6 text-white lowercase font-semibold select-none cursor-default hidden;
        font-size: 32px;
        @screen lg {
            @apply block;
        }
    }
    &--posts {
        @apply grid grid-cols-1 gap-y-2;
        @screen lg {
            @apply gap-8;
        }
        @screen lg {
            @apply grid-cols-4 px-0 w-3/4 m-auto;
        }
        &__item {
            @apply relative cursor-pointer;
            img {
                @apply w-full h-full object-cover select-none;
            }
            &--mask {
                @apply flex items-end absolute top-0 left-0 h-full w-full p-4;
                transition: all 0.5s;
                background: linear-gradient(
                    5.02deg,
                    rgba(0, 0, 0, 0.8) 39.05%,
                    rgba(0, 0, 0, 0.5) 58.7%,
                    rgba(13, 13, 13, 0) 92.73%
                );
                @screen lg {
                    @apply opacity-0;
                }
                &__description {
                    @apply font-light text-white text-xs;
                    transition: all 0.5s;
                    @screen lg {
                        @apply opacity-0;
                        transform: translateY(20px);
                    }
                }
            }
            &:hover {
                .blog--posts__item--mask {
                    opacity: 1;
                    &__description {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        }
    }
    &--noposts {
        @apply text-white text-center font-light text-lg text-opacity-75 mt-12;
    }
}
@screen lg {
    .blog {
        &--title {
            @apply text-center;
        }
    }
}
</style>
