import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type DisplayOptions = {
    yAxis: 'averageRating' | 'numVotes'
    yAxisRange: 'fit' | 'fixed'
    mode: 'points' | 'lines' | 'both'
    colorEnabled: boolean
    tooltipDisabled: boolean
    hideSeasonConnectionSegments: boolean
    hidePilots: boolean
    hideUnrated: boolean
}

const defaultDisplayOptions: DisplayOptions = {
    yAxis: 'averageRating',
    yAxisRange: 'fixed',
    mode: 'both',
    colorEnabled: true,
    tooltipDisabled: false,
    hideSeasonConnectionSegments: true,
    hidePilots: true,
    hideUnrated: true
}

const savedDisplayOptions = localStorage.getItem('displayOptions')

export const useDisplayOptionsStore = defineStore('displayOptions', () => {
    const displayOptions = ref<DisplayOptions>(
        savedDisplayOptions ? JSON.parse(savedDisplayOptions) : defaultDisplayOptions
    )

    const pointsEnabled = computed(
        () => displayOptions.value.mode === 'points' || displayOptions.value.mode === 'both'
    )

    const linesEnabled = computed(
        () => displayOptions.value.mode === 'lines' || displayOptions.value.mode === 'both'
    )
    return { displayOptions, pointsEnabled, linesEnabled }
})
