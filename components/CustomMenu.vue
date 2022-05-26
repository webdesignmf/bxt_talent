<template>
    <header></header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        isHome() {
            return this.$route.fullPath === '/'
        }
    },
    watch: {
        $route(from, to) {}
    },

    mounted() {},
    methods: {}
}
</script>

<style lang="scss">
// header {}
</style>
