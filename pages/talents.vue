<template>
    <div
        v-if="secondSlides && secondSlides.length > 0"
        data-aos="fade-up"
        data-aos-duration="1000"
        class="talents"
    >
        <custom-slider
            v-if="firstSlides && firstSlides.length > 0"
            :slides="firstSlides"
        />
        <transition-group
            class="talents--list"
            name="fade"
            mode="out-in"
            tag="div"
        >
            <talent
                v-for="talent in preview.filter((t, index) => index < 5)"
                :key="talent.id"
                :talent="talent"
                :category="$route.params.category"
            />
        </transition-group>
        <custom-slider
            v-if="secondSlides && secondSlides.length > 0"
            :slides="secondSlides"
        />
        <transition-group
            class="talents--list"
            name="fade"
            mode="out-in"
            tag="div"
        >
            <talent
                v-for="talent in preview.filter((t, index) => index >= 5)"
                :key="talent.id"
                :talent="talent"
                :category="$route.params.category"
            />
        </transition-group>
    </div>
    <div v-else data-aos="fade-up" data-aos-duration="1000" class="talents">
        <custom-slider
            v-if="firstSlides && firstSlides.length > 0"
            :slides="firstSlides"
        />
        <transition-group
            class="talents--list"
            name="fade"
            mode="out-in"
            tag="div"
        >
            <talent
                v-for="talent in preview"
                :key="talent.id"
                :talent="talent"
                :category="$route.params.category"
            />
        </transition-group>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import url from '~/seo/components.js'
import Talent from '~/components/Talent'
import CustomSlider from '~/components/CustomSlider.vue'
export default {
    components: {
        Talent,
        CustomSlider
    },
    async fetch({ params, error, store }) {
        try {
            const slides = await store.dispatch('slides/get')
            const talents = await store.dispatch('talents/get', {
                paginate: 1000
            })
            await Promise.all([slides, talents])
        } catch (e) {
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
            allSlides: (state) => state.slides.all,
            baseUrl: (state) => state.baseUrl,
            talents: (state) => state.talents.list
        }),
        preview() {
            return this.talents.filter((talent) =>
                this.hasCategory(talent, this.idCategory)
            )
        },
        category() {
            const categories = {
                actores: 'actors',
                actors: 'actors',
                influencers: 'influencers',
                experts: 'experts',
                people: 'people'
            }
            return categories[this.$route.params.category]
        },
        idCategory() {
            const categories = {
                actores: '2',
                actors: '2',
                influencers: '3265',
                experts: '3',
                people: '4'
            }
            return categories[this.$route.params.category]
        },
        firstSlides() {
            return this.allSlides[`first-${this.category}-slide`] || []
        },
        secondSlides() {
            return this.allSlides[`second-${this.category}-slide`] || []
        }
    },
    methods: {
        hasCategory(talent, idCategory) {
            let count = 0
            talent.categories.forEach((category) => {
                count += category.id === parseInt(idCategory) ? 1 : 0
            })
            return count > 0
        }
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: this.$t('pages.' + this.category),
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
.talents {
    .custom--slider {
        &:first-child {
            @apply mt-0;
        }
        @apply my-12;
    }
    @apply mt-8 pb-12;
    &--list {
        @apply grid grid-cols-2 gap-2;
    }
}
@screen lg {
    .talents {
        &--list {
            @apply grid-cols-4 gap-8 w-3/4 m-auto;
        }
    }
}
</style>
