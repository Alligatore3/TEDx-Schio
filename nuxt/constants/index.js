const ENVs = {
  SEO: {
    title: 'TEDx Schio',
    description: 'Schio rappresenta da sempre un centro industriale e culturale di notevole spessore e occupa una posizione di forte rilievo all’interno del contesto sociale del territorio.'
  },
  development: {
    protocol: 'http',
    host: 'localhost',
    port: 8888,
    basePath: '/TEDx-Schio',
    path_API: 'wordpress/wp-json/wp/v2',
  },
  production: {
    protocol: 'http',
    host: 'develop.tedxschio.com',
    port: false,
    basePath: '/',
    path_API: 'wordpress/wp-json/wp/v2',
  },
  /**
   * @description Thanks to IBM, defining URL structure by envs.
   * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
   */
  getFullPath() {
    const base = process.env.dev ? this.development : this.production

    const port = base.port ? `:${base.port}` : ''
    return `${ base.protocol }://${ base.host }${ port }`
  },
  /**
   * @description Thanks to IBM, defining URL structure by envs.
   * @see https://www.ibm.com/support/knowledgecenter/SSGMCP_5.2.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html
   */
  getFullAPIPath(forceToLocal) {
    const base = forceToLocal && this.development || (process.env.dev ? this.development : this.production)
    const port = base.port ? `:${base.port}` : ''

    return `${ base.protocol }://${ base.host }${ port }${base.basePath}/${ base.path_API }`
  },
}

const EMPTY_VALUE = '--'

export { ENVs, EMPTY_VALUE }
