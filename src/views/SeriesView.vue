<script lang="ts" setup>
import Chart from '@/components/Chart.vue'
import ChartControls from '@/components/ChartControls.vue'
import SeriesSearch from '@/components/SeriesSearch.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useDataBaseStore } from '@/stores/databaseStore'
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { db } = storeToRefs(useDataBaseStore())
const {displayOptions} = storeToRefs(useDisplayOptionsStore())

onMounted(async () => {
    const tconst = route.params.tconst as string
    const group = Number(tconst.replace('tt', '')) % 500
    const response = await fetch(`/series_db/${group}/${tconst}.json`)
    const data = await response.json()
    db.value = data

    if (displayOptions.value.autoSwitchMode) {
        if (db.value.episodes.length > 300) {
            displayOptions.value.mode = 'points'
        } 
    }
})
</script>
<template>
    <div v-if="db !== null" class="flex min-h-screen flex-col items-center justify-center">
        <div class="flex w-full max-w-3xl flex-col items-center justify-between md:flex-row">
            <h1 class="py-5 text-xl">
                {{ db.primaryTitle }} ({{ db.startYear }}–{{ db.endYear }})
            </h1>
            <div class="flex items-center gap-x-3">
                <theme-switcher />
                <SeriesSearch />
            </div>
        </div>
        <ChartControls />
        <Chart />
        <footer class="py-10 mt-10 text-sm text-gray-400">
            © {{ new Date().getFullYear() }} Gus Beringer.
            Information courtesy of
            <a href="https://www.imdb.com">IMDb</a>,
            used with permission.
        </footer>
    </div>
</template>

<style></style>
