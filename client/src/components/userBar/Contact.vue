<script setup>
import {useMessengerStore} from "@/stores/messenger";
import {onMounted} from "vue";

const messengerStore = useMessengerStore()

const contact = defineProps({
  letter: String,
  name: String,
  lastMessage: String,
  userId: Number
})
</script>

<template>
  <div :class="['flex w-full h-16 text-xs mt-1 rounded-lg cursor-pointer',
   userId === messengerStore.userId && 'bg-indigo-100']">
    <div class="flex items-center">
      <div class="flex justify-center items-center h-12 w-12 mx-0.5 rounded-full bg-gray-300">
        <p class="text-2xl">{{ contact.letter }}</p>
      </div>
    </div>

    <div class="flex flex-col justify-center ml-2">
      <p class="font-semibold">{{ contact.name }}</p>
      <p>{{ contact.lastMessage }}</p>
    </div>
  </div>
</template>