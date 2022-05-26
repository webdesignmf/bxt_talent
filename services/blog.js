import { panel } from './config'

const blog = {
    get(type, params) {
        return panel.get(`/api/posts/${type}/pt`, {
            params
        })
    },
    getPostBySlug(type, slug) {
        return panel.get(`/api/posts/${type}/pt/${slug}`)
    }
}
export default blog
