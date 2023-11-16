<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
import { onMounted, ref, watch } from 'vue';

const value = ref('')
const suggestions = ref([])
const db = ref<null | {tconst: string, title: string }[]>(null)
const search = (e: { query: string }) => {
  const results = db.value?.filter((item) => {
    return item.title.toLowerCase().startsWith(e.query.toLowerCase())
  }).slice(0, 10)
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
    <AutoComplete class="border-2 rounded-2xl px-1 py-2 " v-if="db !== null" v-model="value" placeholder="Search Title" :suggestions="suggestions" option-label="title" @complete="search" />
</div>
</template>