<template>
  <div class="is-relative">
    <ButtonSpinner v-if="!getMenu.length" />
    <nav v-else :class="stickySearchClass" class="navbar py-1" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <TEDLogo color="#000"/>
          <a
            @click="SET_MENU_MOBILE_STATUS(!getMenuMobileStatus)"
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active mobile-menu' : getMenuMobileStatus }">
          <div class="navbar-end h-100">
            <div
              v-for="voice in computedMenuVoices"
              :key="voice.id"
              class="navbar-item mx-1 has-text-weight-medium pointer">
              <n-link @click.native="SET_MENU_MOBILE_STATUS(false)" :to="`/${voice.title.toLowerCase()}`">
                {{ voice.title }}
              </n-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { EMPTY_VALUE } from '@/constants'
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "TEDHeader",
    mixins:[axiosManager],
    data: () => ({ stickySearchClass: '' }),
    components: {
      TEDLogo: () => import('@/components/common/TEDLogo'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    methods: {
      ...mapMutations('application', ['SET_MENU_MOBILE_STATUS']),
      /**
       * @function
       * @name handleScroll
       * @returns {Void}
       */
      handleScroll() {
        this.stickySearchClass =
          document.documentElement.scrollTop >= 200
            ? "is-fixed-top" : "";
      },
    },
    computed: {
      ...mapGetters('application', ['getMenu', 'getMenuMobileStatus']),
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
      window.addEventListener("scroll", this.handleScroll, { passive: true });
      !this.getMenu.length && this.AXIOS_getMenuVoices()
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    /**
     * @description Reactive fn() to add proper class for scroll.
     * This is super usefull. It prevents to create file app.html in the root.
     * @see https://github.com/nuxt/nuxt.js/issues/188#issuecomment-335436430
     */
    head() {
      return {
        bodyAttrs: {
          class: this.getMenuMobileStatus ? 'is-clipped' : ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    z-index: 300;

    &.is-fixed-top {
      z-index: 180;
      border-bottom: 2px solid $ted-red;
    }

    .navbar-item {
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
  }
</style>
