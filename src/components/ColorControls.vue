<script lang="ts" setup>
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import ColorPicker from 'primevue/colorpicker'
import { PlusIcon } from '@heroicons/vue/24/outline'
const { displayOptions } = storeToRefs(useDisplayOptionsStore())

const addColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    displayOptions.value.colors.push(randomColor)
}

const removeColor = (idx: number) => {
    displayOptions.value.colors.splice(idx, 1)
}
</script>
<template>
    <div class="py-1">
        <label for="">Season Color Palette</label>
        <div class="flex gap-x-1">
            <ColorPicker
                v-for="(_color, idx) in displayOptions.colors"
                :key="idx"
                class="first:order-1"
                v-model="displayOptions.colors[idx]"
                @click.shift="removeColor(idx)"
            />
            <button
                class="group order-2 flex h-[32px] w-[32px] items-center justify-center rounded-[6px] border-2 border-stone-400 transition-colors"
                @click="addColor"
            >
                <PlusIcon class="h-5 w-5 fill-stone-800" />
            </button>
        </div>
    </div>
</template>
