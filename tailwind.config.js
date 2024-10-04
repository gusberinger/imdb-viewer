/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    plugins: [require('tailwindcss-primeui')],
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx,vue}',
        './components/**/*.{ts,tsx,vue}',
        './app/**/*.{ts,tsx,vue}',
        './src/**/*.{ts,tsx,vue}'
    ],
}
