<template>
  <div v-if="getPageBySlugFromVUEX('homepage')">
    <Hero :image="homepageACFMetaBy('full_width_image')" />
    <div class="container">
      <div class="mt-2" v-html="getPageBySlugFromVUEX('homepage').content.rendered"></div>
      <Announcer :year="getCurrentEdition" />
      <SpeakersGrid :year="getCurrentEdition" />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

export default {
  mixins:[axiosManager],
  components: {
    Hero: () => import('@/components/common/Hero'),
    Announcer: () => import('@/components/Announcer'),
    SpeakersGrid: () => import('@/components/common/SpeakersGrid/index'),
  },
  computed: {
    ...mapGetters('application', ['getCurrentEdition', 'getPageBySlugFromVUEX']),
  },
  methods: {
    homepageACFMetaBy(key) {
      return this.getPageBySlugFromVUEX('homepage') &&
        this.getPageBySlugFromVUEX('homepage').acf[key]
    }
  },
  mounted() {
    !this.getPageBySlugFromVUEX('homepage') && this.AXIOS_getPageBySlug('homepage')
  }
}
</script>
