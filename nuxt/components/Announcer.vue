<template>
  <div class="is-relative">
    <ButtonSpinner v-if="isContextLoading('announcers')" />
    <div v-else>
      <h3 class="title is-3 ted-red has-text-centered">
        La presentatrice di TEDxSchio {{ this.currentYear }}
      </h3>
      <div class="mt-1 columns is-multiline">
        <div class="column">
          <figure class="image">
            <img :src="computedAnnouncer.image_url" :alt="computedAnnouncer.name">
          </figure>
        </div>
        <div class="column">
          <div v-html="computedAnnouncer.excerpt"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "Announcer",
    mixins: [axiosManager],
    data: () => ({ currentYear: 2019 }),
    components: {
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    computed: {
      ...mapGetters('application', ['getAnnouncerByYearFromVUEX', 'isContextLoading']),
      computedAnnouncer() {
        const { title: { rendered: name}, content: { rendered: excerpt }, image_url } = this.getAnnouncerByYearFromVUEX(this.currentYear)
        return { name, excerpt, image_url }
      }
    },
    mounted() {
      !this.getAnnouncerByYearFromVUEX(this.currentYear) &&
        this.AXIOS_getAnnouncerByYear(this.currentYear)
    }
  }
</script>

<style scoped>

</style>
