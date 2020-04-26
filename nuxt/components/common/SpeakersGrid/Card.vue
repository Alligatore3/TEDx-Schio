<template>
  <div class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen mb-3">
    <n-link :to="`speaker/${speaker.slug}`">
      <figure class="image over-hidden">
        <img :src="speaker.image" :alt="speaker.name" />
        <img class="animated-image" :src="speaker.image" :alt="speaker.name" />
      </figure>
    </n-link>
    <h3 class="title is-3 mt-2 mb-1">
      {{ speaker.name }}
    </h3>
    <p class="subtitle mt-1 is-6">
      {{ speaker.description }}
    </p>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      speaker: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .animated-image {
    position: absolute;
    z-index: 30;
    top: 0;
    left: 0;

    -webkit-transition: 1s all ease;
    -o-transition: 1s all ease;
    -moz-transition: 1s all ease;
    transition: 1s all ease;

    &:hover {
      -webkit-transform: scale(1.3) translateX(40px);
      -moz-transform: scale(1.3) translateX(40px);
      -ms-transform: scale(1.3) translateX(40px);
      -o-transform: scale(1.3) translateX(40px);
      transform: scale(1.3) translateX(40px);
    }
  }

</style>
