import { panel, integration } from '~/services/config.js'
export default ({ store }) => {
    panel.interceptors.request.use((request) => {
        request.headers.common.Authorization = store.state.token.panel
        return request
    })
    integration.interceptors.request.use((request) => {
        request.headers.common.Authorization = store.state.token.mf
        return request
    })
}
