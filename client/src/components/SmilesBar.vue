<script setup>
import {useMessengerStore} from "@/stores/messenger";

const messengerStore = useMessengerStore()

const smiles = {
  lol: '😁',
  rofl: '🤣',
  wink: '😉',
  kiss: '😘',
  cry: '😥',
  nerd: '🤓',
}


</script>

<template>
  <div class="flex flex-wrap bg-gray-100 px-2 py-2 rounded-lg">
    <div v-for="smile in smiles"  >
      <div class="cursor-pointer" @click="messengerStore.addSmile(smile)">{{smile}}</div>
    </div>
  </div>
</template>