export const state = () => ({
  menu: [],
  pages: [],
  categories: [],
  announcers: {
    categories: [],
    posts: [],
  },
  loaders: {
    menu: true,
    page: true,
    announcers: true,
  }
})

export const getters = {
  getMenu: state => state.menu,
  getPages: state => state.pages,
  /**
   * @description Due to WP API we can't access to the category by simply '2019'
   * We have to find the ID first and then return the value.
   */
  getAnnouncerByYearFromVUEX: state => year => {
    const category = state.announcers.categories.find(
      category => category.slug === year.toString()
    ) || false
    const categoryID = category && category.id

    return categoryID && state.announcers.posts.find(
      announcer => announcer['announcers-category'][0] === categoryID
    )
  },
  getPageBySlugFromVUEX: state => slug => state.pages.find(
    page => page.slug === slug
  ) || false,
  isContextLoading: state => context => state.loaders[context],
}

const STATE_HANDLER = ({ state, key, identityToUpdate }) => {
  state[key] = !state[key].length
    ? state[key].concat(identityToUpdate)
    : state[key].map(
      identity => {
        return identity.id === identityToUpdate.id
          ? identityToUpdate : identity
      }
    )
}

export const mutations = {
  SET_MENU: (state, menu) => (state.menu = menu),
  PUSH_A_PAGE: (state, pageToPush) => STATE_HANDLER({state, key: 'pages', identityToUpdate: pageToPush}),
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
  SET_CONTEXT_LOADING: (state, { context, isLoading }) => (state.loaders[context] = isLoading)
}
