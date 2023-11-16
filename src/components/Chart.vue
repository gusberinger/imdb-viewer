<script lang="ts" setup>
import { useDataBaseStore } from '@/stores/databaseStore'
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData
} from 'chart.js'
import { storeToRefs } from 'pinia'
import { Line } from 'vue-chartjs'
const { db } = storeToRefs(useDataBaseStore())
const { displayOptions } = storeToRefs(useDisplayOptionsStore())

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const colors = ['#1be7ffff', '#6eeb83ff', '#e4ff1aff', '#e8aa14ff', '#ff5714ff']

const data = {
    labels: db.value.episodes.map((e) => e.seasonNumber + 'x' + e.episodeNumber),
    datasets: [
        {
            label:
                displayOptions.value.yAxis === 'averageRating'
                    ? 'Average Rating'
                    : 'Number of Votes',
            data: db.value.episodes.map((e) =>
                displayOptions.value.yAxis === 'averageRating' ? e.averageRating : e.numVotes
            ),
            pointBackgroundColor: (ctx) => {
                const season = db.value.episodes[ctx.dataIndex].seasonNumber
                return colors[season % colors.length]
            },
            borderWidth: displayOptions.value.lineEnabled ? 3 : 0,
            pointBorderWidth: 0,
            pointHitRadius: 20,
            pointHoverRadius: displayOptions.value.pointsEnabled ? 6 : 1,
            pointRadius: displayOptions.value.pointsEnabled ? 4 : 0,
            borderCapStyle: 'square',
            tension: 0.1
        }
    ]
} satisfies ChartData<'line'>

const options = {
    normalized: true,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0
    }
} satisfies ChartOptions<'line'>
</script>
<template>
    <div>
    <Line :width="1000" :height="500" :data="data" :options="options" />
    </div>
</template>
