export default {
  NETSONS: {
    protocol: 'http',
    host: 'mattiazanella.it',
    basePath: '/develop/wordpress-nuxt',
    path_API: 'develop/wordpress-nuxt/wordpress/wp-json/wp/v2',
    /**
     * @description Thanks to IBM, defining URL structure by envs.
     * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
     */
    getFullPath() {
      const port = this.port ? `:${this.port}` : ''
      return `${ this.protocol }://${ this.host }${ port }/${ this.path_API }`
    },
  },
}
