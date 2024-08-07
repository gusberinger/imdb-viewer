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
import { computed, ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
const { episodes } = storeToRefs(useDataBaseStore())
const displayStore = useDisplayOptionsStore()
const { displayOptions } = storeToRefs(displayStore)

const lineChart = ref<any>(null)

watch(displayOptions.value.colors, () => {
    lineChart.value?.chart?.update()
})

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = computed(() => {
    const colors = displayOptions.value.colors
    return {
        // @ts-ignore - force reactivity
        hideSeasonConnectionSegments: displayStore.displayOptions.hideSeasonConnectionSegments,

        labels: episodes.value.map((e) => e[1] + 'x' + e[2]),
        datasets: [
            {
                normalized: true,
                label:
                    displayOptions.value.yAxis === 'averageRating'
                        ? 'Average Rating'
                        : 'Number of Votes',
                data: episodes.value.map((e) =>
                    displayOptions.value.yAxis === 'averageRating' ? e[3] : e[4],
                ),
                pointBackgroundColor: (ctx) => {
                    const season = episodes.value[ctx.dataIndex][1]
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
                            if (nextEpisode[1] !== episode[1]) {
                                return 'rgba(0,0,0,0)'
                            }
                        }
                        return '#' + colors[episode[1] % colors.length]
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
            if (!displayOptions.value.shiftClickToOpenInNewTab) {
                return
            }
            // @ts-ignore - incorrect library type
            if (!event?.native?.shiftKey || elements.length === 0) {
                return
            }
            const element = episodes.value[elements[0].index]
            const link = `https://www.imdb.com/title/${element[0]}`
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
                        const value = episode[5]
                        return value == null ? '[No Title]' : value
                    },
                    afterBody: (tooltipInfo) => {
                        const index = tooltipInfo[0].dataIndex
                        const episode = episodes.value[index]
                        let message = `Season ${episode[1]} Episode ${episode[2]}`
                        if (episode[6]) {
                            message += `\n${episode[6]}`
                        }
                        message += `\n${episode[3]}/10`
                        message += `\n${episode[4]} votes`
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
