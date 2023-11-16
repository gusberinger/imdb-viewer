<script setup lang="ts">
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
const { displayOptions } = storeToRefs(useDisplayOptionsStore())
const t = ref(null)
</script>
<template>
    <div class="flex w-full justify-center py-6">
        <div class="p-float-label">
            <Dropdown
            v-model="displayOptions.yAxis"
                inputId="yAxis"
                :options="[
                    { label: '# of Votes', value: 'numVotes' },
                    { label: 'Rating', value: 'averageRating' }
                ]"
                class="w-full md:w-[9.6rem] border"
                optionLabel="label"
                option-value="value"
            />
            <label for="yAxis">Y Axis Scale</label>
        </div>
    </div>
</template>
