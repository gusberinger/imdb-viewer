<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config'

</script>
<template>
    <RouterView :key="$route.fullPath" />
</template>
