<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import { onMounted, ref, watch } from 'vue'
import MiniSearch from 'minisearch'

type Series = { tconst: string; title: string; startYear: string; endYear: string }

const value = ref<string | Series>('')
const suggestions = ref<Series[]>([])

const miniSearchObj = ref<null | MiniSearch>(null)

const search = (e: { query: string }) => {
    if (miniSearchObj.value === null) return
    const results = miniSearchObj.value.search(e.query, { prefix: true, fuzzy: 0.2 })
    console.log(results)
    suggestions.value = results.slice(0, 10).map((result) => ({
        tconst: result.tconst,
        title: result.title,
        startYear: result.startYear,
        endYear: result.endYear,
        display: `${result.title} (${result.startYear}-${result.endYear})`
    }))
}

onMounted(async () => {
    const res = await fetch('/search.json')
    const json = await res.json()
    const mini = new MiniSearch({
        idField: 'tconst',
        fields: ['title'],
        storeFields: ['tconst', 'title', 'startYear', 'endYear']
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
            class="rounded-2xl border-2 px-1 py-2"
            v-if="miniSearchObj !== null"
            v-model="value"
            placeholder="Search Title"
            :suggestions="suggestions"
            option-label="display"
            @complete="search"
        />
    </div>
</template>
