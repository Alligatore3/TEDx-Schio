export const state = () => ({
  menu: [],
  pages: [],
  posts: []
})

export const getters = {
  getMenu: state => state.menu,
  getPages: state => state.pages,
  getPosts: state => state.posts,
}

export const mutations = {
  SET_MENU: (state, menu) => (state.menu = menu),
  SET_PAGES: (state, pages) => (state.pages = pages),
  SET_POSTS: (state, posts) => (state.posts = posts),
}
