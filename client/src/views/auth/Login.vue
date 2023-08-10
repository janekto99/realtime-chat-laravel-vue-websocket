<script setup>
import {useAuthStore} from "@/stores/auth";
import {onMounted, reactive} from "vue";

const authStore = useAuthStore()

let auth = reactive({
  email: '',
  password: '',
})

onMounted(() => {
  axios.get('/api/users').then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-[#A3ACBD]">
    <div class="flex flex-col px-4 py-4 bg-[#1f2a3d] rounded-lg z-10">
      <h2 class="m-auto text-2xl my-6 text-[#06ddc4]">LOGIN</h2>

      <div class="relative z-0 group m-auto my-2">
        <input v-model="auth.email" type="email"
               class="flex w-80 py-2 pl-1 text-gray-100 bg-transparent border focus:border-[#06ddc4] appearance-none
                      focus:outline-none focus:ring-0 peer rounded-lg"
               placeholder=" "
               required/>
        <p v-if="authStore.errors.email" class="text-red-600 text-xs text-center mt-1">{{authStore.errors.email[0]}}</p>
        <label class="absolute ml-2 px-1 text-sm text-white bg-[#1f2a3d]
               duration-300 transform -translate-y-6 scale-75 top-3 z-10 hover:-z-10 peer-focus:z-10 peer-focus:px-1 origin-[0] peer-focus:left-0
                peer-focus:text-[#06ddc4] peer-placeholder-shown:scale-100
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                  peer-focus:-translate-y-6 peer-focus:bg-[#1f2a3d] peer-focus:rounded-md">
          Email</label>
      </div>

      <div class="relative z-0 group m-auto my-2">
        <input v-model="auth.password" type="password"
               class="flex w-80 py-2 pl-1 text-gray-100 bg-transparent border focus:border-[#06ddc4] appearance-none
                      focus:outline-none focus:ring-0 peer rounded-lg"
               placeholder=" "
               required/>
        <p v-if="authStore.errors.password" class="text-red-600 text-xs text-center mt-1">{{authStore.errors.password[0]}}</p>
        <label class="absolute ml-2 px-1 text-sm text-white bg-[#1f2a3d]
               duration-300 transform -translate-y-6 scale-75 top-3 z-10 hover:-z-10 peer-focus:z-10 peer-focus:px-1 origin-[0] peer-focus:left-0
                peer-focus:text-[#06ddc4] peer-placeholder-shown:scale-100
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                  peer-focus:-translate-y-6 peer-focus:bg-[#1f2a3d] peer-focus:rounded-md">
          Password</label>
      </div>

      <button @click="authStore.login(auth)" class="bg-[#007B6D] w-3/4 m-auto rounded-lg text-white py-2 mt-4 hover:bg-[#005E53]">Log in</button>

      <div class="flex flex-col items-center mt-6 text-xs text-gray-100">
        <a class="hover:text-gray-300" href="/auth/forgot-password">Forgot password?</a>
        <a class="mt-1.5 hover:text-gray-300" href="/auth/register">Don't have an account? Create it.</a>
      </div>
    </div>
  </div>
</template>