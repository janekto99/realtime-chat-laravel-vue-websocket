import {defineStore} from "pinia"
import axios from "axios"
import router from "@/router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
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
                console.log(cookie)
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

                return response.status
            } catch (error) {
                console.log(error)
            }
        },

        async logout() {
            await axios.post("/logout")
            this.name = null
            this.email = null

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

// export const useAuthStore = defineStore('auth', {
//
//     state: () => ({
//         authUser: null,
//         authErrors: [],
//         authStatus: null,
//     }),
//
//     actions: {
//         async getToken() {
//             await axios.get("/sanctum/csrf-cookie");
//         },
//
//         async getUser() {
//             await axios.get('/api/user').then((res) => {
//                 console.log(res.data)
//             })
//         },
//
//         getCookieToken() {
//             let token = ''
//             let cookies = document.cookie.split('; ')
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i].split('=')
//                 console.log(cookie)
//                 if (cookie[0] === 'XSRF-TOKEN') {
//                     token = cookie[1]
//                     break
//                 }
//             }
//             return token
//         },
//
//         async register(name, email, password, confirmPassword) {
//             await this.getToken()
//             try {
//                 await axios.post('/register', {
//                     name: name,
//                     email: email,
//                     password: password,
//                     password_confirmation: confirmPassword
//                 })
//                 this.isLoggedIn = true
//                 localStorage.setItem('user', this.getCookieToken())
//             } catch (error) {
//                 console.log(error)
//             }
//
//         },
//
//         async login(email, password) {
//             await this.getToken()
//             try {
//                 await axios.post('/login', {
//                     email: email,
//                     password: password,
//                 }).then((res) => {
//                     // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getCookieToken()
//                     // this.isLoggedIn = true
//                     // localStorage.setItem('token', this.getCookieToken())
//                     router.push('/')
//                 })
//             } catch (error) {
//                 console.log(error)
//             }
//         },
//
//         async logout() {
//             this.isLoggedIn = false
//             localStorage.setItem('isLoggedIn', this.isLoggedIn)
//         }
//     },
// })
