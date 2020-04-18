<template>
  <div class="container">
    <p>Dynamic</p>

    <component :is="dynamicComponent.instance" v-bind="dynamicComponent.props" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "TEDxPage",
    components: {
      SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
    },
    computed: {
      ...mapGetters('application', ['getCurrentEdition']),
      pageInURL() {
          return this.$route.params && this.$route.params.TEDxPage
      },
      /**
       * @description To pass props dynamically, you can add the v-bind directive to your
       * dynamic component and pass an object containing your prop names and values.
       * @see https://stackoverflow.com/a/43658979
       */
      dynamicComponent() {
        switch (this.pageInURL) {
          case 'speakers':
            return { instance: 'SpeakersGrid', props: { year: this.getCurrentEdition } }

          default:
            return ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
