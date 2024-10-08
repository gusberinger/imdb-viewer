<script setup lang="ts">
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import Select from 'primevue/select';
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { CogIcon } from '@heroicons/vue/24/outline'
import FloatLabel from 'primevue/floatlabel';
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import ColorControls from './ColorControls.vue'

const showDialog = ref(false)

const { displayOptions } = storeToRefs(useDisplayOptionsStore())
</script>
<template>
    <InputGroup class="flex max-w-3xl justify-center py-6">
        <div>
            <FloatLabel>

                <Select
                v-model="displayOptions.yAxis"
                inputId="yAxis"
                :options="[
                    { label: '# of Votes', value: 'numVotes' },
                    { label: 'Rating', value: 'averageRating' }
                ]"
                class="w-full border md:w-[9.6rem"
                option-value="value"
                optionLabel="label"
                />
                <label for="yAxis">Y Axis Value</label>
            </FloatLabel>
            </div>
        <div v-if="displayOptions.yAxis == 'averageRating'">
            <FloatLabel>
                <Select
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
            </FloatLabel>
        </div>
        <div>
            <FloatLabel>
                <Select
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
            </FloatLabel>
        </div>
        <InputGroupAddon
            @click="showDialog = true"
            class="transition-all hover:cursor-pointer hover:brightness-[.98]"
        >
            <CogIcon class="text-gray-500 hover:saturate-50" />
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
                    v-model="displayOptions.autoSwitchMode"
                    class="border-2"
                    id="autoSwitchMode"
                    :binary="true"
                />
                <label for="autoSwitchMode">Auto Switch Mode (+300 Episodes)</label>
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
            <div class="flex gap-x-4">
                <input
                    type="checkbox"
                    v-model="displayOptions.shiftClickToOpenInNewTab"
                    class="border-2"
                    id="shiftClickToOpenInNewTab"
                    :binary="true"
                />
                <label for="shiftClickToOpenInNewTab">Shift Click To Open Tab</label>
            </div>
            <ColorControls />
        </div>
    </Dialog>
</template>
