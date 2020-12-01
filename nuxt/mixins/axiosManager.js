import { ENVs } from '@/constants'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('application', [ 'SET_MENU', 'SET_CATEGORIES_BY']),
    /**
     * @description Shortcut to avoid DRY pattern.
     * @param {String} error What to print in console as error.
     */
    errorHandlerHelper(error) {
      console.error(error)
      this.$router.push({ path: '/error' })
    },
    /**
     * @description This fetch from API the menu voices and sets in VUEX
     * We map the response to avoid 1 call for fetching HOMEPAGE ID
     * but at the same time we filter the menuvoice.
     */
    async AXIOS_getMenuVoices() {
      try {
        const menuVoices = await this.$axios.$get(`${ ENVs.getFullAPIPath() }/menu`)

        this.SET_MENU(menuVoices)
      }
      catch (e) {
        this.errorHandlerHelper(e)
      }
    },
    /**
     * @description WP Rest API - How to get featured image
     * @see https://wordpress.stackexchange.com/a/268706
     * @see https://wordpress.stackexchange.com/a/284302
     * @param {String} entity 'pages' or 'speakers'.
     * @param {String} slug Speaker slug 'dino-lanzaretti' or page slug.
     * @return {Promise<void>}
     */
    async AXIOS_getEntityBySlug({ entity, slug, mutation }) {
      try {
        const entityResponse = await this.$axios.$get(`${ ENVs.getFullAPIPath() }/${entity}?slug=${slug}&_embed`)

        if(!entityResponse[0]) this.errorHandlerHelper(`${entity} not found`)
        else mutation(entityResponse[0])
      }
      catch (e) {
        this.errorHandlerHelper(e)
      }
    },
    /**
     * @see https://developer.wordpress.org/rest-api/reference/categories/#example-request
     * @param {string} taxonomy Like 'announcers-category' or 'speakers-category'
     * @return {Promise<void>}
     */
    async AXIOS_getAllCategoriesByTaxonomy(taxonomy) {
      try {
        const categories = await this.$axios.$get(`${ ENVs.getFullAPIPath() }/${taxonomy}?per_page=30`)
        this.SET_CATEGORIES_BY({ key: taxonomy, categories } )

        return categories
      }
      catch (e) {
        this.errorHandlerHelper(e)
      }
    },
    /**
     * @description Given an entity we first have to fetch for categories of that
     * entity, find the ID of category with same 'year' value; Finally ask for posts with
     * that categoryID and call relative mutation
     * @param {String} entity Entity to look for...like 'speakers', 'announcers'
     * @param {Number} year
     * @param {Function} mutation Reference of VUEX mutation
     */
    async AXIOS_getEntityByYear({ entity, year, mutation }) {
      try {
        const entityCategories = await this.AXIOS_getAllCategoriesByTaxonomy(`${entity}-category`)

        const categoryByYear = entityCategories.find(
          category => category.slug === year.toString()
        ) || false
        const categoryID = categoryByYear && categoryByYear.id

        const entityFilteredByCategoryID = await this.$axios.$get(`${ ENVs.getFullAPIPath() }/${entity}?${entity}-category=${categoryID}&per_page=100`)

        mutation(entityFilteredByCategoryID)
      }
      catch (e) {
        this.errorHandlerHelper(e)
      }
    },
    /**
     * @todo
     * @returns {Promise<void>}
     */
    async AXIOS_getCirclesEvents() {
      try {
        return (await this.$axios.$get(`${ ENVs.getFullAPIPath() }/circle-events`))
      }
      catch (e) {
        this.errorHandlerHelper(e)
      }
    }
  }
}
