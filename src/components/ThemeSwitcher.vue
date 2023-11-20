<script lang="ts" setup>
import { MoonIcon } from '@heroicons/vue/24/outline'
import { SunIcon } from '@heroicons/vue/24/outline'
import { useDark } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config'
const PrimeVue = usePrimeVue()

const isDark = useDark()

const toggleMoonClick = () => {
    PrimeVue.changeTheme('lara-dark-teal', 'lara-light-teal', 'lara-theme')
    isDark.value = false
}

const toggleSunClick = () => {
    PrimeVue.changeTheme('lara-light-teal', 'lara-dark-teal', 'lara-theme')
    isDark.value = true
}
</script>
<template>
    <div>
        <MoonIcon
            class="w-8 cursor-pointer hover:scale-105"
            v-if="isDark"
            @click="toggleMoonClick"
        />
        <SunIcon class="w-8 cursor-pointer hover:scale-105" v-else @click="toggleSunClick" />
    </div>
</template>
