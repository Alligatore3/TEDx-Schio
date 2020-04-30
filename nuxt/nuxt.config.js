import { ENVs } from './constants'
import { generateConfig } from "./generate/script";

export default {
  /**
   * @see https://nuxtjs.org/guide/commands/#single-page-application-deployment-spa-
   */
  mode: 'spa',
  /**
   * @description Define the development or production mode of Nuxt.js.
   * @see https://nuxtjs.org/api/configuration-dev
   */
  env: {
    dev: (process.env.NODE_ENV !== 'production'),
  },
  /*
  ** Headers of the page
  */
  head: {
    /**
     * @see https://stackoverflow.com/a/48239378
     */
    htmlAttrs: { lang: 'it' },
    title: ENVs.SEO.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: ENVs.SEO.description },

      { hid: 'og:title', name: 'og:title', content: ENVs.SEO.title },
      { hid: 'og:description', name: 'og:description', content: ENVs.SEO.description },
      { hid: 'og:url', name: 'og:url', content: ENVs.getFullPath() },

      { hid: 'twitter:title', name: 'twitter:title', content: ENVs.SEO.title },
      { hid: 'twitter:description', name: 'twitter:description', content: ENVs.SEO.description },
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
    '@/assets/style/styles.scss',
  ],
  /**
   * @description Share variables, mixins, functions across all style files (no @import needed)
   * @see https://github.com/nuxt-community/style-resources-module#setup
   */
  styleResources: {
    scss: [
      '@/assets/style/base/_vars.scss',
      '@/assets/style/base/_override.scss',
    ],
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
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
   * @see https://nuxtjs.org/api/pages-transition#__layout
   */
  pageTransition: {
    name: 'page'
  },
  /**
   * @description Configure the generation of your universal web application
   * to a static web application.
   * @see https://nuxtjs.org/api/configuration-generate/
   */
  generate: generateConfig(),
  /**
   * @description This can be useful if you need to serve Nuxt as a
   * different context root, from within a bigger Web site.
   * @see https://nuxtjs.org/api/configuration-router/#base
   */
  router: {
    base: process.env.dev ? ENVs.development.basePath : ENVs.production.basePath
  }
}
