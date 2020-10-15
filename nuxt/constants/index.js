const EMPTY_VALUE = '--'

const ENVs = {
  SEO: {
    title: 'TEDx Schio',
    description: 'Schio rappresenta da sempre un centro industriale e culturale di notevole spessore e occupa una posizione di forte rilievo all’interno del contesto sociale del territorio.'
  },
  isDevelopment: false,
  production: {
    protocol: 'https',
    host: 'tedxschio.com',
    port: false,
    basePath: '/',
    path_API: 'wordpress/wp-json/wp/v2',
  },
  /**
   * @description Thanks to IBM, defining URL structure by envs.
   * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
   */
  getFullBasePath() {
    const host = this.isDevelopment ? `develop.${this.production.host}` : this.production.host
    const port = this.production.port ? `:${this.production.port}` : ''

    return `${ this.production.protocol }://${ host }${ port }`
  },
  getFullAPIPath() {
    return `${ this.getFullBasePath() }${ this.production.basePath }/${ this.production.path_API }`
  }
}

export { ENVs, EMPTY_VALUE }
