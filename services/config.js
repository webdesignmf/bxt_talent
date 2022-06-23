import axios from 'axios'

export function config(type, token) {
    if (type === 'panel') {
        panel.defaults.headers.common.Authorization = token
    } else {
        integration.defaults.headers.common.Authorization = token
    }
}
const panel = axios.create({
    baseURL: process.env.BASE_URL || 'https://bxt.managerfashion.net'
})
const integration = axios.create({
    baseURL: 'https://integration.managerfashion.net'
})
export { panel, integration }
