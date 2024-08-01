<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

const lastUpdated = ref('')

onMounted(async () => {
    const response = axios.get(`/timestamp.txt`, {})
    const date = new Date((await response).data * 1000)
    lastUpdated.value = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
})
</script>
<template>
    <footer class="mt-10 py-6 text-sm text-gray-500">
        <div>
            © {{ new Date().getFullYear() }} Gus Beringer. Information courtesy of
            <a href="https://www.imdb.com">IMDb</a>, used with permission.
        </div>
        <div class="flex justify-between text-gray-600 mt-1">
            <div></div>
            <div class="text-right" v-if="lastUpdated">
                Last Updated {{ lastUpdated }}.
            </div>
        </div>
    </footer>
</template>
