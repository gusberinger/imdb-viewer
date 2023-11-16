<script lang="ts" setup>
import Chart from '@/components/Chart.vue'
import ChartControls from '@/components/ChartControls.vue'
import SeriesSearch from '@/components/SeriesSearch.vue'
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
        <div class="flex w-full max-w-3xl flex-col items-center justify-between md:flex-row">
            <h1 class="py-5 text-xl">
            {{ db.primaryTitle }} ({{ db.startYear }}–{{ db.endYear.replace("\\N", "") }})
                <span v-if="db.originalTitle !== db.primaryTitle" class="italic text-gray-500">{{ db.originalTitle }}</span>
            </h1>
            <SeriesSearch />
        </div>
        <ChartControls />
        <Chart />
    </div>
</template>

<style></style>
