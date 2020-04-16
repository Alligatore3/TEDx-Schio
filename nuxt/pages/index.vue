<template>
  <div>
    <Hero :image="homepageACFMetaBy('full_width_image')" />
    {{ getPageBySlugFromVUEX('homepage')  }}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

export default {
  mixins:[axiosManager],
  components: {
    Hero: () => import('@/components/common/Hero')
  },
  computed: {
    ...mapGetters('application', ['getPageBySlugFromVUEX']),
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

<style>
  .mt-2 {
    margin-top: 2rem;
  }
</style>
