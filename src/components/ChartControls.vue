<script setup lang="ts">
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'

const { displayOptions } = storeToRefs(useDisplayOptionsStore())
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
                class="w-full border md:w-[9.6rem]"
                optionLabel="label"
                option-value="value"
            />
            <label for="yAxis">Y Axis Value</label>
        </div>
        <div v-if="displayOptions.yAxis == 'averageRating'" class="p-float-label">
            <Dropdown
                v-model="displayOptions.yAxisScale"
                inputId="yAxis"
                :options="[
                    { label: 'Fit', value: 'fit' },
                    { label: 'Fixed', value: 'fixed' }
                ]"
                class="w-full border md:w-[9.6rem]"
                optionLabel="label"
                option-value="value"
            />
            <label for="yAxis">Y Axis Scale</label>
        </div>
        <div class="p-float-label">
            <Dropdown
                v-model="displayOptions.mode"
                inputId="yAxis"
                :options="[
                    { label: 'Points and Lines', value: 'both' },
                    { label: 'Points Only', value: 'points' },
                    { label: 'Lines Only', value: 'lines' }
                ]"
                class="w-full border md:w-[9.6rem]"
                optionLabel="label"
                option-value="value"
            />
            <label for="yAxis">Mode</label>
        </div>
    </div>
</template>
