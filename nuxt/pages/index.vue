<template>
  <div v-if="getPageBySlugFromVUEX('homepage')">
    <Hero :image="homepageACFMetaBy('full_width_image')" />
    <section class="section">
      <div class="container">
        <div v-html="getPageBySlugFromVUEX('homepage').content.rendered"></div>
        <Announcer :year="getCurrentEdition" />
        <SpeakersGrid :year="getCurrentEdition" />
      </div>
    </section>
    <BottomMatrix :matrix="matrix" />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

export default {
  mixins:[axiosManager],
  components: {
    Hero: () => import('@/components/common/Hero'),
    Announcer: () => import('@/components/Announcer'),
    BottomMatrix: () => import('@/components/BottomMatrix'),
    SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
  },
  computed: {
    ...mapGetters('application', ['getCurrentEdition', 'getPageBySlugFromVUEX']),
    matrix() {
      return {
        lt: {
          image: this.homepageACFMetaBy('immagine_sx'),
          alt: 'TED image'
        },
        lb: { text: this.homepageACFMetaBy('tedxschio') },
        rt: { text: this.homepageACFMetaBy('ted') },
        rb: {
          image: this.homepageACFMetaBy('immagine_dx'),
          alt: 'TED image'
        },
      }
    }
  },
  methods: {
    ...mapMutations('application', ['PUSH_A_PAGE']),
    homepageACFMetaBy(key) {
      return this.getPageBySlugFromVUEX('homepage') &&
        this.getPageBySlugFromVUEX('homepage').acf[key]
    },
  },
  mounted() {
    !this.getPageBySlugFromVUEX('homepage') &&
      this.AXIOS_getEntityBySlug({ entity: 'pages', slug: 'homepage', mutation: this.PUSH_A_PAGE })
  }
}
</script>
