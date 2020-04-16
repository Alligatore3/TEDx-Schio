import ENVs from './constants'

export default {
  /**
   * @see https://nuxtjs.org/guide/commands/#single-page-application-deployment-spa-
   */
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: ENVs.NETSONS.SEO.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: ENVs.NETSONS.SEO.description },

      { hid: 'og:title', name: 'og:title', content: ENVs.NETSONS.SEO.title },
      { hid: 'og:description', name: 'og:description', content: ENVs.NETSONS.SEO.description },
      { hid: 'og:url', name: 'og:url', content: ENVs.NETSONS.getFullPath() },

      { hid: 'twitter:title', name: 'twitter:title', content: ENVs.NETSONS.SEO.title },
      { hid: 'twitter:description', name: 'twitter:description', content: ENVs.NETSONS.SEO.description },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
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
    dir: 'tedx-dist',
    devtools: false
  },
  /**
   * @description Define the dist directory for your Nuxt.js application
   * @see https://nuxtjs.org/api/configuration-builddir/
   */
  buildDir: 'tedx-dist',
  /**
   * @description This can be useful if you need to serve Nuxt as a
   * different context root, from within a bigger Web site.
   * @see https://nuxtjs.org/api/configuration-router/#base
   */
  router: {
    base: ENVs.NETSONS.basePath
  }
}
