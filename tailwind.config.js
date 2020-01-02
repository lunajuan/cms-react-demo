const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          '050': '#F5F7FA',
          '100': '#E4E7EB',
          '200': '#CBD2D9',
          '300': '#9AA5B1',
          '400': '#7B8794',
          '500': '#616E7C',
          '600': '#52606D',
          '700': '#3E4C59',
          '800': '#323F4B',
          '900': '#1F2933',
        },
        teal: {
          '050': '#EFFCF6',
          '100': '#C6F7E2',
          '200': '#8EEDC7',
          '300': '#65D6AD',
          '400': '#3EBD93',
          '500': '#27AB83',
          '600': '#199473',
          '700': '#147D64',
          '800': '#0C6B58',
          '900': '#014D40',
        },
      },
      fontFamily: {
        display: ['Barlow', ...fontFamily.sans],
      },
    },
  },
};
