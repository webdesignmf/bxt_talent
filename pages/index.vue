<template>
    <div class="home">
        <div class="home--slides">
            <!-- <transition name="fade">
                <slider
                    :slides="slides"
                    :type="slideType"
                    :alone="alone"
                ></slider>
            </transition> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import Slider from '~/components/Slider'
export default {
    // components: {
    //     Slider
    // },
    async fetch({ store, error }) {
        try {
            const slides = await store.dispatch('slides/get', 'slides')
            const post = await store.dispatch('blog/get', 'blog')

            await Promise.all([slides, post])
        } catch (e) {
            console.log(e)
            error({
                statusCode: 503,
                message: e.code
            })
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            slides: (state) => state.slides.slides,
            noticias: (state) =>
                typeof state.blog.blog !== 'undefined'
                    ? state.blog.blog.data.slice(0, 3)
                    : [],
            baseUrl: (state) => state.baseUrl
        }),
        slideType() {
            if (typeof this.slides === 'undefined') return ''
            const type = this.slides.find((item) => item.type === 'video')
                ? 'video'
                : 'image'
            return type
        },
        alone() {
            if (typeof this.slides !== 'undefined') {
                return this.slides.length <= 1
            }
            return true
        }
    },
    mounted() {},
    methods: {},
    head: {
        // title: 'Home'
    }
}
</script>

<style lang="scss">
// .home {}
</style>
