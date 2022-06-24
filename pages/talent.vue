<template>
    <div class="talent--profile">
        <div class="talent--profile__cover">
            <transition>
                <img
                    v-if="favorite"
                    class="talent--profile__cover--favorite"
                    src="/general/filledHeart.png"
                    @click="setFavorite(talent)"
                />
                <img
                    v-else
                    class="talent--profile__cover--favorite"
                    src="/general/emptyHeart.png"
                    @click="setFavorite(talent)"
                />
            </transition>
            <img
                v-if="isValidImage(talent.cover2)"
                class="talent--profile__cover--img"
                :src="talent.cover2"
            />
            <div class="talent--profile__cover--name">
                {{ talent.name }}
            </div>
        </div>
        <div v-if="talent.about" class="talent--profile__about">
            {{ talent.about }}
        </div>
        <div v-if="talent.video.length > 0" class="talent--profile__video">
            <video-gallery :slides="talent.video" />
        </div>
        <div
            v-if="talent.book.length > 0"
            class="talent--profile__book--mobile"
        >
            <div
                v-for="item in talent.book"
                :key="item.id"
                class="talent--profile__book--mobile__item"
            >
                <img :src="item.file" />
            </div>
        </div>
        <book-slider v-if="talent.book.length > 0" :slides="talent.book" />
        <compo-slider v-if="talent.compo.length > 0" :slides="talent.compo" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import url from '~/seo/components.js'
import VideoGallery from '~/components/VideoGallery.vue'
import BookSlider from '~/components/BookSlider.vue'
import CompoSlider from '~/components/CompoSlider.vue'
export default {
    components: {
        VideoGallery,
        BookSlider,
        CompoSlider
    },
    async fetch({ store, error, params }) {
        const { id_model: id } = params
        const talent = await store.dispatch('talents/getTalent', id)
        await Promise.all([talent])
    },
    data() {
        return {}
    },

    computed: {
        ...mapState({
            talent: (state) => state.talents.profile,
            talents: (state) => state.talents.favorites
        }),
        favorite() {
            return typeof this.talents[this.talent.id] !== 'undefined'
        }
    },
    mounted() {},
    methods: {
        isValidImage(link) {
            const invalidLink =
                'https://res.cloudinary.com/managerfashion/image/upload/.jpg'
            return link !== invalidLink
        },
        setFavorite(talent) {
            console.log(this.favorites)
            if (!this.favorite) {
                this.$store.dispatch('talents/setFavorite', talent)
            } else {
                this.$store.dispatch('talents/deleteFavorite', talent)
            }
        }
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: `${this.talent.name}`,
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
.talent {
    &--profile {
        &__cover {
            min-height: 200px;
            @apply w-full h-auto max-h-fullv relative;
            &--favorite {
                @apply absolute;
                top: 2rem;
                right: 1.5rem;
                z-index: 999;
            }
            &--img {
                @apply w-full max-h-fullv;
            }
            &--name {
                @apply px-4 text-center font-semibold text-5xl uppercase text-white top-0 left-0 w-full h-full absolute flex justify-center items-center;
                line-height: 1;
            }
        }
        &__about {
            @apply py-8 px-6 font-light text-white text-justify;
        }
        &__video {
            @apply pb-4;
        }
        &__book--mobile {
            @apply px-6 flex justify-center flex-wrap gap-4 mb-12;
        }
        .book--slider {
            @apply hidden;
        }
    }
}
@screen lg {
    .talent {
        &--profile {
            &__about {
                @apply w-3/4 m-auto px-0 pb-12 text-left;
            }
            &__video {
                @apply pb-12;
            }
            &__book--mobile {
                @apply hidden;
            }
            .book--slider {
                @apply block mb-12;
            }
        }
    }
}
</style>
