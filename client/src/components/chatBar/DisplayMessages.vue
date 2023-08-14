<script setup>
import Message from '../chatBar/Message.vue'
import {useMessengerStore} from "@/stores/messenger";
import {useAuthStore} from "@/stores/auth";
import {nextTick, watchEffect} from "vue";

const messengerStore = useMessengerStore()
const authStore = useAuthStore()

</script>

<template>
  <div v-for="message in messengerStore.messages" :key="message.id" class="flex flex-col justify-start items-start">
    <Message :direction="message.user_id === authStore.authId ? 'justify-end' : 'justify-start'"
             :text="message.message"/>
  </div>
</template>