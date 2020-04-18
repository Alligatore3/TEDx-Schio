<template>
  <div class="mx-auto" :class="{'sub-container' : size === 'is-medium'}">
    <section class="hero" :class="size">
      <div class="hero-body is-relative over-hidden">
        <img v-if="image" class="hero-image" :src="image" alt="Banner Image" />
        <h1 class="title float is-capitalized ted-red">
          {{ title }}
        </h1>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Hero",
    props: {
      size: {
        type: String,
        default: 'is-large'
      },
      image: {
        type: String | Boolean,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sub-container {
    max-width: 80%;
  }

  .hero-image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
  }

  .float {
    position: absolute;
    z-index: 100;
    letter-spacing: 3px;
    bottom: -webkit-calc(50% - 60px);
    bottom: -moz-calc(50% - 60px);
    bottom: calc(50% - 60px);
    left: 150px;
    font-size: 5rem;
  }
</style>
