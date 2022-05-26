<template>
    <div class="layout-default">
        <transition name="fade" mode="out-in">
            <global-loading v-if="loading" />
        </transition>
        <custom-menu />
        <Nuxt keep-alive />
        <custom-footer />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CustomMenu from '~/components/CustomMenu'
import CustomFooter from '~/components/CustomFooter'
import GlobalLoading from '~/components/GlobalLoading'

export default {
    middleware: ['routeObserver'],
    components: {
        CustomMenu,
        CustomFooter,
        GlobalLoading
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            loading: (state) => state.loading
        })
    },
    watch: {
        '$i18n.locale'(_new, _old) {
            // const messages = this.$i18n.messages
            // const route = this.$route.fullPath
            // Object.keys(messages[_old].routes).forEach((key) => {
            //     const labelOld = messages[_old].routes[key]
            //     const labelNew = messages[_new].routes[key]
            //     if (route.includes(labelOld)) {
            //         window.history.pushState(
            //             '',
            //             '',
            //             route.replace(labelOld, labelNew)
            //         )
            //     }
            // })
            this.$store.dispatch('setLocale', _new)
        }
    },
    mounted() {
        const favorites = window.localStorage.getItem('favorites')
        if (favorites) {
            this.$store.dispatch('talents/initFavorites', JSON.parse(favorites))
        }
    }
}
</script>
<style lang="scss">
.layout-default {
    @apply grid grid-cols-1 min-h-fullv max-w-full;
    grid-template-rows: auto 1fr auto;
}
@screen lg {
    .layout-default {
        @apply grid grid-cols-1 min-h-fullv max-w-full;
        grid-template-rows: 1fr auto;
    }
}
</style>
