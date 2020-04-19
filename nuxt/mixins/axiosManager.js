import { ENVs } from '@/constants'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('application', [
      'SET_MENU',
      'SET_CATEGORIES_BY',
      'SET_CONTEXT_LOADING'
    ]),
    /**
     * @description This fetch from API the menu voices and sets in VUEX
     * We map the response to avoid 1 call for fetching HOMEPAGE ID
     * but at the same time we filter the menuvoice.
     */
    async AXIOS_getMenuVoices() {
      this.SET_CONTEXT_LOADING({ context: 'menu', isLoading: true })
      const menuVoices = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/menu`)

      this.SET_MENU(menuVoices)
      this.SET_CONTEXT_LOADING({ context: 'menu', isLoading: false })
    },
    /**
     * @see https://wordpress.stackexchange.com/a/284302
     * @param {String} entity 'pages' or 'speakers'.
     * @param {String} slug Speaker slug 'dino-lanzaretti' or page slug.
     * @return {Promise<void>}
     */
    async AXIOS_getEntityBySlug({ entity, slug, mutation }) {
      this.SET_CONTEXT_LOADING({ context: entity, isLoading: true })
      const entityResponse = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/${entity}?slug=${slug}`)

      if(!entityResponse[0]) {
        throw new Error(`${entity} not found`)
      } else {
        mutation(entityResponse[0])
      }
      this.SET_CONTEXT_LOADING({ context: entity, isLoading: false })
    },
    /**
     * @see https://developer.wordpress.org/rest-api/reference/categories/#example-request
     * @param {string} taxonomy Like 'announcers-category' or 'speakers-category'
     * @return {Promise<void>}
     */
    async AXIOS_getAllCategoriesByTaxonomy(taxonomy) {
      const categories = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/${taxonomy}?per_page=30`)
      this.SET_CATEGORIES_BY({ key: taxonomy, categories } )
      return categories
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
      this.SET_CONTEXT_LOADING({ context: entity, isLoading: true })
      const entityCategories = await this.AXIOS_getAllCategoriesByTaxonomy(`${entity}-category`)

      const categoryByYear = entityCategories.find(
        category => category.slug === year.toString()
      ) || false
      const categoryID = categoryByYear && categoryByYear.id

      const entityFilteredByCategoryID = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/${entity}?${entity}-category=${categoryID}&per_page=100`)

      mutation(entityFilteredByCategoryID)
      this.SET_CONTEXT_LOADING({ context: entity, isLoading: false })
    },
  }
}
