<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config'
import { onMounted } from 'vue'
const isDark = useDark()
const PrimeVue = usePrimeVue()

</script>
<template>
    <RouterView :key="$route.fullPath" />
</template>
