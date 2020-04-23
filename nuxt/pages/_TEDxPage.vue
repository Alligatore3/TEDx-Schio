<template>
  <section class="section">
    <div class="container">
      <ButtonSpinner v-if="!getPageBySlugFromVUEX(pageInURL)" />
      <div class="my-2" v-else>
        <Hero v-if="bannerInfo.image" size="is-medium" :image="bannerInfo.image" :title="bannerInfo.title" />
        <component :is="dynamicComponent.instance" v-bind="dynamicComponent.props" />
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "TEDxPage",
    mixins: [axiosManager],
    components: {
      ButtonSpinner: () => import('@/components/common/ButtonSpinner'),
      Hero: () => import('@/components/common/Hero'),
      SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
      PartnersGrid: () => import('@/components/common/PartnersGrid/index'),
      bindToHTML: () => import('@/components/common/bindToHTML'),
    },
    computed: {
      ...mapGetters('application', ['getPages', 'getCurrentEdition', 'getPageBySlugFromVUEX']),
      pageInURL() {
          return this.$route.params && this.$route.params.TEDxPage
      },
      bannerInfo() {
        return {
          image: this.getPageBySlugFromVUEX(this.pageInURL) && this.getPageBySlugFromVUEX(this.pageInURL).acf.banner_image,
          title: this.pageInURL
        }
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

          case 'partners':
            return { instance: 'PartnersGrid', props: { year: this.getCurrentEdition } }

          case 'programma':
          case 'contatti':
            const html = this.getPageBySlugFromVUEX(this.pageInURL) &&
              this.getPageBySlugFromVUEX(this.pageInURL).content.rendered || ''

            return { instance: 'bindToHTML', props: { html } }

          default:
            return ''
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

<style scoped>

</style>
