<template>
  <section class="hero is-large">
    <div class="hero-body is-relative over-hidden">
      <img class="hero-image" v-if="image" :src="image" alt="Banner Image" />
      <div class="container"></div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Hero",
    props: {
      image: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero-image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
  }
</style>
