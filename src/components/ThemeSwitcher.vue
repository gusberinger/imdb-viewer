<script lang="ts" setup>
import { MoonIcon } from '@heroicons/vue/24/outline'
import { SunIcon } from '@heroicons/vue/24/outline'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
})

const toggleDarkMode = useToggle(isDark)

</script>
<template>
    <div>
        <MoonIcon
            class="w-8 text-white cursor-pointer hover:scale-105"
            v-if="isDark"
            @click="() => toggleDarkMode()"
        />
        <SunIcon class="w-8 cursor-pointer hover:scale-105" v-else @click="() => toggleDarkMode()" />
    </div>
</template>
