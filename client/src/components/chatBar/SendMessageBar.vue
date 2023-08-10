<script setup>
import {reactive} from "vue";

const message = reactive({
  message: ''
})

const sendMessage = () => {
  axios.post('/api/message/create', message).then((res) => {
    Echo.private('message').listen('MessageEvent', (e) => {
      console.log(e)
    })
  })
}


</script>

<template>
  <div class="flex justify-between h-8 w-full">
    <div class="basis-11/12 flex justify-start bg-gray-200 rounded-lg">
      <input v-model="message.message" @keydown.enter="sendMessage" placeholder="Send a message.." class="bg-gray-200 basis-11/12 outline-none pl-2 rounded-l-lg" type="text">
      <div class="flex justify-center items-center basis-1/12">
        <img class="object-contain h-5" src="../../assets/smiles.png" alt="">
      </div>
    </div>
    <div class="basis-1/12 flex justify-center items-center">
      <img class="object-contain h-5" src="../../assets/chatColor.svg" alt="">
    </div>
  </div>
</template>