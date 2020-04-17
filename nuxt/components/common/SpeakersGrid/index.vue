<template>
  <div class="speakers">
    <h1 class="title is-2 ted-red has-text-centered my-2">
      Gli Speaker di TEDxSchio {{ year }}
    </h1>
    <pre>
      {{ getSpeakersByYearFromVUEX(year) }}
    </pre>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "SpeakersGrid",
    mixins: [axiosManager],
    components: {
      Card: () => import('./Card')
    },
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    },
    computed: {
      ...mapGetters('application', ['getSpeakersByYearFromVUEX'])
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

