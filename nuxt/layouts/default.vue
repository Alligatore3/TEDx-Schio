<template>
  <div>
    <TEDHeader />
    <nuxt v-if="getMenu.length" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {
      TEDHeader: () => import('@/components/common/TEDHeader')
    },
    computed: {
      ...mapGetters('application', ['getMenu'])
    }
  }
</script>
