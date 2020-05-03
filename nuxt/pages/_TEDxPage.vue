<template>
  <div>
    <ButtonSpinner v-if="!getPageBySlugFromVUEX(pageInURL)" />
    <component
      v-else
      v-for="(component, index) in dynamicComponents"
      :key="index"
      :is="component.instance"
      v-bind="component.props" />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "TEDxPage",
    mixins: [axiosManager],
    components: {
      ButtonSpinner: () => import('@/components/common/ButtonSpinner'),
      SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
      PartnersGrid: () => import('@/components/common/PartnersGrid/index'),
      SVGHero: () => import('@/components/common/SVGHero'),
      PageContentHTML: () => import('@/components/common/PageContentHTML'),
    },
    computed: {
      ...mapGetters('application', ['getPages', 'getCurrentEdition', 'getPageBySlugFromVUEX']),
      pageInURL() {
          return this.$route.params && this.$route.params.TEDxPage
      },
      /**
       * @description To pass props dynamically, you can add the v-bind directive to your
       * dynamic component and pass an object containing your prop names and values.
       * @see https://stackoverflow.com/a/43658979
       * @return {Array}
       */
      dynamicComponents() {
        switch (this.pageInURL) {
          case 'contatti':
            const html = this.getPageBySlugFromVUEX(this.pageInURL) &&
              this.getPageBySlugFromVUEX(this.pageInURL).content.rendered || ''

            return [
              { instance: 'SVGHero', props: { title: this.pageInURL } },
              { instance: 'PageContentHTML', props: { html } }
            ]

          default:
            return []
        }
      }
    },
    methods: {
      ...mapMutations('application', ['PUSH_A_PAGE']),
    },
    mounted() {
      !this.getPageBySlugFromVUEX(this.pageInURL) &&
        this.AXIOS_getEntityBySlug({ entity: 'pages', slug: this.pageInURL, mutation: this.PUSH_A_PAGE })
    }
  }
</script>
