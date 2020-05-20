
module.exports = {
  mode: 'universal',
  // router配置
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/foo',
        component: resolve(__dirname, 'pages/othername.vue')
      })
    },
    // middleware: ['auth']
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/api-inject',
    '@/plugins/interceptor'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    "cookie-universal-nuxt"
  ],
  axios: {
    proxy: true
  },
  proxy: { // 首屏渲染无需代理，除首屏外的页面需要代理
    "/api": "http://localhost:8000"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
