<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
    <main>
        <button
            @click="$router.push('series/234')"
            class="p-4 rounded-full bg-green-400 text-white hover:scale-105 transition-all"
        >
            Go To Series
        </button>
    </main>
</template>
