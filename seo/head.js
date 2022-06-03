import config from './config'

export default {
    htmlAttrs: {
        lang: 'pt'
    },
    meta: [
        { charset: 'utf-8' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: `${config.description}`
        },
        { name: 'robots', content: 'index, follow' },
        {
            name: 'copyright',
            content:
                'ManagerFashion | Booking software for talent and model agencies'
        },
        {
            name: 'author',
            content:
                'ManagerFashion | Booking software for talent and model agencies'
        },
        { name: 'keywords', content: config.keywords },

        // Android
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'theme-color', content: config.themeColor },

        // iOs
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'default'
        },
        // // { name: 'apple-mobile-web-app-title', content: config.title },

        // Windows
        {
            name: 'msapplication-navbutton-color',
            content: config.themeColor
        },
        { name: 'msapplication-TileColor', content: config.themeColor },
        {
            name: 'msapplication-TileImage',
            content: '/seo/mstile-150x150.png'
        },
        { name: 'msapplication-config', content: '/seo/browserconfig.xml' },

        // Pinned
        // { name: 'application-name', content: config.title },
        // { name: 'msapplication-tooltip', content: config.title },
        { name: 'msapplication-starturl', content: '/' },

        // Tap highlighting
        { name: 'msapplication-tap-highlight', content: 'no' },

        // UC mobile browser
        { name: 'full-screen', content: 'yes' },
        { name: 'browsermode', content: 'application' },

        // Layout mode
        { name: 'layoutmode', content: 'fitscreen/standard' },

        // Image mode
        { name: 'imagemode', content: 'force' },

        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@' },
        // // { name: 'twitter:title', content: config.title },
        { name: 'twitter:description', content: config.description },
        { name: 'twitter:image', content: config.logo },

        // Open graph tags
        {
            hid: 'og:type',
            property: 'og:type',
            content: 'website'
        },
        {
            // hid: 'og:title',
            // property: 'og:title',
            // content: config.title
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: '',
            template: `${config.url}%s`
        },
        {
            hid: 'og:site_name',
            property: 'og:site_name'
            // content: config.title
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: config.description
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: config.logo
        },

        {
            hid: 'al:ios:app_name',
            property: 'al:ios:app_name'
            // content: config.title
        },
        {
            hid: 'al:android:app_name',
            property: 'al:android:app_name'
            // content: config.title
        },
        {
            hid: 'al:ios:url',
            property: 'al:ios:url',
            content: '',
            template: `${config.url}%s`
        },
        {
            hid: 'al:android:url',
            property: 'al:android:url',
            content: '',
            template: `${config.url}%s`
        },
        {
            hid: 'al:web:url',
            property: 'al:web:url',
            content: '',
            template: `${config.url}%s`
        }
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/seo/favicon.ico'
        },
        // Main icons
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/seo/favicon-16x16.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/seo/favicon-32x32.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/seo/favicon-96x96.png'
        },
        // Android icons
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            href: '/seo/android-icon-512x512.png'
        },
        // Android icons
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/seo/android-icon-192x192.png'
        },
        // iOs icons
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '57x57',
            href: '/seo/apple-icon-57x57.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '60x60',
            href: '/seo/apple-icon-60x60.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '72x72',
            href: '/seo/apple-icon-72x72.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '76x76',
            href: '/seo/apple-icon-76x76.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '114x114',
            href: '/seo/apple-icon-114x114.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '120x120',
            href: '/seo/apple-touch-icon.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '144x144',
            href: '/seo/apple-icon-144x144.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '152x152',
            href: '/seo/apple-icon-152x152.png'
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '180x180',
            href: '/seo/apple-icon-180x180.png'
        },
        // UC browser
        {
            rel: 'apple-touch-icon-precomposed',
            type: 'image/png',
            sizes: '57x57',
            href: '/seo/apple-icon-57x57.png'
        },
        // Pinned tab icon
        {
            rel: 'mask-icon',
            href: '/seo/safari-pinned-tab.svg',
            color: config.themeColor
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css'
        }
    ],
    script: [
        {
            src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfgkdEf62kbP8m-aUXqx1fujhyRi_GpnY'
        },
        {
            src: 'https://apps.elfsight.com/p/platform.js',
            defer: true
        }
    ]
}
