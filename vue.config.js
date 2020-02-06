module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/styles/global.scss";
          @import "./node_modules/bootstrap/scss/bootstrap-grid.scss";
        `
      }
    }
  }
};