<script setup>
import SmilesBar from './SmilesBar.vue'
import ChatColor from './ChatColor.vue'
import {useMessengerStore} from "@/stores/messenger";
import {ref} from "vue";

const messengerStore = useMessengerStore()

const switchSmile = ref(false)
const displaySmile = () => {
  switchSmile.value = !switchSmile.value
}

const switchColor = ref(false)
const displayColors = () => {
  switchColor.value = !switchColor.value
}
</script>

<template>
  <div class="flex justify-between h-8 w-full">
    <div class="basis-11/12 flex justify-start bg-gray-200 rounded-lg">
      <input v-model="messengerStore.message" @keydown.enter="messengerStore.sendMessage"
             placeholder="Send a message.."
             class="bg-gray-200 basis-11/12 outline-none pl-2 rounded-l-lg" type="text">
      <div class="flex justify-end items-center basis-1/12">
        <SmilesBar class="absolute bottom-12" v-if="switchSmile"/>
        <img @click="displaySmile" class="mr-2 object-contain h-5 cursor-pointer" src="../../assets/smiles.png" alt="">
      </div>
    </div>
    <div class="basis-1/12 flex justify-center items-center">
      <ChatColor class="absolute bottom-12" v-if="switchColor"/>
      <img @click="displayColors" class="object-contain h-5 cursor-pointer" src="../../assets/chatColor.svg" alt="">
    </div>
  </div>
</template>