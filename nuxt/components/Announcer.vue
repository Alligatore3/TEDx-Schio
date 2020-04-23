<template>
  <div class="is-relative my-6">
    <ButtonSpinner v-if="!getAnnouncerByYearFromVUEX(year)" />
    <SubjectBlock v-else :subject="computedAnnouncer" />
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
      ButtonSpinner: () => import('@/components/common/ButtonSpinner'),
      SubjectBlock: () => import('@/components/common/SubjectBlock'),
    },
    computed: {
      ...mapGetters('application', ['getAnnouncerByYearFromVUEX']),
      computedAnnouncer() {
        const { content: { rendered: excerpt }, image_url } = this.getAnnouncerByYearFromVUEX(this.year)
        return {
          title: `La presentatrice di TEDxSchio ${ this.year }`,
          excerpt,
          image_url,
        }
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
