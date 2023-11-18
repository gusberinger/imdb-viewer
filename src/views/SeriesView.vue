<script lang="ts" setup>
import Chart from '@/components/Chart.vue'
import ChartControls from '@/components/ChartControls.vue'
import SeriesSearch from '@/components/SeriesSearch.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useDataBaseStore } from '@/stores/databaseStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { db } = storeToRefs(useDataBaseStore())

onMounted(async () => {
    const tconst = route.params.tconst as string
    const group = Number(tconst.replace('tt', '')) % 500
    const response = await fetch(`/series_db/${group}/${tconst}.json`)
    const data = await response.json()
    db.value = data
})
</script>
<template>
    <div v-if="db !== null" class="flex min-h-screen flex-col items-center justify-center">
        <div class="flex flex-col md:flex-row items-center justify-between w-full max-w-3xl">
            <h1 class="text-xl py-5">{{ db.primaryTitle }} ({{ db.startYear }}–{{ db.endYear }})</h1>
            <div class="flex items-center gap-x-3">
                <theme-switcher />
                <SeriesSearch />
            </div>
        </div>
        <ChartControls />
        <Chart />
    </div>
</template>

<style></style>
