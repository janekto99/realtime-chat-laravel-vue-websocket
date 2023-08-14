import {defineStore} from "pinia"
import axios from "axios"
import router from "@/router";
import {computed, ref, watchEffect} from "vue";

export const useMessengerStore = defineStore('messenger', {
    state: () => ({
        userId: null,
        userName: null,
        users: [],
        message: '',
        messages: [],
        chatColor: 'bg-indigo-300',
        searchBar: '',
        scrollDown: false,
    }),

    getters: {
        getFilteredUsers: (state) => state.users.filter((user) => {
            return user.name.toLowerCase().includes(state.searchBar.toLowerCase())
        })
    },

    actions: {
        sendMessage() {
            if (this.userId && this.message !== '') {
                const authId = parseInt(localStorage.getItem('authId'))
                this.messages.push({message: this.message, user_id: authId})
                this.scrollDown = true
                axios.post('/api/message/create', {message: this.message, id: this.userId}).then((res) => {

                })
                this.message = ''
            }
        },

        getUsers() {
            axios.get('api/users').then((res) => {
                this.users = res.data
            })
        },

        selectChat(user) {
            this.userId = user.id
            this.userName = user.name
            localStorage.setItem('userId', this.userId)
            axios.post('api/messages', {userId: this.userId})
                .then((res) => {
                    this.messages = res.data
                    this.scrollDown = true
                })
        },

        addSmile(smile) {
            this.message += `:${smile}:`
        },

        setChatColor(color) {
            this.chatColor = color
        },

        scrollBottom(element) {
            element.scrollTop = element.scrollHeight
        }
    },
})