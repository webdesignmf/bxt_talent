<template>
    <div class="about">about</div>
</template>

<script>
import url from '~/seo/components.js'
export default {
    data() {
        return {}
    },
    mounted() {},
    methods: {},

    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: 'About',
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
// .about {}
</style>
