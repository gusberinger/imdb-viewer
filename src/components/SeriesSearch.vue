<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import { isTemplateExpression } from 'typescript';
import { onMounted, ref, watch } from 'vue'

const value = ref('')
const suggestions = ref([])
const db = ref<null | { tconst: string; title: string }[]>(null)


const search = (e: { query: string }) => {
    const results = db.value
        ?.filter((item) => {
            return item.title.toLowerCase().startsWith(e.query.toLowerCase())
        })
        .map((item) => ({...item, display: `${item.title} (${item.startYear}–${item.endYear.replace("\\N", "")})`}))
        .slice(0, 10)
    console.log(results)
    suggestions.value = results || []
}

onMounted(async () => {
    const res = await fetch('/search.json')
    db.value = await res.json()
})

watch(value, (val) => {
    if (val.tconst) {
        window.location.href = `/series/${val.tconst}`
    }
})
</script>
<template>
    <div>
        <AutoComplete
            class="rounded-2xl border-2 px-1 py-2"
            v-if="db !== null"
            v-model="value"
            placeholder="Search Title"
            :suggestions="suggestions"
            option-label="display"
            @complete="search"
        />
    </div>
</template>
