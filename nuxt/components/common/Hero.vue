<template>
  <section
    class="hero is-large"
    :class="{'has-bg-img' : image}"
    :style="{ backgroundImage: 'url(' + image + ')' }">
    <div class="hero-body is-relative over-hidden">
      <h1 class="title float is-capitalized ted-red">
        {{ title }}
      </h1>
    </div>
  </section>
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
  /*
    Thanks to https://github.com/jgthms/bulma/issues/1007#issuecomment-320096294
  */
  .has-bg-img {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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

    @media all and (max-width: 768px) {
      left: 10%;
      bottom: 0;
      font-size: 2.5rem;
    }
  }
</style>
