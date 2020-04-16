<template>
  <div class="container">
    <nav class="navbar my-1" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <n-link class="navbar-item" to="/">
          <figure class="image">
            <img src="TEDxSchio-logo.png" alt="TEDx Schio">
          </figure>
        </n-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div
            v-for="voice in computedMenuVoices"
            :key="voice.id"
            class="navbar-item mx-1 has-text-weight-medium pointer">
            <n-link :to="voice.title">
              {{ voice.title }}
            </n-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { EMPTY_VALUE } from '@/constants'
  import { mapGetters } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "TEDHeader",
    mixins:[axiosManager],
    computed: {
      ...mapGetters('application', ['getMenu']),
      computedMenuVoices() {
        return this.getMenu.map(
          (voice, index) => ({
            id: voice.id || index,
            title: voice.title || EMPTY_VALUE
          })
        )
      }
    },
    /**
     * @description This will hook always be called
     * Either we refresh the page or navigate through menu.
     */
    mounted() {
      !this.getMenu.length && this.AXIOS_getMenuVoices()
    }
  }
</script>

<style lang="scss" scoped>
  .navbar-item {
    &:hover {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: $ted-red;
        height: 2px;
      }
    }

    a {
      color: $ted-dark-black
    }

    figure {
      max-width: 200px;

      img {
        max-height: none;
      }
    }
  }
</style>
