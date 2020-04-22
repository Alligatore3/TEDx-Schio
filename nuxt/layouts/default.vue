<template>
  <div>
    <div ref="header">
      <TEDHeader />
    </div>
    <div :style="swapHeight" class="swap-prevent">
      <nuxt v-if="getMenu.length" />
    </div>
    <div ref="footer">
      <TEDFooter />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({ swapHeight: null }),
    components: {
      TEDHeader: () => import('@/components/common/TEDHeader'),
      TEDFooter: () => import('@/components/common/TEDFooter'),
    },
    computed: {
      ...mapGetters('application', ['getMenu'])
    },
    methods: {
      /**
       * @description Prevent footer to roll up when site content change
       * due to change of the router.
       * @see https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
       * @return {Void}
       */
      setSwapHeight() {
        const sum = `${ this.$refs.header.clientHeight + this.$refs.footer.clientHeight }px`

        this.swapHeight = { 'min-height': `calc(100vh - ${sum})` }
      }
    },
    watch: {
      '$route': function() {
        return this.setSwapHeight()
      }
    }
  }
</script>
