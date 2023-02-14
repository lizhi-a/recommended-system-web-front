/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ant-text-secondary': '#00000073',
        'ant-success': '#52c41a',
        'ant-success-color-hover': '#73d13d',
        'ant-success-color-active': '#389e0d',
        'ant-success-color-outline': 'rgba(82, 196, 26, .2)',
        'ant-error-color': '#ff4d4f',
        'ant-error-color-hover': '#ff7875',
        'ant-error-color-active': '#d9363e',
        'ant-error-color-outline': 'rgba(255, 77, 79, .2)',
        'ant-warning-color': '#faad14',
        'ant-warning-color-hover': '#ffc53d',
        'ant-warning-color-active': '#d48806',
        'ant-warning-color-outline': 'rgba(250, 173, 20, .2)',
        'ant-info-color': '#1677ff',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}