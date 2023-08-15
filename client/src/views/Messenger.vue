<script setup>
import Contact from '../components/userBar/Contact.vue'
import SearchBar from '../components/userBar/SearchBar.vue'
import SendMessageBar from '../components/chatBar/SendMessageBar.vue'
import DisplayMessages from '../components/chatBar/DisplayMessages.vue'
import ActionNav from '../components/chatBar/ActionNav.vue'
import {nextTick, onBeforeMount, ref, watchEffect} from "vue";

import {useMessengerStore} from "@/stores/messenger";
import {useAuthStore} from "@/stores/auth";

const messengerStore = useMessengerStore()
const authStore = useAuthStore()

const users = ref()
const scroll = ref()

Echo.private(`message.${authStore.authId}`).listen('MessageEvent', (message) => {
  if (message.message.user_id === messengerStore.userId) {
    messengerStore.messages.push(message.message)
    messengerStore.scrollDown = true
  }
})

watchEffect(() => {
  if (messengerStore.scrollDown) {
    nextTick(() => {
      messengerStore.scrollBottom(scroll.value)
    })
    messengerStore.scrollDown = false
  }
})

onBeforeMount(() => {
  messengerStore.getUsers()
})
</script>

<template>
  <div class="h-screen w-screen">
    <div class="flex h-full items-end py-1">
      <div class="flex flex-col basis-1/4 xl:basis-1/6 h-full border-2 px-0.5 mx-1 rounded-lg">
        <SearchBar/>
        <div @change="" v-for="user in messengerStore.getFilteredUsers" :key="user.id" class="overflow-y-auto">
          <Contact @click="messengerStore.selectChat(user)"
                   :letter="user.name.charAt(0)"
                   :name="user.name"
                   :user-id="user.id"/>
        </div>
      </div>

      <div class="flex flex-col basis-3/4 xl:basis-5/6 h-full">
        <div v-if="messengerStore.userId !== null">
          <ActionNav/>
        </div>
        <div class="h-full overflow-y-auto" ref="scroll">
          <DisplayMessages v-if="messengerStore.userId !== null"/>
          <div class="flex justify-center items-center h-full text-xl font-semibold" v-else>
            <p>
              Please, choose user for chat
            </p>
          </div>
        </div>
        <div class="mb-1">
          <SendMessageBar/>
        </div>
      </div>
    </div>
  </div>
</template>