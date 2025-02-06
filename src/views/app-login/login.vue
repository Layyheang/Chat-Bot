<script setup>
import Login from '../app-login/components/login-form.vue'
import headerTime from '../../components/header-time.vue';
</script>

<template>
    <div class="login-background flex-col ">
        <header-time></header-time>
        <div>
            <Login />
        </div>

    </div>
</template>

<style lang="scss" scoped>
.login-background {
    background: linear-gradient(to bottom, #3b3a66, #1f6581 60%);
    width: 100%;
    height: 100vh;
}
</style>
