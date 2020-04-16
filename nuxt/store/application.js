export const state = () => ({
  menu: [],
  pages: [],
  loaders: { menu: true, page: true }
})

export const getters = {
  getMenu: state => state.menu,
  getPages: state => state.pages,
  getPageBySlugFromVUEX: state => slug => state.pages.find(
    page => page.slug === slug
  ) || false,
  isContextLoading: state => context => state.loaders[context],
}

export const mutations = {
  SET_MENU: (state, menu) => (state.menu = menu),
  PUSH_A_PAGE: (state, pageToPush) => {
    state.pages = !state.pages.length
      ? [ pageToPush ]
      : state.pages.map(
        page => {
          return page.id === pageToPush.id
            ? pageToPush : page
        }
      )
  },
  SET_CONTEXT_LOADING: (state, { context, isLoading }) => (state.loaders[context] = isLoading)
}
