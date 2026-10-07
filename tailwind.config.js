/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'brand-blue': '#38bdf8',
                'brand-red': '#FF5A5F',
                'brand-red-hover': '#e0484d',
                'brand-gray': '#f4f4f4',
                'card-border': '#FF5733',
                'card-text': '#FF5733',
            },
            borderRadius: {
                'custom': '1rem',
            }
        },
    },
    plugins: [],
}