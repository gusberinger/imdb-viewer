<script setup lang="ts">
import SeriesSearch from '@/components/SeriesSearch.vue';

</script>

<template>
    <main class="bg-gray-200 py-40">
        <series-search />
        <button
            @click="$router.push('series/tt0141842')"
            class="p-4 rounded-full bg-green-400 text-white hover:scale-105 transition-all"
        >
            Go To Series
        </button>
    </main>
</template>
