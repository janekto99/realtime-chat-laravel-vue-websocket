<script setup>
import {useMessengerStore} from "@/stores/messenger";

const messengerStore = useMessengerStore()

const colors = [
  'bg-slate-300',
  'bg-amber-300',
  'bg-emerald-300',
  'bg-sky-300',
  'bg-purple-300',
  'bg-rose-300',
];


</script>

<template>
  <div class="flex flex-col bg-gray-100 px-2 py-2 rounded-lg">
    <div v-for="color in colors">
      <p @click="messengerStore.setChatColor(color)" :class="['w-4 h-4 mx-1 my-1 rounded-full cursor-pointer', color]"></p>
    </div>
  </div>
</template>