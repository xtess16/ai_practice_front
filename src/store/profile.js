// import axios from "axios";

import axios from "axios";
import router from "@/router";
import {ElNotification} from "element-plus";

export default {
    state: () => {
        return {
            isAuthenticated: false,
            token: null
        }
    },
    getters: {
        getToken(state) {
            return state.token || localStorage.getItem('token')
        },
        getUsername() {
            return localStorage.getItem('username')
        }
    },
    mutations: {
        setIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
            if (!isAuthenticated) {
                localStorage.removeItem('token')
                state.token = null
            }
        },
        setUsername(state, username) {
            localStorage.setItem('username', username)
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        }
    },
    actions: {
        async getProfile({ getters, rootState, commit }) {
            try {
                let response = await axios.get(rootState.backend.backendAPIURL+'/profile/', {
                    headers: {
                        Authorization: `Token ${getters.getToken}`
                    }
                })
                if (response.status === 200) {
                    commit('setIsAuthenticated', true)
                    commit('setUsername', response.data.username)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async authenticate({ rootState, commit }, {username, password}) {
            try {
                let response = await axios.post(rootState.backend.backendAPIURL+'/auth/login/', {}, {
                    auth: {
                        username: username,
                        password: password
                    }
                })
                if (response.status === 200) {
                    commit('setIsAuthenticated', true)
                    commit('setToken', response.data.token)
                    commit('setUsername', response.data.user.username)
                    await router.push({name: 'profile'})
                }
            } catch (e) {
                ElNotification({
                    title: 'Ошибка',
                    message: 'Неправильные логин/пароль',
                    type: 'error'
                })
            }
        }
    },
    namespaced: true
}