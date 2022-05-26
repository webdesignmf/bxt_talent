module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars':
            process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/require-prop-types': 'off',
        'vue/no-v-html': 'off'
    },
    overrides: [
        {
            files: ['*.js', '*.vue'],
            rules: {
                // indent: 'off',
            }
        }
    ]
}
