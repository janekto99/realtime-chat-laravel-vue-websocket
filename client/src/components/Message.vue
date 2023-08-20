<script setup>
import {useMessengerStore} from "@/stores/messenger";

const messengerStore = useMessengerStore()

defineProps({
  direction: String,
  text: String
})
</script>

<template>
  <div class="w-full my-2">
    <div :class="['flex flex-wrap mx-3 text-[15px]', direction]">
      <p :class="['flex rounded-xl px-2 py-2 text-xs break-all', messengerStore.chatColor]">{{ text }}</p>
    </div>
  </div>

</template>