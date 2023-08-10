<script setup>
import Message from '../chatBar/Message.vue'
</script>

<template>
  <div class="flex flex-col justify-start items-start">
    <Message/>
    <Message :direction="'justify-end'"/>
    <Message/>
  </div>
</template>