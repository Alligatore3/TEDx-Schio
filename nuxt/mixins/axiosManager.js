import { ENVs } from '@/constants'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('application', ['SET_MENU', 'PUSH_A_PAGE', 'SET_CONTEXT_LOADING']),
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
  }
}
