<script setup lang="ts">
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Checkbox from 'primevue/checkbox'
import { CogIcon } from '@heroicons/vue/24/outline'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

const showDialog = ref(false)

const { displayOptions } = storeToRefs(useDisplayOptionsStore())
</script>
<template>
    <InputGroup class="flex max-w-3xl justify-center py-6">
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
                v-model="displayOptions.yAxisRange"
                inputId="yAxis"
                :options="[
                    { label: 'Fit', value: 'fit' },
                    { label: 'Fixed', value: 'fixed' }
                ]"
                class="w-full border md:w-[9.6rem]"
                optionLabel="label"
                option-value="value"
            />
            <label for="yAxis">Y Axis Range</label>
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
        <InputGroupAddon>
            <CogIcon
                @click="showDialog = true"
                class="text-gray-500 hover:cursor-pointer hover:saturate-50"
            />
        </InputGroupAddon>
    </InputGroup>
    <Dialog
        v-model:visible="showDialog"
        :dismissableMask="true"
        class="mb-[30rem]"
        :draggable="false"
        :closable="false"
        header="Display Options"
        :modal="true"
        :baseZIndex="10000"
    >
        <div class="flex flex-col">
            <div class="flex gap-x-4">
                <input
                    type="checkbox"
                    v-model="displayOptions.hideSeasonConnectionSegments"
                    class="border-2"
                    id="hideSeasonConnectionSegments"
                    :binary="true"
                />
                <label for="hideSeasonConnectionSegments">Hide line between seasons </label>
            </div>
            <div class="flex gap-x-4">
                <input
                type="checkbox"
                v-model="displayOptions.hidePilots"
                class="border-2"
                id="hidePilots"
                :binary="true"
                />
                <label for="hidePilots">Hide pilots</label>
            </div>
            <div class="flex gap-x-4">
                <input
                type="checkbox"
                v-model="displayOptions.hideUnrated"
                class="border-2"
                id="hideUnrated"
                :binary="true"
                />
                <label for="hideUnrated">Hide unrated episodes</label>
            </div>
            <div class="flex gap-x-4">
                <input
                    type="checkbox"
                    v-model="displayOptions.tooltipDisabled"
                    class="border-2"
                    id="tooltipDisabled"
                    :binary="true"
                />
                <label for="tooltipDisabled">Disable tooltip</label>
            </div>
        </div>
    </Dialog>
</template>
