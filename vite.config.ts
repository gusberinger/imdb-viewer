import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['chart.js', 'vue-chartjs']
                }
            }
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/primevue/resources/themes/lara-light-teal/',
                    dest: 'themes/'
                },
                {
                  src: 'node_modules/primevue/resources/themes/lara-dark-teal/',
                  dest: 'themes/'
              },
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
