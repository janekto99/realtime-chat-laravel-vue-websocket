import {defineStore} from "pinia"
import axios from "axios"
import router from "@/router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authId: parseInt(localStorage.getItem('authId')) ?? null,
        name: null,
        email: null,
        errors: []
    }),

    actions: {
        async getToken() {
            await axios.get("/sanctum/csrf-cookie");
        },

        getCookieToken() {
            let token = ''
            let cookies = document.cookie.split('; ')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].split('=')
                if (cookie[0] === 'XSRF-TOKEN') {
                    token = cookie[1]
                    break
                }
            }
            return token
        },

        async register(auth) {
            await this.getToken()
            try {
                await axios.post('/register', {
                    name: auth.name,
                    email: auth.email,
                    password: auth.password,
                    password_confirmation: auth.password_confirmation
                })
                await this.getUser()
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getCookieToken()
                await router.push('/')
            } catch (error) {
                this.errors = error.response.data.errors
            }
        },

        async login(auth) {
            await this.getToken()
            try {
                await axios.post('/login', {
                    email: auth.email,
                    password: auth.password,
                })
                await this.getUser()
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getCookieToken()
                await router.push('/')
            } catch (error) {
                this.errors = error.response.data.errors
            }
        },

        async getUser() {
            try {
                const response = await axios.get('/api/user')
                this.name = response.data.name
                this.email = response.data.email
                localStorage.setItem('authId', response.data.id)

                return response.status
            } catch (error) {
                console.log(error)
            }
        },

        async logout() {
            await axios.post("/logout")
            this.name = null
            this.email = null
            localStorage.removeItem('authId')

            await router.push('/auth/login')
        },

        async resetPassword(auth) {
            await this.getToken()
            try {
                await axios.post("/forgot-password", {
                    email: auth.email,
                })
            } catch (error) {
                this.errors = error.response.data.errors
                console.log(error.response.data.errors)
            }

            await router.push('/auth/login')
        }
    }
})