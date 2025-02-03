// src/stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// បង្កើត store ដែលមានឈ្មោះថា 'counter'
export const useCounterStore = defineStore('counter', () => {
  // កំណត់ state (data) ដែលត្រូវបានគ្រប់គ្រង
  const count = ref(0)

  // ការបន្ថែម count
  const increment = () => {
    count.value++
  }

  // Getter: គណនាចំនួន count * 2
  const doubleCount = computed(() => count.value * 2)

  return { count, increment, doubleCount }
})
