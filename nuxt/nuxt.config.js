import ENVs from './constants'

export default {
  mode: 'spa',
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
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
  ],
  /**
   * @see https://axios.nuxtjs.org/setup.html#install
   * @see https://axios.nuxtjs.org/options.html#options
   */
  axios: {
    https: false,
    proxy: false,
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /**
   * @description Configure the generation of your universal web application
   * to a static web application.
   * @see https://nuxtjs.org/api/configuration-generate/
   */
  generate: {
  },
  /**
   * @description This can be useful if you need to serve Nuxt as a
   * different context root, from within a bigger Web site.
   * @see https://nuxtjs.org/api/configuration-router/#base
   */
  router: {
    base: ENVs.NETSONS.basePath
  }
}
