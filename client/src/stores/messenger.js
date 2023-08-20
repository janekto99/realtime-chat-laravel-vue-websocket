import {defineStore} from "pinia"
import axios from "axios"

export const useMessengerStore = defineStore('messenger', {
    state: () => ({
        userId: null,
        authId: parseInt(localStorage.getItem('authId')) ?? null,
        userName: null,
        users: [],
        message: '',
        messages: [],
        chatColor: 'bg-indigo-300',
        searchBar: '',
        scrollDown: false,
        smilesBar: false,
        colorsBar: false,
    }),

    getters: {
        getFilteredUsers: (state) => state.users.filter((user) => {
            return user.name.toLowerCase().includes(state.searchBar.toLowerCase())
        })
    },

    actions: {
        sendMessage() {
            if (this.userId && this.message !== '') {
                this.messages.push({message: this.message, user_id: this.authId})
                this.scrollDown = true
                axios.post('/api/message/create', {message: this.message, id: this.userId})
                this.message = ''
            }
        },

        getUsers() {
            axios.get('api/users').then((res) => {
                this.users = res.data
            })
        },

        async selectChat(user) {
            this.messages = []
            this.userId = user.id
            this.userName = user.name
            localStorage.setItem('userId', this.userId)
            await axios.post('api/messages', {userId: this.userId})
                .then((res) => {
                    this.messages = res.data
                    this.scrollDown = true
                })
        },

        addSmile(smile) {
            this.message += `${smile}`
        },

        setChatColor(color) {
            this.chatColor = color
        },

        scrollBottom(element) {
            element.scrollTop = element.scrollHeight
        },

        switchSmile() {
            this.smilesBar = !this.smilesBar
        },

        switchColor() {
            this.colorsBar = !this.colorsBar
        }
    },

})