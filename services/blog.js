import { panel } from './config'

const blog = {
    get(type, params) {
        return panel.get(`/api/posts/${type}/all`, {
            params
        })
    },
    getPostBySlug(type, slug) {
        return panel.get(`/api/posts/${type}/all/${slug}`)
    }
}
export default blog
