<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
type SeriesDB = {
    tconst: string
    titleType: string
    primaryTitle: string
    originalTitle: string
    isAdult: '0' | '1'
    startYear: number
    endYear: number | null
    runtimeMinutes: number
    genres: string[]
    episodes: {
        tconst: string
        parentTconst: string
        seasonNumber: number
        episodeNumber: number
        averageRating: number
        numVotes: number
        titleType: string
        primaryTitle: string
        originalTitle: string
        isAdult: '0' | '1'
        startYear: number
        endYear: number | null
        runtimeMinutes: number
        genres: string[]
    }
}
const route = useRoute()
const db = ref<null | SeriesDB>(null)

onMounted(() => {
    const tconst = route.params.tconst
    import(`../assets/series_db/${tconst}.json`).then((module) => {
        db.value = module.default
    })
})
</script>
<template>
    <div v-if="db" class="flex min-h-screen flex-col items-center justify-center">
        <!-- {{ db }} -->
        <h1>{{ db.primaryTitle }} ({{ db.startYear }}–{{ db.endYear }})</h1>
        <h2 class="max-w-lg">{{ db.episodes }}</h2>
    </div>
</template>

<style></style>
