import { ENVs } from '@/constants'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('application', [
      'SET_MENU',
      'PUSH_A_PAGE',
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
     * @param {String} slug
     * @return {Promise<void>}
     */
    async AXIOS_getPageBySlug(slug) {
      this.SET_CONTEXT_LOADING({ context: 'page', isLoading: true })
      const page = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/pages?slug=${slug}`)

      this.PUSH_A_PAGE(page[0])
      this.SET_CONTEXT_LOADING({ context: 'page', isLoading: false })
    },
    /**
     * @see https://developer.wordpress.org/rest-api/reference/categories/#example-request
     * @param {string} taxonomy Like 'announcers-category' or 'speakers-category'
     * @return {Promise<void>}
     */
    async AXIOS_getAllCategoriesByTaxonomy(taxonomy) {
      const categories = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/${taxonomy}`)
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

      const entityFilteredByCategoryID = await this.$axios.$get(`${ ENVs.MAMP.getFullAPIPath() }/${entity}?${entity}-category=${categoryID}`)

      mutation(entityFilteredByCategoryID)
      this.SET_CONTEXT_LOADING({ context: entity, isLoading: false })
    },
  }
}
