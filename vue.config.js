module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/saas/dist'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/style.scss";`,
      },
    },
  },
};
