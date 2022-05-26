import { integration, panel } from './config.js'
const login = {
    mf(payload) {
        // if (payload.salt && payload.api_key) {
        return integration.post('/api/signin', payload)
        // .catch((error) => {
        //     console.log(error)
        //     return { data: { access_token: '', error } }
        // })
        // } else {
        //     console.log('not params integration')
        //     return { data: { access_token: '' } }
        // }
    },
    panel(payload) {
        // if (payload.salt && payload.api_token) {
        return panel.post('/api/login', payload)
        //     .catch((error) => {
        //         console.log(error)
        //         return { data: { access_token: '', error } }
        //     })
        // } else {
        //     console.log('not params integration')
        //     return { data: { access_token: '' } }
        // }
    }
}
export default login
