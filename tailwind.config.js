/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        container: {
            // you can configure the container to be centered
            center: true,

            // or have default horizontal padding

            // default breakpoints but with 40px removed
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1230px',
                // "2xl": "1496px",
            },
        },
        extend: {
            colors: {
                'gray-header': '#7a7e7f',
            },
        },
    },
    plugins: [],
};
