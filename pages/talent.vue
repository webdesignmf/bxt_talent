<template>
    <div class="talentProfile"></div>
</template>

<script>
import { mapState } from 'vuex'
import url from '~/seo/components.js'
export default {
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
// .talentProfile {}
</style>
