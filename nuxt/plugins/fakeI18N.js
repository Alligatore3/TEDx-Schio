// @see https://nuxtjs.org/docs/2.x/directory-structure/plugins#inject-in-root--context
export default (context, inject) => {
  inject('fakeI18N', acfKey => {
    switch (acfKey) {
      case 'when':
        return 'Quando?'

      case 'where':
        return 'Dove?'

      case 'how':
        return 'Come?'

      default:
        console.warn('Missing i18n, LOL')
        return acfKey
    }
  })
}
