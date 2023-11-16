import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { SeriesDB } from '@/types/database'
import { useDisplayOptionsStore } from './displayOptionsStore'

export const useDataBaseStore = defineStore('db', () => {
    const { displayOptions } = storeToRefs(useDisplayOptionsStore())
    const db = ref<SeriesDB>(null as unknown as SeriesDB)

    const episodes = computed(() => {
        return db.value.episodes.filter((episode) => {
            if (displayOptions.value.hidePilots && episode.episodeNumber === 0) {
                return false
            }
            if (displayOptions.value.hideUnrated && episode.averageRating == null) {
                return false
            }
            return true
        })
        // if (displayOptions.value.hidePilots)
    })

    return { db, episodes }
})
