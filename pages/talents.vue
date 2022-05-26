<template>
    <div class="talents"></div>
</template>

<script>
import { mapState } from 'vuex'
import url from '~/seo/components.js'
export default {
    async fetch({ params, error, store }) {
        try {
            const talents = await store.dispatch('talents/get', {
                paginate: 1000
            })
            await Promise.all([talents])
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
            baseUrl: (state) => state.baseUrl,
            talents: (state) => {
                if (
                    typeof state.talents[state.talents.categoryActive] ===
                    'undefined'
                )
                    return []
                return state.talents[state.talents.categoryActive].filter(
                    (talent) => talent.name !== ''
                )
            }
        }),
        preview() {
            const talents = this.talents
            return talents
        }
    },
    methods: {},
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: this.categoryActive,
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
// .talents {}
</style>
