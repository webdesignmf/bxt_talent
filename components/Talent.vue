<template>
    <div v-if="isFavorites" class="talent">
        <a>
            <picture class="removeFavorite" @click="removeFavorite()">
                <source
                    media="(max-width:1023px)"
                    srcset="/mobile/remove-favorite.png"
                />
                <img src="/desktop/remove-favorite.png" />
            </picture>
            <img
                v-lazy="cover"
                :data-src="cover.src"
                :alt="talent.name"
                class="lazy cc"
            />
            <nuxt-link
                :to="`/${category}/${talent.id}/${$slugify(talent.name)}`"
                class="talent--mask"
            >
                <div class="talent--mask__name">
                    {{ talent.name }}
                </div>
            </nuxt-link>
        </a>
    </div>
    <div v-else class="talent">
        <nuxt-link :to="`/${category}/${talent.id}/${$slugify(talent.name)}`">
            <img
                v-lazy="cover"
                :data-src="cover.src"
                :alt="talent.name"
                class="lazy cc"
            />
            <div class="talent--mask">
                <div class="talent--mask__name">
                    {{ talent.name }}
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        talent: Object,
        category: String
    },
    data() {
        return {
            load: false
        }
    },
    computed: {
        cover() {
            return {
                src: this.talent.cover,
                error: '/general/talent_cover_error.png',
                loading: '/general/talent_cover_error.png'
            }
        },
        isFavorites() {
            return this.$route.fullPath.includes(this.$t('routes.favorites'))
        }
    },

    methods: {
        removeFavorite() {
            const talent = this.talent
            this.$store.dispatch('talents/deleteFavorite', talent)
        }
    }
}
</script>
<style lang="scss">
.talent {
    @apply select-none relative inline-block;
    &--mask {
        @apply flex items-end absolute top-0 left-0 h-full w-full p-4;
        transition: all 0.5s;
        background: linear-gradient(
            5.02deg,
            rgba(0, 0, 0, 0.7) 39.05%,
            rgba(0, 0, 0, 0.4) 58.7%,
            rgba(13, 13, 13, 0) 92.73%
        );
        @screen lg {
            @apply opacity-0;
        }
        &__name {
            @apply font-semibold text-white text-3xl;
            transition: all 0.5s;
            @screen lg {
                @apply opacity-0;
                transform: translateY(20px);
            }
        }
    }
    .removeFavorite {
        @apply absolute cursor-pointer;
        top: 0.5rem;
        right: 0.5rem;
        @screen lg {
            top: 1rem;
            right: 1rem;
        }
        z-index: 999;
    }
    .cc {
        @apply h-full w-full object-cover;
    }
    &:hover {
        .talent--mask {
            opacity: 1;
            &__name {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}
</style>
