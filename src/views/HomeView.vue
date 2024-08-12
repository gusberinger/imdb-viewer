<script setup lang="ts">
import SeriesSearch from '@/components/SeriesSearch.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import GithubCallToAction from '@/components/GithubCallToAction.vue'
import trending from '@/assets/trending.json'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const trendingRandom = computed(() => {
    if (breakpoints.xl.value) {
        return trending.slice(0, 12)
    }
    if (breakpoints.md.value) {
        return trending.slice(0, 8)
    }
    return trending.slice(0, 4)
})
</script>

<template>
    <main class="flex min-h-screen flex-col items-center gap-3">
        <github-call-to-action />
        <section class="mx-2 mt-5 py-10">
            <div class="flex items-center justify-between">
                <h2
                    class="py-2 text-2xl font-semibold text-gray-700 dark:text-gray-200 md:text-4xl"
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
                    class="border-transparent border-4 transition-colors duration-75 ease-in-out hover:dark:border-green-400 hover:border-amber-500"
                    :key="series.tconst"
                    :href="`/series/${series.tconst}`"
                >
                    <img
                        class="h-60 w-40 object-cover"
                        width="160"
                        height="240"
                        fetchpriority="high"
                        :src="series.poster_path"
                        :alt="series.name + ' Poster'"
                    />
                </a>
            </div>
        </section>
        <section aria-label="TV Search Box">
            <h1 class="mb-2 text-center dark:text-slate-100 text-2xl">IMDb Charts</h1>
            <series-search />
        </section>
        <SiteFooter />
    </main>
</template>
