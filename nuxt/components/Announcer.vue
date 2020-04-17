<template>
  <div class="is-relative">
    <ButtonSpinner v-if="isContextLoading('announcers')" />
    <div v-else>
      <h3 class="title is-3 ted-red has-text-centered">
        La presentatrice di TEDxSchio {{ this.year }}
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
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "Announcer",
    mixins: [axiosManager],
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    },
    components: {
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    computed: {
      ...mapGetters('application', ['getAnnouncerByYearFromVUEX', 'isContextLoading']),
      computedAnnouncer() {
        const { title: { rendered: name}, content: { rendered: excerpt }, image_url } = this.getAnnouncerByYearFromVUEX(this.year)
        return { name, excerpt, image_url }
      }
    },
    methods: {
      ...mapMutations('application', ['PUSH_AN_ANNOUNCER'])
    },
    mounted() {
      !this.getAnnouncerByYearFromVUEX(this.year) &&
        this.AXIOS_getEntityByYear({
          entity: 'announcers',
          year: this.year,
          mutation: this.PUSH_AN_ANNOUNCER
        })
    }
  }
</script>

<style scoped>

</style>
