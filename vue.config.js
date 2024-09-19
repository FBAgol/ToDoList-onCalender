const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// mit dem unteren Codes bekommen wir kein Problem mit Cros-Fehler
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        ws: false,
        changeOrigin: true
      },
    }
  }
}