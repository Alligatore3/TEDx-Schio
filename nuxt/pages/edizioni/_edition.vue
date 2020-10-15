<template>
  <div>
    <ButtonSpinner v-if="!getPageBySlugFromVUEX(currentEditionFromURL)" />
    <div v-else>
      <Hero :image="pageMetadata.image" />
      <section class="section">
        <div class="container">
          <div class="buttons is-centered mt-6 mb-9">
            <button class="button red-bg is-relative">
              <n-link class="w-100 ted-white has-text-weight-medium" to="#speakers">
                Speakers
              </n-link>
            </button>
            <button class="button red-bg is-relative">
              <n-link class="w-100 ted-white has-text-weight-medium" to="#partners">
                Partners
              </n-link>
            </button>
          </div>
          <PageContentHTML :html="pageMetadata.body" />
          <Announcer :year="currentEditionFromURLInt" />
          <SpeakersGrid :year="currentEditionFromURLInt" />
          <PartnersGrid :year="currentEditionFromURLInt" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "Edition",
    mixins: [axiosManager],
    components: {
      Hero: () => import('@/components/common/Hero'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner'),
      Announcer: () => import('@/components/Announcer'),
      SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
      PartnersGrid: () => import('@/components/common/PartnersGrid/index'),
      PageContentHTML: () => import('@/components/common/PageContentHTML'),
    },
    computed: {
      ...mapGetters('application', ['getPageBySlugFromVUEX']),
      /**
       * @todo
       * @description Due to questionable slug handling
       * by WP we have to separate '2019-2' slug and 2019 as Int
       */
      currentEditionFromURL() {
        return this.$route.params && this.$route.params.edition
      },
      currentEditionFromURLInt() {
        return parseInt(this.currentEditionFromURL, 10)
      },
      pageMetadata() {
        const {
          content: { rendered: body },
          _embedded: { 'wp:featuredmedia': medias }
        } = this.getPageBySlugFromVUEX(this.currentEditionFromURL)
        const image = medias && medias[0] && medias[0].source_url

        return { body, image }
      }
    },
    methods: {
      ...mapMutations('application', ['PUSH_A_PAGE'])
    },
    mounted() {
      !this.getPageBySlugFromVUEX(this.currentEditionFromURL) &&
        this.AXIOS_getEntityBySlug({ entity: 'pages', slug: this.currentEditionFromURL, mutation: this.PUSH_A_PAGE })
    }
  }
</script>

<style lang="scss" scoped>
  .buttons {
    button {
      width: 40%;
      border: 2px solid #f63614
    }
  }
</style>
