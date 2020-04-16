const ENVs = {
  NETSONS: {
    protocol: 'http',
    host: 'develop.tedxschio.com',
    basePath: '/',
    path_API: 'wordpress/wp-json/wp/v2',
    SEO: {
      title: 'TEDx Schio',
      description: 'Schio rappresenta da sempre un centro industriale e culturale di notevole spessore e occupa una posizione di forte rilievo all’interno del contesto sociale del territorio.'
    },
    /**
     * @description Thanks to IBM, defining URL structure by envs.
     * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
     */
    getFullPath() {
      const port = this.port ? `:${this.port}` : ''
      return `${ this.protocol }://${ this.host }${ port }`
    },
    /**
     * @description Thanks to IBM, defining URL structure by envs.
     * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
     */
    getFullAPIPath() {
      const port = this.port ? `:${this.port}` : ''
      return `${ this.protocol }://${ this.host }${ port }/${ this.path_API }`
    },
  },
  MAMP: {
    protocol: 'http',
    host: 'localhost',
    port: 8888,
    basePath: 'TEDx-Schio',
    path_API: 'wordpress/wp-json/wp/v2',
    SEO: {
      title: 'TEDx Schio',
      description: 'Schio rappresenta da sempre un centro industriale e culturale di notevole spessore e occupa una posizione di forte rilievo all’interno del contesto sociale del territorio.'
    },
    /**
     * @description Thanks to IBM, defining URL structure by envs.
     * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
     */
    getFullPath() {
      const port = this.port ? `:${this.port}` : ''
      return `${ this.protocol }://${ this.host }${ port }/${this.basePath}`
    },
    /**
     * @description Thanks to IBM, defining URL structure by envs.
     * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
     */
    getFullAPIPath() {
      const port = this.port ? `:${this.port}` : ''
      return `${ this.protocol }://${ this.host }${ port }/${this.basePath}/${ this.path_API }`
    },
  },
}

const EMPTY_VALUE = '--'
export { ENVs, EMPTY_VALUE }
