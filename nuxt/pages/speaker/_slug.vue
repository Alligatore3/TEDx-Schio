<template>
  <section class="section">
    <div class="container is-relative">
      <ButtonSpinner v-if="!getSpeakerBySlugFromVUEX(speakerName)" />
      <SubjectBlock v-else :subject="computedSpeaker" />
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "slug",
    mixins: [axiosManager],
    components: {
      ButtonSpinner: () => import('@/components/common/ButtonSpinner'),
      SubjectBlock: () => import('@/components/common/SubjectBlock'),
    },
    computed: {
      ...mapGetters('application', ['getSpeakerBySlugFromVUEX']),
      speakerName() {
        return this.$route.params && this.$route.params.slug
      },
      computedSpeaker() {
        const { title: { rendered: title}, content: { rendered: excerpt }, image_url, acf: { descrizione } } = this.getSpeakerBySlugFromVUEX(this.speakerName)
        return {
          title,
          subtitle: descrizione,
          excerpt,
          image_url,
        }
      }
    },
    methods: {
      ...mapMutations('application', ['PUSH_A_SPEAKER']),
    },
    mounted() {
      !this.getSpeakerBySlugFromVUEX(this.speakerName) &&
        this.AXIOS_getEntityBySlug({ entity: 'speakers', slug: this.speakerName, mutation: this.PUSH_A_SPEAKER })
    }
  }
</script>

<style scoped>

</style>
