<template>
    <div class="contact"></div>
</template>

<script>
/* eslint-disable no-undef */
import url from '~/seo/components.js'
export default {
    data() {
        return {}
    },
    head() {
        const items = url.map((tag) => {
            tag.content = this.$route.fullPath
            return tag
        })
        return {
            title: 'Contato',
            meta: [...items]
        }
    }
}
</script>

<style lang="scss">
// .contact {}
</style>
