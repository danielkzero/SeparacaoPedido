// vue.config.js
module.exports = 
{
  devServer: {
    proxy: {
      '/api': {
        target: 'http://191.168.0.12/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  "type": "commonjs",
};