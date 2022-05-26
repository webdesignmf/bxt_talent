import routes from '../routes.js'

function getLanguages(routes) {
    const languages = []
    routes.forEach((route) => {
        if (typeof route.routes !== 'undefined') {
            Object.keys(route.routes).forEach((key) => {
                if (!languages.includes(key)) {
                    languages.push(key)
                }
            })
        }
    })
    return languages
}

export default function ({ route, redirect, app }) {
    const languages = getLanguages(routes)
    const fullRoute = route.fullPath
    let language

    let hasLang = false

    languages.forEach((lang) => {
        if (fullRoute.indexOf(`/${lang}`) === 0) {
            hasLang = true
        }
    })

    if (hasLang) {
        language = fullRoute.split('/')[1]
    } else {
        routes.forEach((route) => {
            if (typeof route.routes !== 'undefined') {
                Object.keys(route.routes).forEach((key) => {
                    if (fullRoute.includes(route.routes[key])) {
                        language = key
                    }
                })
            }
        })
    }
    if (typeof language !== 'undefined') {
        app.i18n.locale = language
    } else {
        redirect('/' + app.i18n.fallbackLocale + fullRoute)
    }
}
