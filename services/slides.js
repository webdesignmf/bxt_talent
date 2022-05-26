import { panel } from './config'

const slides = {
    get(type) {
        return panel.get(`/api/slides/${type}`)
    }
}
export default slides
