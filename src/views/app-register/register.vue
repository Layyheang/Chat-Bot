<script setup>
import headerTime from '../../components/header-time.vue';
import RegisterForm from './components/register-form.vue';
</script>

<template>
    <div class="login-background flex-col">
        <header-time></header-time>
        <div class="mt-8">
            <RegisterForm />
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
