/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                secondary: '#10B981',
                accent: '#F59E0B',
                'bg-light': '#F3F4F6',
                'bg-dark': '#111827',
                'text-light': '#1F2937',
                'text-dark': '#F9FAFB',
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}
