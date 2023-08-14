<script setup>
import {useAuthStore} from "@/stores/auth";
import {useMessengerStore} from "@/stores/messenger";

const messengerStore = useMessengerStore()
const authStore = useAuthStore()
</script>

<template>
  <div class="flex ml-4 items-center justify-between h-12 font-semibold">
    <p>{{ messengerStore.userName }}</p>
    <div class="flex">
      <img @click="authStore.logout()" class="object-contain h-5 px-3 cursor-pointer" src="../../assets/logout.png" alt="">
      <img class="object-contain h-5 px-3 cursor-pointer" src="../../assets/call.png" alt="">
      <img class="object-contain h-5 px-3 cursor-pointer" src="../../assets/video.png" alt="">
    </div>
  </div>
  <div class="border-b-2 mr-2"></div>
</template>