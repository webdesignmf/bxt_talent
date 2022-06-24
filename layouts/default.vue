<template>
    <div class="layout-default">
        <transition name="fade" mode="out-in">
            <global-loading v-if="loading" />
        </transition>
        <transition name="fade" mode="out-in">
            <initial-loading v-if="initialLoading" />
        </transition>
        <custom-menu />
        <Nuxt keep-alive class="page" />
        <custom-footer />
        <style v-if="initialLoading">
            body {
                overflow: hidden;
            }
        </style>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AOS from 'aos'
import CustomMenu from '~/components/CustomMenu'
import CustomFooter from '~/components/CustomFooter'
import GlobalLoading from '~/components/GlobalLoading'
import InitialLoading from '~/components/InitialLoading'
import 'aos/dist/aos.css'
export default {
    middleware: ['routeObserver'],
    components: {
        CustomMenu,
        CustomFooter,
        GlobalLoading,
        InitialLoading
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            loading: (state) => state.loading,
            initialLoading: (state) => state.initialLoading
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
        this.$store.dispatch('setInitialLoading', false)
        // eslint-disable-next-line no-undef
        AOS.init({ once: true })
        const favorites = window.localStorage.getItem('favorites')
        if (favorites) {
            this.$store.dispatch('talents/initFavorites', JSON.parse(favorites))
        }
    }
}
</script>
<style lang="scss">
body {
    @apply bg-dark w-full-v;
    overflow: overlay;
}
.layout-default {
    @apply grid grid-rows-2 min-h-fullv w-full-v overflow-hidden;
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
