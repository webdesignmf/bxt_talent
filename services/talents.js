import { integration } from './config'

const talents = {
    getOrdered() {
        return integration.post(`/api/talents?language=pt&paginate=5`, {
            sort: 1
        })
    },
    get(payload) {
        const { paginate, filters } = payload

        return integration.post(
            `/api/talents?language=pt&paginate=${paginate}`,
            {
                filters
            }
        )
    },
    getTalent(payload) {
        const form = {
            language: 'pt',
            id: payload,
            cover2: 1,
            skills: 1
        }
        return integration.get(`/api/talent/profile`, {
            params: form
        })
    }
}
export default talents
