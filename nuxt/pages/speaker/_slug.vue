<template>
  <pre>
    {{ getSpeakerBySlugFromVUEX(speakerName) }}
  </pre>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "slug",
    computed: {
      ...mapGetters('application', ['getSpeakerBySlugFromVUEX']),
      speakerName() {
        return this.$route.params && this.$route.params.slug
      }
    }
  }
</script>

<style scoped>

</style>
