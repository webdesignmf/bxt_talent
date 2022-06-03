<template>
    <div class="talent">
        <nuxt-link :to="`/talentos/${talent.id}/${$slugify(talent.name)}`">
            <img
                v-lazy="cover"
                :data-src="cover.src"
                :alt="talent.name"
                class="lazy upper"
            />
        </nuxt-link>
    </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { mapState } from 'vuex'
export default {
    props: {
        talent: Object
    },
    data() {
        return {
            load: false
        }
    },
    computed: {
        ...mapState({
            talents: (state) => state.talents.favorites
        }),
        favorite() {
            return typeof this.talents[this.talent.id] !== 'undefined'
        },
        cover() {
            return {
                src: this.talent.cover,
                error: '/general/talent_cover_error.png',
                loading: '/general/talent_cover_error.png'
            }
        }
    },

    methods: {
        setFavorite(talent) {
            this.load = true
            this.$nextTick(() => {
                if (!this.favorite) {
                    this.$store.dispatch('talents/setFavorite', talent)
                } else {
                    this.$store.dispatch('talents/deleteFavorite', talent)
                }
                this.load = false
            })
        }
    }
}
</script>

<style></style>
