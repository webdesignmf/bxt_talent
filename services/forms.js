import { panel, integration } from './config'

const forms = {
    contact(payload) {
        return panel.post(`/api/contact/pt`, payload)
    },
    options(payload) {
        return integration.get(`/api/talents/attributes`, payload)
    },
    getScouted(payload) {
        return panel.post('/api/get-scouted/pt', payload)
    }
}
export default forms
