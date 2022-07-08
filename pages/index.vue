<template>
    <div class="home">
        <custom-slider v-if="firstSlides" :slides="firstSlides" />
        <talents-grid v-if="newTalents" :talents="newTalents" />
        <custom-slider v-if="secondSlides" :slides="secondSlides" />
        <instagram-grid />
        <Blog v-if="posts.length > 0" />
        <Contact />
        <Location />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CustomSlider from '~/components/CustomSlider'
import TalentsGrid from '~/components/TalentsGrid'
import InstagramGrid from '~/components/InstagramGrid'
import Blog from '~/pages/blog'
import Contact from '~/components/Contact'
import Location from '~/components/Location'
export default {
    components: {
        CustomSlider,
        TalentsGrid,
        InstagramGrid,
        Blog,
        Contact,
        Location
    },
    async fetch({ store, error }) {
        try {
            const slides = await store.dispatch('slides/get')
            const post = await store.dispatch('blog/get', 'blog')
            const talents = await store.dispatch('talents/get', {
                paginate: 1000
            })
            const talentsOrdered = await store.dispatch('talents/getOrdered')

            await Promise.all([slides, post, talents, talentsOrdered])
        } catch (e) {
            console.log(e)
            error({
                statusCode: 503,
                message: e.code
            })
        }
    },
    data() {
        return {
            loaded: false
        }
    },
    computed: {
        ...mapState({
            allPosts: (state) => state.blog.blog,
            allSlides: (state) => state.slides.all,
            noticias: (state) =>
                typeof state.blog.blog !== 'undefined'
                    ? state.blog.blog.data.slice(0, 3)
                    : [],
            baseUrl: (state) => state.baseUrl,
            talents: (state) => state.talents.news
        }),
        posts() {
            const locale = this.$i18n.locale
            let posts = this.allPosts.filter((post) => post.lang === locale)
            if (this.isHome) {
                posts = posts.filter((post, index) => index < 4)
            }
            return posts
        },
        newTalents() {
            return this.talents.filter((talent, index) => index < 4)
        },
        firstSlides() {
            return this.allSlides['first-home-slide']
        },
        secondSlides() {
            return this.allSlides['second-home-slide']
        },
        isContact() {
            return this.$route.fullPath.includes(this.$t('routes.contact'))
        }
    },
    mounted() {
        if (this.isContact) {
            document.querySelector('.footer').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    },
    methods: {},
    head: {
        // title: 'Home'
    }
}
</script>

<style lang="scss">
.home {
    .custom--slider {
        &:first-child {
            @apply mt-8;
        }
    }
}
</style>
