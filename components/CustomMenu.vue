<template>
    <header class="navbar">
        <div class="navbar--desktop">
            <div class="navbar--desktop__routes">
                <nuxt-link
                    v-for="route in routes.left"
                    :key="route"
                    :to="$t('routes.' + route)"
                    class="navbar--desktop__routes--row"
                >
                    {{ $t('pages.' + route) }}
                </nuxt-link>
            </div>
            <nuxt-link :to="$t('routes.home')" class="navbar--desktop__logo">
                <img src="/desktop/logo.png" />
            </nuxt-link>
            <div class="navbar--desktop__routes">
                <nuxt-link
                    v-for="route in routes.right"
                    :key="route"
                    :to="$t('routes.' + route)"
                    class="navbar--desktop__routes--row"
                >
                    {{ $t('pages.' + route) }}
                </nuxt-link>
                <nuxt-link
                    :to="$t('routes.favorites')"
                    class="navbar--desktop__routes--row favorites"
                >
                    <img src="/desktop/favorites.png" />
                </nuxt-link>
                <div class="navbar--desktop__routes--row languages">
                    <div
                        :class="{
                            language: true,
                            active: $i18n.locale === 'es'
                        }"
                        @click="changeLanguage('es')"
                    >
                        es
                    </div>
                    <div
                        :class="{
                            language: true,
                            active: $i18n.locale === 'en'
                        }"
                        @click="changeLanguage('en')"
                    >
                        en
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar--mobile">
            <nuxt-link
                tag="img"
                :to="$t('routes.home')"
                src="/mobile/logo.png"
            />
            <img src="/mobile/menu.png" @click="menu = true" />
            <transition name="fade" mode="out-in">
                <div v-if="menu" class="navbar--mobile__menu">
                    <div
                        class="navbar--mobile__menu--close"
                        @click="menu = fale"
                    >
                        <img src="/mobile/close.png" />
                    </div>
                    <div class="navbar--mobile__menu--wrapper">
                        <nuxt-link
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            :to="$t('routes.favorites')"
                            class="navbar--mobile__menu--wrapper__route favorites"
                        >
                            <img src="/mobile/favorites.png" />
                        </nuxt-link>
                        <nuxt-link
                            v-for="(route, i) in mobileRoutes"
                            :key="route"
                            data-aos="fade-up"
                            :data-aos-duration="1000 + 100 * (i + 1)"
                            data-aos-anchor=".favorites"
                            :to="$t('routes.' + route)"
                            class="navbar--mobile__menu--wrapper__route"
                        >
                            {{ $t('pages.' + route) }}
                        </nuxt-link>
                        <div
                            class="navbar--mobile__menu--wrapper__route languages"
                            data-aos="fade-up"
                            :data-aos-duration="1900"
                            data-aos-anchor=".favorites"
                        >
                            <div
                                :class="{
                                    language: true,
                                    active: $i18n.locale === 'es'
                                }"
                                @click="changeLanguage('es')"
                            >
                                es
                            </div>
                            <div
                                :class="{
                                    language: true,
                                    active: $i18n.locale === 'en'
                                }"
                                @click="changeLanguage('en')"
                            >
                                en
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            menu: false,
            routes: {
                left: ['actors', 'influencers', 'experts', 'people'],
                right: ['blog', 'about_us', 'get_scouted', 'contact']
            }
        }
    },
    computed: {
        mobileRoutes() {
            return this.routes.left.concat(this.routes.right)
        }
    },
    watch: {
        $route(from, to) {
            this.menu = false
        }
    },
    methods: {
        changeLanguage(lang) {
            this.$i18n.locale = lang
        }
    }
}
</script>

<style lang="scss">
.navbar {
    &--mobile {
        @apply fixed w-full left-0 top-0 flex justify-between items-center bg-dark px-6 py-4;
        z-index: 9998;
        &__menu {
            @apply fixed left-0 top-0 h-full-v w-full-v bg-dark grid;
            grid-template-rows: auto 1fr;
            z-index: 9999;
            &--close {
                @apply px-6 py-8 flex justify-end;
            }
            &--wrapper {
                @apply px-20 pb-8 grid content-end gap-y-4;
                &__route {
                    @apply text-white font-light lowercase;
                    font-size: 32px;
                    &.favorites {
                        @apply pb-2;
                    }
                    &.languages {
                        @apply pt-2 flex;
                        .language {
                            &:first-child::after {
                                @apply pl-1 pr-2 font-normal;
                                content: '/';
                            }
                            &.active {
                                @apply font-semibold;
                            }
                        }
                    }
                    &.router-link-exact-active {
                        @apply font-semibold;
                    }
                }
            }
        }
    }
    &--desktop {
        @apply hidden py-4 px-8 items-center gap-x-12 bg-dark select-none;
        grid-template-columns: 1fr auto 1fr;
        z-index: 9998;
        &__logo {
            img {
                min-width: 136px;
            }
        }
        &__routes {
            @apply flex gap-x-10 items-center;
            &:first-child {
                @apply justify-end;
            }
            &--row {
                @apply text-white text-xl font-light lowercase whitespace-no-wrap;
                transition: all 0.5s;
                @screen xxl {
                    @apply text-2xl;
                }
                &.favorites {
                    img {
                        min-width: 36px;
                    }
                }
                &.languages {
                    @apply flex;
                    .language {
                        @apply cursor-pointer;
                        &:first-child::after {
                            @apply pl-1 pr-2 font-normal;
                            content: '/';
                        }
                        &.active {
                            @apply font-semibold;
                        }
                    }
                }
                &.router-link-exact-active {
                    @apply font-semibold;
                }
                &:not(:last-child):hover {
                    @apply opacity-75;
                }
            }
        }
    }
    @screen lg {
        &--desktop {
            @apply grid;
        }
        &--mobile {
            @apply hidden;
        }
    }
}
</style>
