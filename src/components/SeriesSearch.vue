<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import { onMounted, ref } from 'vue'
import MiniSearch from 'minisearch'
import { RouterLink } from 'vue-router'

type Series = {
    tconst: string
    primaryTitle: string
    originalTitle: string | null
    startYear: string
    endYear: string
}

const value = ref<string | Series>('')
const suggestions = ref<Series[]>([])

const miniSearchObj = ref<null | MiniSearch>(null)

const search = (e: { query: string }) => {
    if (miniSearchObj.value === null) return
    const results = miniSearchObj.value.search(e.query, { prefix: true, fuzzy: 0.2 })
    suggestions.value = results.slice(0, 10).map((result) => {
        const date = `${result.startYear}–${result.endYear ? result.endYear : ''}`
        return {
            tconst: result.tconst,
            primaryTitle: result.primaryTitle,
            originalTitle: result.originalTitle,
            startYear: result.startYear,
            endYear: result.endYear,
            display: `${result.primaryTitle} <i>${result.originalTitle}</i> ${date}`
        }
    })
}

onMounted(async () => {
    const res = await fetch('/search.json')
    const json = await res.json()
    const mini = new MiniSearch({
        idField: 'tconst',
        fields: ['primaryTitle', 'originalTitle'],
        storeFields: ['tconst', 'primaryTitle', 'originalTitle', 'startYear', 'endYear'],
        searchOptions: { boost: { primaryTitle: 2, originalTitle: 1 } }
    })
    mini.addAll(json)
    miniSearchObj.value = mini
})

</script>
<template>
    <div>
        <AutoComplete
            v-if="miniSearchObj === null"
            class="series-search"
            placeholder="Search Title"
        />
        <AutoComplete
            v-else
            v-model="value"
            class="series-search"
            placeholder="Search Title"
            :suggestions="suggestions"
            option-label="display"
            @complete="search"
        >
            <template #option="option">
                <RouterLink :to="`/series/${option.option.tconst}`">
                    <p>
                        <span>{{ option.option.primaryTitle }}</span>
                        <span
                            v-if="option.option.startYear != option.option.endYear"
                            class="text-teal-300 dark:text-teal-600"
                            >{{ ' (' + option.option.startYear }}–{{
                                option.option.endYear ? option.option.endYear : ''
                            }})</span
                        >
                        <span v-else class="text-teal-300 dark:text-teal-600"
                            >{{ ' (' + option.option.startYear }})</span
                        >
                    </p>
                </RouterLink>
            </template>
        </AutoComplete>
    </div>
</template>
