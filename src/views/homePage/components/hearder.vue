<template>
    <div>
      <h1>Counter Example</h1>
      <p>Count: {{ count }}</p>
      <p>Double Count: {{ doubleCount }}</p>
      <button @click="increment">Increment</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useCounterStore } from '../home.store'
  
  // Use the store
  const counterStore = useCounterStore()
  
  // Destructure the store properties
  const { count, doubleCount, increment } = counterStore
  </script>
  