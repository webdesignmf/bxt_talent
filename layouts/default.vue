<template>
    <div class="layout-default">
        <transition name="fade" mode="out-in">
            <global-loading v-if="loading" />
        </transition>
        <custom-menu />
        <Nuxt class="page" />
        <custom-footer />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AOS from 'aos'
import CustomMenu from '~/components/CustomMenu'
import CustomFooter from '~/components/CustomFooter'
import GlobalLoading from '~/components/GlobalLoading'
import 'aos/dist/aos.css'
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
        // eslint-disable-next-line no-undef
        AOS.init()
        const favorites = window.localStorage.getItem('favorites')
        if (favorites) {
            this.$store.dispatch('talents/initFavorites', JSON.parse(favorites))
        }
    }
}
</script>
<style lang="scss">
body {
    @apply bg-dark;
    overflow: overlay;
}
.layout-default {
    @apply grid grid-rows-2 min-h-fullv max-w-full;
    grid-template-rows: 0 1fr auto;
    .navbar {
        z-index: 2;
    }
    .page {
        z-index: 1;
        padding-top: 93px; // mobile navbar height
        @screen lg {
            padding-top: 93px; // desktop navbar height
        }
    }
    .footer {
        z-index: 1;
    }
}
</style>
