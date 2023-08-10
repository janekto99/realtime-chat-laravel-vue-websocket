<script setup>
import Contact from '../components/userBar/Contact.vue'
import SearchBar from '../components/userBar/SearchBar.vue'
import SendMessageBar from '../components/chatBar/SendMessageBar.vue'
import DisplayMessages from '../components/chatBar/DisplayMessages.vue'
import ActionNav from '../components/chatBar/ActionNav.vue'

Echo.private('chatFriends').listen('MessageEvent', (e) => {
  console.log(e)
})
</script>

<template>
  <div class="h-screen w-screen">
    <div class="flex h-full items-end py-1">
      <div class="flex flex-col basis-1/4 xl:basis-1/6 h-full border-2 px-0.5 mx-1 rounded-lg">
        <SearchBar/>
        <div class="overflow-y-auto">
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
        </div>
      </div>

      <div class="flex flex-col basis-3/4 xl:basis-5/6 h-full">
        <div>
          <ActionNav/>
        </div>
        <div class="h-full">
          <DisplayMessages/>
        </div>
        <div class="mb-1">
          <SendMessageBar/>
        </div>
      </div>
    </div>
  </div>

</template>