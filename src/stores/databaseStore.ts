import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SeriesDB } from '@/types/database'

export const useDataBaseStore = defineStore('db', () => {
    const db = ref<SeriesDB>(null as unknown as SeriesDB)
    return { db }
})
