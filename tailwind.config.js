/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sora: ["Sora", "sans-serif"],
                workSans: ["Work Sans", "sans-serif"],
            },
            colors: {
                primary: "#120B48",
                primaryLight: "#413C6D",
            },
        },
    },
    plugins: [],
};
