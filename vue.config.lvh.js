module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  // LINT
  // chainWebpack: (config) => {
  //   config.module.rule('eslint').use('eslint-loader').options({
  //     fix: true
  //   });
  // },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/style.scss";`,
      },
    },
  },
  devServer: {
    open: false,
    host: 'lvh.me',
    port: 20080,
    // https: true,
    // hotOnly: false,
  },
};
