<script setup>
import Login from '../app-login/components/login-form.vue'
import headerTime from './components/header-time.vue';
</script>

<template>
    <div class="login-background flex-col ">
        <div class="flex justify-between">
            <div class="flex justify-between w-[30vh]">
                <img style="width: 63px; height: 60px; margin-bottom: 4rem;" src="../app-login/assets/chatbot.png" alt="logo" />
                <p class="p-2 font-bold text-white text-[20px]">Expert Systems</p>
            </div>
            <div>
                <header-time></header-time>
            </div>
        </div>
        <div>
            <Login />
        </div>

    </div>
</template>

<style lang="scss" scoped>
.login-background {
    background: linear-gradient(to bottom, #3b3a66, #1f6581 60%);
    padding: 2rem;
    width: 100%;
    height: 100vh;
}
</style>
