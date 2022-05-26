import Vue from 'vue'
import Router from 'vue-router'
import paths from './routes'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            ...paths.map((r) => {
                let path = '/:lang'
                if (typeof r.routes !== 'undefined') {
                    path += '/('
                    Object.keys(r.routes).forEach((key) => {
                        path += r.routes[key] + '|'
                    })
                    path += ')'
                    path = path.replace('|)', ')')
                } else {
                    path += r.route
                }
                return {
                    path,
                    component: r.component
                }
            }),
            ...paths.map((r) => {
                let path = ''
                if (typeof r.routes !== 'undefined') {
                    path += '/('
                    Object.keys(r.routes).forEach((key) => {
                        path += r.routes[key] + '|'
                    })
                    path += ')'
                    path = path.replace('|)', ')')
                } else {
                    path += r.route
                }
                return {
                    path,
                    component: r.component
                }
            })
        ],
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    })
}
