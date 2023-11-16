<script setup lang="ts">
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue';
const { displayOptions } = storeToRefs(useDisplayOptionsStore())
const t = ref(null)
</script>
<template>
    <div class="bg-gray-300 w-full py-5 flex justify-center">
        <Dropdown
            v-model="displayOptions.yAxis"
            :options="[
                { label: '# of Votes', value: 'numVotes' },
                { label: 'Rating', value: 'averageRating' }
            ]"
            class="w-full md:w-[8.4rem]" 
            optionLabel="label"
            option-value="value"
        />
    </div>
</template>
