module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen',
                    'no-empty-source'
                ]
            }
        ],
        'no-empty-source': null,
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        'declaration-empty-line-before': null,
        'unicode-bom': 'never'
    }
}
