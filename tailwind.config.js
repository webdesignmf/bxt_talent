/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
    theme: {
        extend: {
            screens: {
                xs: {
                    min: '0px',
                    max: '639px'
                },
                xxl: '1367px',
                xxxl: '1650px'
            },
            textColor: {
                black: '#0F0F0F',
                primary: '#0F0F0F',
                secondary: '#FFFFFF',
                danger: '#C81D25'
            },
            borderColor: {
                primary: '#EDEDED',
                secondary: '#0F0F0F',
                danger: '#C81D25'
            },
            backgroundColor: {
                primary: '#FFF',
                secondary: '#E7E7E7',
                forms: '#EDEDED',
                alternative: '#B6B6B6',
                danger: '#C81D25',
                dark: '#0D0D0D'
            },
            backgroundOpacity: {
                90: '90%'
            },
            height: {
                25: '25%',
                50: '50%',
                75: '75%',
                'full-v': '100vh'
            },
            width: {
                25: '25%',
                50: '50%',
                75: '75%',
                90: '90%',
                'full-v': '100vw'
            },
            maxWidth: {
                25: '25%',
                40: '40%',
                50: '50%',
                75: '75%',
                90: '90%',
                fullv: '100vw'
            },
            maxHeight: {
                25: '25%',
                50: '50%',
                75: '75%',
                fullv: '100vh'
            },
            minWidth: {
                25: '25%',
                50: '50%',
                75: '75%',
                fullv: '100vw'
            },
            minHeight: {
                25: '25%',
                50: '50%',
                75: '75%',
                fullv: '100vh'
            },
            inset: {
                '-full': '-100%',
                50: '50%',
                20: '20%',
                35: '35%',
                10: '10%',
                full: '100%'
            },
            fontSize: {
                xxs: '.65rem'
            },
            zIndex: {
                5: 5
            },
            rotate: {
                15: '15deg'
            },
            boxShadow: {}
        }
    },
    variants: {},
    plugins: [],
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'nuxt.config.js'
        ]
    }
}
