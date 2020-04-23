export const state = () => ({
  TEDxEdition: 2019,
  menu: [],
  menuMobileOpened: false,
  pages: [],
  partners: {
    categories: [],
    posts: [],
  },
  speakers: {
    categories: [],
    posts: [],
  },
  announcers: {
    categories: [],
    posts: [],
  },
})

/**
 * @description Helper to avoid DRY pattern.
 * @return {Number | Boolean}
 */
const getCategoryIDFromByYear = ({ state, from, year }) => {
  const category = searchFor({ where: state[from].categories, key: 'slug', what: year.toString() })
  return category && category.id
}

/**
 * @description Utility to avoid DRY pattern.
 * @return {Object | Boolean}
 */
const searchFor = ({ where, key, what }) => where.find(
  item => item[key] === what
) || false

export const getters = {
  getMenu: state => state.menu,
  getMenuMobileStatus: state => state.menuMobileOpened,
  getPages: state => state.pages,
  getCurrentEdition: state => state.TEDxEdition,
  getCategoriesBySlugFromVUEX: state => slug => state[slug].categories,
  /**
   * @description Due to WP API we can't access to the category by simply '2019'
   * We have to find the ID first and then return the value.
   */
  getAnnouncerByYearFromVUEX: state => year => {
    const categoryID = getCategoryIDFromByYear({ state, from: 'announcers', year })

    return categoryID && state.announcers.posts.find(
      announcer => announcer['announcers-category'][0] === categoryID
    )
  },
  getEntityByYearFromVUEX: state => ({ entity, year }) => {
    const categoryID = getCategoryIDFromByYear({ state, from: entity, year })

    return categoryID && state[entity].posts.filter(
      speaker => speaker[`${entity}-category`][0] === categoryID
    )
  },
  getPageBySlugFromVUEX: state => slug => searchFor({ where: state.pages, key: 'slug', what: slug }),
  getSpeakerBySlugFromVUEX: state => slug => searchFor({ where: state.speakers.posts, key: 'slug', what: slug }),
}

export const mutations = {
  SET_MENU: (state, menu) => (state.menu = menu),
  SET_MENU_MOBILE_STATUS: (state, status) => (state.menuMobileOpened = status),
  SET_PARTNERS: (state, partners) => (state.partners.posts = partners),
  SET_SPEAKERS: (state, speakers) => (state.speakers.posts = speakers),
  PUSH_A_PAGE: (state, pageToPush) => (state.pages = state.pages.concat(pageToPush)),
  PUSH_A_SPEAKER: (state, speakerToPush) => (state.speakers.posts = state.speakers.posts.concat(speakerToPush)),
  /**
   * @todo
   * @description It's not clear but due to WP API category slug
   * like 'announcers-category' or 'speakers-category' we
   * have to split the string. Not good.
   */
  SET_CATEGORIES_BY: (state, { key, categories }) => {
    const splittedCategory = key.split('-')[0]
    state[splittedCategory].categories = categories
  },
  PUSH_AN_ANNOUNCER: (state, announcerToPush) => {
    state.announcers.posts = !state.announcers.posts.length
      ? state.announcers.posts.concat(announcerToPush)
      : state.announcers.posts.map(
        identity => {
          return identity.id === announcerToPush.id
            ? announcerToPush : identity
        }
      )
  },
}
