import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type DisplayOptions = {
    yAxis: 'averageRating' | 'numVotes'
    yAxisScale: 'fit' | 'fixed'
    mode: 'points' | 'lines' | 'both'
    colorEnabled: boolean
    tooltipEnabled?: boolean
    showSeasonConnectionSegments?: boolean
}

export const useDisplayOptionsStore = defineStore('displayOptions', () => {
    const displayOptions = ref<DisplayOptions>({
        yAxis: 'averageRating',
        yAxisScale: 'fixed',
        mode: 'both',
        colorEnabled: true,
        tooltipEnabled: true,
        showSeasonConnectionSegments: false
    })

    const pointsEnabled = computed(
        () => displayOptions.value.mode === 'points' || displayOptions.value.mode === 'both'
    )

    const linesEnabled = computed(
        () => displayOptions.value.mode === 'lines' || displayOptions.value.mode === 'both'
    )
    return { displayOptions, pointsEnabled, linesEnabled }
})
