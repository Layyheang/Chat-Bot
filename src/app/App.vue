<script setup lang="ts"> 
import { computed } from 'vue' 
import { useRoute } from 'vue-router' 
import Toast from 'primevue/toast'; 
import ConfirmDialog from 'primevue/confirmdialog'; 
import AppClean from './layout/app-clean.vue';
import AppDefault from './layout/app-defult.vue';
const route = useRoute() 

const isCleanLayout = computed(() => route.meta.isCleanLayout); 
</script> 
<template>
  <div class="flex font-battambang">
    <!-- Main Content -->
    <div class=" flex flex-col flex-1 min-w-0 h-screen overflow-hidden p-0">
      <Toast position="top-right" />
      <ConfirmDialog :draggable="false" />
      <AppClean v-if="isCleanLayout === undefined || isCleanLayout" />
      <AppDefault v-else />
      <!-- <AppLoading :loading="store.fetchUserDetailLoading" /> -->
    </div>
  </div>
</template>

 
