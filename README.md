# nuxt-template

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
## Config Files
```bash
> .env (TOKENS)

> nuxt.config.js (plugins)

> /store/index.js (TOKENS)

> website.service.js (TOKENS)

> website-backup.service.js (TOKENS)

> website.com.br.conf (PORTS)

> package.json (PORTS)


> tailwind.config.js (EXTEND CSS CONFIG)

> /seo/config.js (APPLICATION INFO)

> /seo/head.js (APPLICATION INFO)

> /services/config.js (API_URL)

> /plugins/talent-functions.js (API_URL, GLOBAL FUNCTIONS)
```

## Static Resources
#### Icons generator
https://www.favicon-generator.org/
![reference](http://managerfashion.pictures/issues/websites/1.png)
![reference](http://managerfashion.pictures/issues/websites/2.png)
- Support
    - favicon.ico
    - favicon-16x16.png
    - favicon-32x32.png
    - favicon-96x96.png
    - android-icon-36x36.png
    - android-icon-48x48.png
    - android-icon-72x72.png
    - android-icon-96x96.png
    - android-icon-144x144.png
    - android-icon-192x192.png
    - apple-icon-57x57.png
    - apple-icon-60x60.png
    - apple-icon-72x72.png
    - apple-icon-76x76.png
    - apple-icon-114x114.png
    - apple-icon-144x144.png
    - apple-icon-152x152.png
    - apple-icon-180x180.png

https://realfavicongenerator.net/
![reference](http://managerfashion.pictures/issues/websites/3.png)
![reference](http://managerfashion.pictures/issues/websites/4.png)
- Support
    - android-chrome-192x192.png
    - android-chrome-512x512.png
    - apple-touch-icon.png
    - apple-touch-icon.png
    - browserconfig.xml
    - mstile-150x150.png
    - safari-pinned-tab.svg


# Configuration and extensions to maintain organized and automated workflow

## VS Code Additional Settings

Open configuration file
![reference](http://managerfashion.pictures/issues/websites/5.png)
And add the following lines
````Javascript
{
    "vetur.format.defaultFormatter.html": "prettier",
    "workbench.iconTheme": "material-icon-theme",
    "editor.tabSize": 4,    
    "diffEditor.ignoreTrimWhitespace": false,
    
    "eslint.codeAction.showDocumentation": {

        "enable": true
    },
    "vetur.validation.template": false,
    "eslint.validate": [
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        }
    ],
    "emmet.includeLanguages": {
        "vue": "html"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "prettier.endOfLine": "auto",
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false,
    "prettier.trailingComma": "none",
    "editor.showFoldingControls": "always",
    "editor.folding": true,
    "editor.foldingStrategy": "indentation",    
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "prettier.requireConfig": true,
}
````
### Strongly recommended extensions

- ESLint
- Prettier
- stylelint-plus
- Vetur
- Auto Rename Tag
- Tailwind CSS IntelliSense
- Material Icon Theme
- Sass
- system-unit-file