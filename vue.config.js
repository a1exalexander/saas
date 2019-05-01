module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/saas'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/style.scss";`,
      },
    },
  },
};

