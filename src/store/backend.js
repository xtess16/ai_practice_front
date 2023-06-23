import axios from "axios";

export default {
    state: () => {
        return {
            backendURL: process.env.VUE_APP_BACKEND_URL,
            backendAPIURL: process.env.VUE_APP_BACKEND_URL + '/api',
            healthy: true
        }
    },
    mutations: {
        setHealthy(state, healthy) {
            state.healthy = healthy
        }
    },
    actions: {
        async updateHealthy({state, commit}) {
            try {
                const response = await axios.get(state.backendAPIURL + '/healthy/')
                commit('setHealthy', response.status === 200)
            } catch (e) {
                console.log(e)
                commit('setHealthy', false)
            }
        }
    },
    namespaced: true
}