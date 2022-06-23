import { panel } from './config'

const slides = {
    get(type) {
        return panel.get(`/api/slides/all`)
    }
}
export default slides
