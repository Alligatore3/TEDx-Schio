<template>
  <div>
    <ButtonSpinner v-if="!getSpeakersByYearFromVUEX(year)" />
    <div v-else class="speakers">
      <h1 class="title is-2 ted-red has-text-centered my-3">
        Gli Speaker di TEDxSchio {{ year }}
      </h1>
      <div class="columns is-mobile is-multiline">
        <Card
          class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
          v-for="(speaker, index) in computedSpeakers"
          :key="index"
          :speaker="speaker" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "SpeakersGrid",
    mixins: [axiosManager],
    components: {
      Card: () => import('./Card'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    },
    computed: {
      ...mapGetters('application', ['isContextLoading', 'getSpeakersByYearFromVUEX']),
      computedSpeakers() {
        return this.getSpeakersByYearFromVUEX(this.year) &&
          this.getSpeakersByYearFromVUEX(this.year).map(
            speaker => ({
              slug: speaker.slug,
              image: speaker.image_url,
              name: speaker.title.rendered,
              description: speaker.acf.descrizione
            })
          )
      }
    },
    methods: {
      ...mapMutations('application', ['SET_SPEAKERS'])
    },
    mounted() {
      !this.getSpeakersByYearFromVUEX(this.year) &&
        this.AXIOS_getEntityByYear({
          entity: 'speakers',
          year: this.year,
          mutation: this.SET_SPEAKERS
        })
    }
  }
</script>

