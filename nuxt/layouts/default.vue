<template>
  <div>
    <TEDHeader />
    <nuxt v-if="getMenu.length" />
    <TEDFooter />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {
      TEDHeader: () => import('@/components/common/TEDHeader'),
      TEDFooter: () => import('@/components/common/TEDFooter'),
    },
    computed: {
      ...mapGetters('application', ['getMenu'])
    }
  }
</script>
