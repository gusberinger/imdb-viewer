<script setup lang="ts">
import SeriesSearch from '@/components/SeriesSearch.vue'
</script>

<template>
    <main class="bg-gray-200 py-40">
        <series-search />
        <button
            @click="$router.push('series/tt0141842')"
            class="rounded-full bg-green-400 p-4 text-white transition-all hover:scale-105"
        >
            Go To Series
        </button>
    </main>
</template>
