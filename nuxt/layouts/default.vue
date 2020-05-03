<template>
  <div>
    <TEDHeader />
    <div :style="swapStyles" class="swap-prevent">
      <nuxt v-if="getMenu.length" />
    </div>
    <TEDFooter />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      swapStyles: { 'min-height': 'auto' }
    }),
    components: {
      TEDHeader: () => import('@/components/common/TEDHeader'),
      TEDFooter: () => import('@/components/common/TEDFooter'),
    },
    computed: {
      ...mapGetters('application', ['getMenu'])
    },
    mounted() {
      window.addEventListener('resize', this.setSwapStyles, false)
    },
    destroyed(){
      window.removeEventListener('resize', this.setSwapStyles)
    },
    methods: {
      /**
       * @description Prevent footer to roll up when site content change
       * due to change of the router.
       * @see https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
       * @return {Void}
       */
      setSwapStyles() {
        const header = document.querySelector('nav.navbar')
        const footer = document.getElementById('footerContainer')
        const headerHeight = header ? header.clientHeight : 0
        const footerHeight = footer ? footer.clientHeight : 0

        this.swapStyles = {
          'min-height': `calc(100vh - ${ headerHeight + footerHeight }px)`,
        }
      }
    },
    watch: {
      '$route': function() {
        return this.setSwapStyles()
      }
    }
  }
</script>
