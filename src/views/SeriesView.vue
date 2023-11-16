<script lang="ts" setup>
import Chart from '@/components/Chart.vue'
import { useDataBaseStore } from '@/stores/databaseStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useDataBaseStore()
const { db } = storeToRefs(store)

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
        <h1>{{ db.primaryTitle }} ({{ db.startYear }}–{{ db.endYear }})</h1>
        <!-- <h2 class="max-w-lg">{{ db.episodes }}</h2> -->
        <Chart />
    </div>
</template>

<style></style>
