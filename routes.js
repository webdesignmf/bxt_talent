import Home from '~/pages/index'
import Contact from '~/pages/contact'
import Blog from '~/pages/blog'
import BlogPost from '~/pages/post'
import About from '~/pages/about'
import GetScouted from '~/pages/get-scouted'
import Favorites from '~/pages/favorites'
import Talents from '~/pages/talents'
import Talent from '~/pages/talent'

export default [
    {
        route: '/',
        component: Home
    },
    {
        routes: {
            pt: 'sobre-nos',
            en: 'about-us',
            es: 'sobre-nosotros'
        },
        component: About
    },
    {
        routes: {
            pt: 'seja-modelo',
            en: 'get-scouted',
            es: 'ser-un-modelo'
        },
        component: GetScouted
    },
    {
        routes: {
            pt: 'favoritos',
            en: 'favorites',
            es: 'favoritos'
        },
        component: Favorites
    },
    {
        routes: {
            pt: 'contato',
            en: 'contact',
            es: 'contacto'
        },
        component: Contact
    },
    {
        route: '/blog',
        component: Blog
    },
    {
        route: '/blog/:slug',
        component: BlogPost
    },
    {
        route: '/:category',
        component: Talents
    },
    {
        route: '/:category/:id_model/:name',
        component: Talent
    }
]
