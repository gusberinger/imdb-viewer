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
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
const { db } = storeToRefs(useDataBaseStore())
const { displayOptions } = storeToRefs(useDisplayOptionsStore())

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const colors = ['#1be7ffff', '#6eeb83ff', '#e4ff1aff', '#e8aa14ff', '#ff5714ff']

// const data = {
//     labels: db.value.episodes.map((e) => e.seasonNumber + 'x' + e.episodeNumber),
//     datasets: [
//         {
//             label:
//                 displayOptions.value.yAxis === 'averageRating'
//                     ? 'Average Rating'
//                     : 'Number of Votes',
//             data: db.value.episodes.map((e) =>
//                 displayOptions.value.yAxis === 'averageRating' ? e.averageRating : e.numVotes
//             ),
//             pointBackgroundColor: (ctx) => {
//                 const season = db.value.episodes[ctx.dataIndex].seasonNumber
//                 return colors[season % colors.length]
//             },
//             borderWidth: displayOptions.value.lineEnabled ? 3 : 0,
//             pointBorderWidth: 0,
//             pointHitRadius: 20,
//             pointHoverRadius: displayOptions.value.pointsEnabled ? 6 : 1,
//             pointRadius: displayOptions.value.pointsEnabled ? 4 : 0,
//             borderCapStyle: 'square',
//             tension: 0.1
//         }
//     ]
// } satisfies ChartData<'line'>

// convert to computed:
const data = computed(() => {
    return {
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
                tension: 0.1,
                segment: {
								borderColor: (ctx) => {
									if (!displayOptions.value.colorEnabled) {
										return colors[0]
									}
									const idx = ctx.p0DataIndex
									const episode = db.value.episodes[idx]

									if (displayOptions.value.showSeasonConnectionSegments) {
										const nextEpisode = db.value.episodes[idx + 1]
										if (nextEpisode.seasonNumber !== episode.seasonNumber) {
											return "rgba(0,0,0,0)"
										}
									}
									return colors[episode.seasonNumber % colors.length]
								},
							},
            }
        ]
    } satisfies ChartData<'line'>
})

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
