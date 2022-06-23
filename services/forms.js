import { panel, integration } from './config'

const forms = {
    contact(payload) {
        return panel.post(`/api/contact/en`, payload)
    },
    options(payload) {
        return integration.get(`/api/talents/attributes`, payload)
    },
    getScouted(payload) {
        return panel.post('/api/get-scouted/en', payload)
    },
    favorites(payload) {
        return panel.post('/api/favorites/en', payload)
    }
}
export default forms
