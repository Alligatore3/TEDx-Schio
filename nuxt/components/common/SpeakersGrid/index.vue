<template>
  <div>
    <ButtonSpinner v-if="!speakersFromVUEX" />
    <div v-else class="speakers">
      <h1 class="title is-2 ted-red has-text-centered my-3">
        Gli Speaker di TEDxSchio {{ year }}
      </h1>
      <div class="columns is-tablet is-multiline">
        <Card
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
      ...mapGetters('application', ['isContextLoading', 'getEntityByYearFromVUEX']),
      speakersFromVUEX() {
        return this.getEntityByYearFromVUEX({ entity: 'speakers', year: this.year })
      },
      computedSpeakers() {
        return this.speakersFromVUEX &&
          this.speakersFromVUEX.map(
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
      !this.speakersFromVUEX &&
        this.AXIOS_getEntityByYear({
          entity: 'speakers',
          year: this.year,
          mutation: this.SET_SPEAKERS
        })
    }
  }
</script>

