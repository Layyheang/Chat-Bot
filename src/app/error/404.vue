<script setup lang="ts">
import errorNotFound from '../assets/svg/404 error lost in space-pana.svg';
</script>

<template>
    <div class="bg-error">
        <img :src="errorNotFound" alt="Error Not Found" class="errorPage">
    </div>
</template>

<style scoped>
.bg-error {
    display: flex;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--layout-color);
}

.errorPage {
    max-width: 80%; 
    max-height: 80%; 
    object-fit: cover; 
}
</style>




