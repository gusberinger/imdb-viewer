<script lang="ts" setup>
import ChartViewer from '@/components/ChartViewer.vue'
import ChartControls from '@/components/ChartControls.vue'
import SeriesSearch from '@/components/SeriesSearch.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useDataBaseStore } from '@/stores/databaseStore'
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { TMDBSeries } from '@/types/database'

const NotFound = defineAsyncComponent(() => import('@/views/NotFound.vue'))
const seriesNotFound = ref(false)
const route = useRoute()
const { db } = storeToRefs(useDataBaseStore())
const { displayOptions } = storeToRefs(useDisplayOptionsStore())
const tmdb = ref<null | TMDBSeries>(null)

const posterUrl = (path: string) => {
    return `https://image.tmdb.org/t/p/w500${path}`
}

onMounted(async () => {
    const tconst = route.params.tconst as string
    const group = Number(tconst.replace('tt', '')) % 500
    try {
        const response = await fetch(`/series/${group}/${tconst}.json`)
        const data = await response.json()
        db.value = data
    } catch (error) {
        seriesNotFound.value = true
        return
    }

    try {
        const response = axios.get(`/tmdb`, {
            params: {
                tconst: tconst
            }
        })
        tmdb.value = (await response).data
    } catch (error) {
        console.log('hello world error', error)
    }

    if (displayOptions.value.autoSwitchMode) {
        if (db.value.episodes.length > 300) {
            displayOptions.value.mode = 'points'
        }
    }
})
</script>
<template>
    <div v-if="seriesNotFound">
        <NotFound />
    </div>
    <div v-if="db !== null" class="flex min-h-screen flex-col items-center justify-center">
        <div class="flex w-full max-w-3xl flex-col items-center justify-between md:flex-row">
            <h1 v-if="db.startYear != db.endYear" class="py-5 text-xl">
                {{ db.primaryTitle }} ({{ db.startYear }}–{{ db.endYear }})
            </h1>
            <h1 v-else>{{ db.primaryTitle }} ({{ db.startYear }})</h1>
            <div class="flex items-center gap-x-3">
                <theme-switcher />
                <SeriesSearch />
            </div>
        </div>
        <div
            v-if="tmdb != null"
            class="flex flex-col items-center justify-evenly gap-x-4 py-10 md:flex-row md:items-start md:text-left text-justify gap-y-2"
        >
            <a :href="`https://imdb.com/title/${db.tconst}`"
                ><img
                    width="128"
                    height="190"
                    :src="`https://image.tmdb.org/t/p/w500/${tmdb.poster_path}`"
                    class="w-32"
            /></a>
            <p
                class="overview"
                :class="{
                    'max-w-lg': tmdb.overview.length > 400,
                    'max-w-md': tmdb.overview.length > 150 && tmdb.overview.length <= 400,
                    'max-w-xs': tmdb.overview.length <= 150
                }"
            >
                {{ tmdb.overview }}
            </p>
        </div>
        <div v-else class="py-[9.8rem]"></div>
        <ChartControls />
        <ChartViewer />
        <footer class="mt-10 py-10 text-sm text-gray-400">
            © {{ new Date().getFullYear() }} Gus Beringer. Information courtesy of
            <a href="https://www.imdb.com">IMDb</a>, used with permission.
        </footer>
    </div>
</template>
