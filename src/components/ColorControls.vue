<script lang="ts" setup>
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore';
import { storeToRefs } from 'pinia';
import ColorPicker from 'primevue/colorpicker';
const { displayOptions } = storeToRefs(useDisplayOptionsStore())
</script>
<template>
    <div class="py-1">
        <label for="">Season Color Palette</label>
        <div class="flex gap-x-1" >
            <ColorPicker v-for="(color, idx) in displayOptions.colors" :key="idx" v-model="displayOptions.colors[idx]" />
        </div>
    </div>
</template>