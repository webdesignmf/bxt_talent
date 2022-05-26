import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../locales/en'
import pt from '../locales/pt'
import es from '../locales/es'
Vue.use(VueI18n)

export default ({ app, store }) => {
    const params = app.context.params
    const { lang } = params
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: lang || 'en',
        fallbackLocale: 'en',
        messages: {
            en,
            pt,
            es
        },
        silentTranslationWarn: true
    })

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`
        }
        return `/${app.i18n.locale}/${link}`
    }
}
