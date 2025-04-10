const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    postcss: {
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-normalize'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009'
          },
          stage: 3
        }),
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
}; 