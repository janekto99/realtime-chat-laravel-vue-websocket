<script setup>
import {useMessengerStore} from "@/stores/messenger";

const messengerStore = useMessengerStore()

const smiles = ['angel', 'base', 'kiss', 'lol', 'smile', 'wink'];


</script>

<template>
  <div class="flex flex-wrap bg-gray-100 px-2 py-2 rounded-lg">
    <div v-for="smile in smiles" >
      <img @click="messengerStore.addSmile(smile)" class="object-contain h-6 cursor-pointer" :src="'./src/assets/smiles/' + smile + '.png'" alt="">
    </div>
  </div>
</template>