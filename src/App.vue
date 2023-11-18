<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config';
import { watch } from 'vue';
const isDark = useDark()

const PrimeVue = usePrimeVue()

</script>
<template>
    <RouterView :class="{}" />
</template>
