<template>
  <p>SpeakersGrid</p>
</template>

<script>
  export default {
    name: "SpeakersGrid",
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    }
  }
</script>

<style scoped>

</style>
