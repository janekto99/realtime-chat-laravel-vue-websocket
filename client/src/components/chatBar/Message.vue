<script setup>
defineProps({
  direction: String
})
</script>

<template>
  <div class="w-full my-2">
    <div :class="['flex mx-3 text-xs', direction]">
      <p class="flex bg-indigo-300 rounded-xl px-2 py-2">Testovací zpráva je velmi dlouhá. Zdravím tě!!!</p>
    </div>
  </div>

</template>