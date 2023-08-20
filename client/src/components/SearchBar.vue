<script setup>
import {useMessengerStore} from "@/stores/messenger"

const messengerStore = useMessengerStore()
</script>

<template>
  <div class="flex justify-start my-1 text-xs">
    <input v-model="messengerStore.searchBar" placeholder="Search friend.."
           class="w-full border-2 border-gray-300 rounded-lg py-1.5 pl-2" type="text">
  </div>
</template>