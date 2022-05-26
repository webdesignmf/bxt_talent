import head from './seo/head.js'
import manifest from './seo/manifest.js'
export default {
    /*
     ** Nuxt Runtime Config
     ** See https://nuxtjs.org/guide/runtime-config
     */
    publicRuntimeConfig: {},
    privateRuntimeConfig: {
        BASE_URL:
            process.env.BASE_URL || 'https://website_name.managerfashion.net',
        MF_SALT: process.env.MF_SALT,
        MF_API_KEY: process.env.MF_API_KEY,
        PANEL_SALT: process.env.PANEL_SALT,
        PANEL_API_TOKEN: process.env.PANEL_API_TOKEN
    },
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head,
    /*
     ** Global CSS
     */
    css: ['~assets/scss/index.scss'],
    loading: {
        color: '#333333',
        height: '3px',
        continuous: true
    },
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        { src: '~/plugins/axios.js', mode: 'client' },
        '~/plugins/lottie.js',
        '~/plugins/font-awesome.js',
        '~/plugins/v-lazy.js',
        '~/plugins/vuelidate.js',
        '~/plugins/slugify.js',
        '~/plugins/vue-plyr',
        '~/plugins/swiper',
        '~/plugins/element-ui.js',
        '~/plugins/talent-functions.js',
        { src: '~/plugins/vue-masonery', mode: 'client' },
        '~/plugins/i18n.js'
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: false,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/stylelint-module
        '@nuxtjs/stylelint-module',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
        // https://github.com/teamnovu/nuxt-breaky
        '@teamnovu/nuxt-breaky',
        // https://github.com/nuxt-community/svg-module
        '@nuxtjs/svg',
        '@nuxtjs/router'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        ['@nuxtjs/pwa', { workbox: false }]
    ],
    /*
     ** PWA module configuration
     ** See https://pwa.nuxtjs.org
     */
    pwa: {
        manifest
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL:
            process.env.BASE_URL || 'https://website_name.managerfashion.net'
    },
    /*
     ** Tailwind module configuration
     ** See https://github.com/nuxt-community/tailwindcss-modules
     */
    tailwindcss: {
        exposeConfig: true
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */

    build: {
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true
                    }
                })
            }
        }
    }
}
