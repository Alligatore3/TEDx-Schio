<template>
  <div class="is-relative">
    <ButtonSpinner v-if="!computedMenuVoices.length" />
    <nav v-else class="navbar is-fixed-top py-1" role="navigation" aria-label="main navigation">
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
              class="navbar-item mx-1 has-text-weight-medium pointer"
              :class="classObject(voice.childs)">
              <a
                :class="{ 'navbar-link' : voice.childs.length }"
                @click="menuVoiceClick(voice)">
                {{ voice.title }}
              </a>

              <div v-if="voice.childs.length" class="navbar-dropdown">
                <a
                  v-for="child in voice.childs"
                  :key="child.ID"
                  class="navbar-item"
                  @click="menuVoiceClick(voice, child.slug)">
                  {{ child.title }}
                </a>
              </div>
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
    data: () => ({ dropdownActive: false }),
    components: {
      TEDLogo: () => import('@/components/common/TEDLogo'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    methods: {
      ...mapMutations('application', ['SET_MENU_MOBILE_STATUS']),
      classObject(childs) {
        return {
          'is-active': this.dropdownActive,
          'has-dropdown is-relative': childs.length
        }
      },
      menuVoiceClick(menuVoice, childSlug) {
        this.SET_MENU_MOBILE_STATUS(false)
        const hasChilds = Boolean(menuVoice.childs.length)
        const path = childSlug ? `/${menuVoice.slug}/${childSlug}` : `/${menuVoice.slug}`

        if(hasChilds && !childSlug) {
          this.dropdownActive = true
        } else {
          this.dropdownActive = false
          this.$router.push({ path })
        }
      },
    },
    computed: {
      ...mapGetters('application', ['getMenu', 'getMenuMobileStatus']),
      /**
       * @name computedMenuVoices
       * @description Assuming that the father always comes first
       * if the 'menu_item_parent' is not 0 so we have a child.
       */
      computedMenuVoices() {
        return this.getMenu.length
          ? this.getMenu.reduce(
            (acc, curr, index) => {
              const itemId = parseInt(curr.menu_item_parent, 10)
              const fatherIndex = itemId === 0 ? index : 0

              if (itemId === 0) {
                acc.push({ ...curr, childs: [] })
              } else {
                acc[fatherIndex] && acc[fatherIndex].childs.push(curr)
              }

              return acc
            }, [])
          : []
      }
    },
    /**
     * @description This will hook always be called
     * Either we refresh the page or navigate through menu.
     */
    mounted() {
      !this.getMenu.length && this.AXIOS_getMenuVoices()
    },
    /**
     * @description Just a guard in case we chagne route with menu opened.
     */
    watch: {
      '$route'() {
        this.dropdownActive && (this.dropdownActive = false)
      }
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
  .navbar.is-fixed-top {
    z-index: 300;
    border-bottom: 2px solid $ted-red;

    .navbar-item {
      &.has-text-weight-medium {
        .nuxt-link-active,
        &:hover {
          &:before {
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
