<template>
  <div>
<!--    <Hero :image="homepageACFMetaBy('full_width_image')" />-->
    <pre>
      {{ getPageBySlugFromVUEX('2019') }}
    </pre>
    <section class="section">
      <div class="container">
        <Announcer :year="currentEditionFromURLInt" />
        <SpeakersGrid :year="currentEditionFromURLInt" />
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "Edition",
    mixins: [axiosManager],
    components: {
      Announcer: () => import('@/components/Announcer'),
      SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
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
