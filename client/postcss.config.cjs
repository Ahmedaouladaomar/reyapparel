module.exports = {
  plugins: {
    'autoprefixer': {},
    'tailwindcss': {},
    'postcss-preset-mantine': {},
    'postcss-nesting': {},
    'postcss-simple-vars': {
      variables: {
        'xs': '350px',
        'sm': '450px',
        'mobile': '640px',
        'laptop': '850px',
        'desktop': '1250px',
      },
    },
  },
};