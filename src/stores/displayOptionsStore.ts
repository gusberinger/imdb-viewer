import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type DisplayOptions = {
    yAxis: 'averageRating' | 'numVotes'
    yAxisRange: 'fit' | 'fixed'
    mode: 'points' | 'lines' | 'both'
    colorEnabled: boolean
    tooltipEnabled?: boolean
    hideSeasonConnectionSegments?: boolean
}

export const useDisplayOptionsStore = defineStore('displayOptions', () => {
    const displayOptions = ref<DisplayOptions>({
        yAxis: 'averageRating',
        yAxisRange: 'fixed',
        mode: 'both',
        colorEnabled: true,
        tooltipEnabled: true,
        hideSeasonConnectionSegments: true
    })

    const pointsEnabled = computed(
        () => displayOptions.value.mode === 'points' || displayOptions.value.mode === 'both'
    )

    const linesEnabled = computed(
        () => displayOptions.value.mode === 'lines' || displayOptions.value.mode === 'both'
    )
    return { displayOptions, pointsEnabled, linesEnabled }
})
