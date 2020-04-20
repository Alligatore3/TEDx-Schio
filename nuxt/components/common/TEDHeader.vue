<template>
  <div class="container is-relative">
    <ButtonSpinner v-if="isContextLoading('menu')" />
    <nav v-else :class="stickySearchClass" class="navbar py-1" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <n-link class="navbar-item" to="/">
          <figure class="image">
            <img src="/TEDxSchio-logo.png" alt="TEDx Schio">
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
            <n-link :to="`/${voice.title.toLowerCase()}`">
              {{ voice.title }}
            </n-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>``
  import { EMPTY_VALUE } from '@/constants'
  import { mapGetters } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "TEDHeader",
    mixins:[axiosManager],
    data: () => ({ stickySearchClass: '' }),
    components: {
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    methods: {
      /**
       * @function
       * @name handleScroll
       * @returns {Void}
       */
      handleScroll() {
        this.stickySearchClass =
          document.documentElement.scrollTop >= 300
            ? "is-fixed-top" : "";
      },
    },
    computed: {
      ...mapGetters('application', ['getMenu', 'isContextLoading']),
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
      window.addEventListener("scroll", this.handleScroll);
      !this.getMenu.length && this.AXIOS_getMenuVoices()
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  }
</script>

<style lang="scss" scoped>
  .is-fixed-top {
    z-index: 100;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .navbar-item {
    figure {
      max-width: 200px;

      img {
        max-height: none;
      }
    }

    &.has-text-weight-medium {
      .nuxt-link-active,
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
    }
  }
</style>
