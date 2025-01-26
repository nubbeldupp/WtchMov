module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'note-yellow': '#fff9c4',
        'note-blue': '#bbdefb',
        'note-green': '#c8e6c9',
        'note-pink': '#f8bbd0',
      },
      boxShadow: {
        'note': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
