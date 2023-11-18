<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config';
import { onMounted } from 'vue';
const isDark = useDark()
const PrimeVue = usePrimeVue()

onMounted(() => {
    if (isDark.value) {
        PrimeVue.changeTheme('lara-light-teal', 'lara-dark-teal', 'lara-theme')
    }
})

</script>
<template>
    <RouterView :class="{}" />
</template>
