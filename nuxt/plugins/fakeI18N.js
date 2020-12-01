import Vue from 'vue'

Vue.filter('fakeI18N', acfKey => {
  switch (acfKey) {
    case 'when':
      return 'Quando ?'

    case 'where':
      return 'Dove ?'

    case 'how':
      return 'Come ?'

    default:
      console.warn('Missing i18n, LOL')
      return acfKey
  }
})
