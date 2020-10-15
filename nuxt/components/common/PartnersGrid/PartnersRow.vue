<template>
  <div class="row-partners my-3">
    <div class="title has-text-centered is-relative">
      <span class="subtitle is-6">{{ title }}</span>
    </div>
    <div class="columns my-6 is-tablet is-multiline is-centered is-vcentered">
      <div
        v-for="partner in partners"
        :key="partner.id"
        class="column is-one-third-tablet is-one-quarter-desktop">
        <figure class="image max-w-half mx-auto">
          <img :src="partner.image_url" :alt="partner.slug" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PartnersRow",
    props: {
      title: {
        type: String,
        default: ''
      },
      partners: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin: 0;

    &:before {
      content: '';
      width: 85%;
      height: 1px;
      position: absolute;
      background-color: $ted-dark-black;
      left: 0;
      right: 0;
      top: 25px;
      margin-left: auto;
      margin-right: auto;
    }

    span {
      padding: 10px 20px;
      position: relative;
      z-index: 5;
      background-color: $ted-light-grey;
    }
  }
</style>
