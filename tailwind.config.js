module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ['hover'],
      cursor: ['hover'],
      scale: ['group-hover', 'hover'],
      height: ['hover']
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
