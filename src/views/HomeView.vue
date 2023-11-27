<script setup lang="ts">
import SeriesSearch from '@/components/SeriesSearch.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import GithubCallToAction from '@/components/GithubCallToAction.vue'
import trending from '@/assets/trending.json'
import { shuffle } from '@/utils/random.ts'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const trendingRandom = computed(() => {
    const date = new Date()
    const dateSeeed = date.getDate() + date.getMonth() * 100 + date.getFullYear() * 1000
    const shuffled = shuffle(trending, dateSeeed)
    if (breakpoints.xl.value) {
        return shuffled.slice(0, 12)
    }
    if (breakpoints.md.value) {
        return shuffled.slice(0, 8)
    }
    return shuffled.slice(0, 4)
})
</script>

<template>
    <main class="flex min-h-screen flex-col items-center gap-3">
        <github-call-to-action />
        <section class="mx-2 mt-5 py-10">
            <div class="flex items-center justify-between">
                <h2
                    class="py-2 text-2xl font-semibold text-gray-700 dark:text-gray-300 md:text-4xl"
                >
                    TRENDING TV SHOWS
                </h2>

                <theme-switcher class="" />
            </div>
            <div
                aria-label="Trending TV Show Selector"
                class="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6"
            >
                <a
                    v-for="series in trendingRandom"
                    class="shadow-sm hover:shadow-xl"
                    :key="series.tconst"
                    :href="`/series/${series.tconst}`"
                >
                    <img
                        class="h-60 w-40 object-cover"
                        :src="series.poster_path"
                        :alt="series.name + ' Poster'"
                    />
                </a>
            </div>
        </section>
        <section aria-label="TV Search Box">
            <h1 class="mb-2 text-center text-2xl">IMDb Charts</h1>
            <series-search />
        </section>
        <footer class="mt-10 py-6 text-sm text-gray-500">
            © {{ new Date().getFullYear() }} Gus Beringer. Information courtesy of
            <a href="https://www.imdb.com">IMDb</a>, used with permission.
        </footer>
    </main>
</template>
