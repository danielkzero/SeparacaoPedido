// vue.config.js
module.exports = 
{
  devServer: {
    proxy: {
      '/___pasta/api/v1': {
        target: 'http://191.168.0.12',
        changeOrigin: true,
        pathRewrite: {
          '^/___pasta/api/v1': '/___pasta/api/v1'
        }
      }
    }
  },
  "type": "commonjs",
};