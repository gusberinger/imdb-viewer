import { defineStore } from "pinia";
import { ref } from "vue";

type DisplayOptions = {
    yAxis: 'averageRating' | 'numVotes'
    yAxisScale: 'fit' | 'fixed'
    lineEnabled: boolean
    pointsEnabled: boolean
    colorEnabled: boolean
    showSeasonConnectionSegments?: boolean
}

export const useDisplayOptionsStore = defineStore('displayOptions', () => {
    const displayOptions = ref<DisplayOptions>({
        yAxis: 'averageRating',
        yAxisScale: 'fixed',
        lineEnabled: true,
        pointsEnabled: true,
        colorEnabled: true,
        showSeasonConnectionSegments: false
    })
    return { displayOptions }
})