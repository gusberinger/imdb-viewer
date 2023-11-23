<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import { onMounted, ref, watch } from 'vue'
import MiniSearch from 'minisearch'

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
    console.log(results)
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

watch(value, (val) => {
    if (typeof val !== 'string' && val !== null) {
        window.location.href = `/series/${val.tconst}`
    }
})
</script>
<template>
    <div>
        <AutoComplete
            v-if="miniSearchObj !== null"
            v-model="value"
            placeholder="Search Title"
            :suggestions="suggestions"
            option-label="display"
            @complete="search"
        >
            <template #option="option">
              <p>
                <span>{{ option.option.primaryTitle }}</span>
                <span class="text-gray-400" v-if="option.option.originalTitle">{{ ' (' + option.option.originalTitle }})</span>
              </p>
            </template>
        </AutoComplete>
    </div>
</template>
<style>
div.p-autocomplete input.p-inputtext {
    @apply rounded-2xl border-2 px-2 py-2;
}
</style>
