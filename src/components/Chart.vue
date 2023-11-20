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
import { computed, ref } from 'vue'
import { Line } from 'vue-chartjs'
const { episodes } = storeToRefs(useDataBaseStore())
const displayStore = useDisplayOptionsStore()
const { displayOptions } = storeToRefs(displayStore)

const lineChart = ref<null | typeof Line>(null)


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = computed(() => {
    const colors = displayOptions.value.colors
    return {
        // @ts-ignore - force reactivity
        hideSeasonConnectionSegments: displayStore.displayOptions.hideSeasonConnectionSegments,

        labels: episodes.value.map((e) => e.seasonNumber + 'x' + e.episodeNumber),
        datasets: [
            {
                normalized: true,
                label:
                    displayOptions.value.yAxis === 'averageRating'
                        ? 'Average Rating'
                        : 'Number of Votes',
                data: episodes.value.map((e) =>
                    displayOptions.value.yAxis === 'averageRating' ? e.averageRating : e.numVotes
                ),
                pointBackgroundColor: (ctx) => {
                    const season = episodes.value[ctx.dataIndex].seasonNumber
                    return '#' + colors[season % colors.length]
                },
                borderWidth: displayStore.linesEnabled ? 3 : 0,
                pointBorderWidth: 0,
                pointHitRadius: 20,
                pointHoverRadius: displayStore.pointsEnabled ? 6 : 1,
                pointRadius: displayStore.pointsEnabled ? 4 : 0,
                borderCapStyle: 'square',
                tension: 0.1,
                segment: {
                    borderColor: (ctx) => {
                        const idx = ctx.p0DataIndex
                        const episode = episodes.value[idx]

                        if (displayOptions.value.hideSeasonConnectionSegments) {
                            const nextEpisode = episodes.value[idx + 1]
                            if (nextEpisode.seasonNumber !== episode.seasonNumber) {
                                return 'rgba(0,0,0,0)'
                            }
                        }
                        return '#' + colors[episode.seasonNumber % colors.length]
                    }
                }
            }
        ]
    } satisfies ChartData<'line'>
})

const options = computed(() => {
    return {
        animation: {
            duration: 0
        },
        onClick: (event, elements) => {
            // @ts-ignore - incorrect library type
            if (!event?.native?.shiftKey || elements.length === 0) {
                return
            }
            const element = episodes.value[elements[0].index]
            const link = `https://www.imdb.com/title/${element.tconst}`
            window.open(link, '_blank')
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                max: displayOptions.value.yAxis == 'averageRating' ? 10 : undefined,
                min:
                    displayOptions.value.yAxis == 'averageRating' &&
                    displayOptions.value.yAxisRange == 'fixed'
                        ? 0
                        : undefined
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text:
                    displayOptions.value.yAxis === 'averageRating'
                        ? `Episode Ratings`
                        : `Episode Votes`
            },
            tooltip: {
                enabled: !displayOptions.value.tooltipDisabled,
                callbacks: {
                    label: (ctx) => {
                        const index = ctx.dataIndex
                        const episode = episodes.value[index]
                        const value = episode.primaryTitle
                        return value == null ? '[No Title]' : value
                    },
                    afterBody: (tooltipInfo) => {
                        const index = tooltipInfo[0].dataIndex
                        const episode = episodes.value[index]
                        let message = `Season ${episode.seasonNumber} Episode ${episode.episodeNumber}`
                        message += `\n${episode.averageRating}/10`
                        message += `\n${episode.numVotes} votes`
                        return message
                    },
                    title: () => ''
                },
                borderWidth: 20
            }
        }
    } satisfies ChartOptions<'line'>
})
</script>
<template>
    <div>
        <Line :width="1000" :height="500" :data="data" :options="options" ref="lineChart" />
    </div>
</template>
