<script setup lang="ts">
import Hearder from './components/hearder.vue';

</script>
<template>
    <video id="homebg" autoplay muted loop>
        <!-- <source src="../homePage/assets/videos/homebg.mp4" type="video/mp4" /> -->
    </video>
    <Hearder></Hearder>

</template>
<style scoped>
#homebg {
    width: 100%;
    height: 100%;
    position: fixed; 
    top: 50%;
    transform: translateY(-50%);
    object-fit: unset;
}
</style>