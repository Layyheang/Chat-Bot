<script setup lang="ts">
import headerTime from '../../components/header-time.vue';

</script>
<template>
    <div class="homebg flex-col h-full">
        <header-time></header-time>
        <div>
        </div>

    </div>
</template>
<style scoped>
.homebg {
    background: linear-gradient(to bottom, #3b3a66, #1f6581 60%);
    width: 100%;
    height: 100vh;
    position: fixed; 
    top: 50%;
    transform: translateY(-50%);
    object-fit: unset;
}
</style>