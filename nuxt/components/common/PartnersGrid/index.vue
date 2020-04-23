<template>
  <div>
    <ButtonSpinner v-if="!partnersFromVUEX" />
    <div v-else class="speakers">
      <h1 class="title is-2 ted-red has-text-centered my-3">
        I Partner di TEDxSchio {{ year }}
      </h1>
      <div
        class="row-category"
        v-for="(row, index) in rowsCategories"
        :key="index">
        <PartnersRow :partners="computedPartners[row.slug]" :title="row.name"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axiosManager from "@/mixins/axiosManager";

  export default {
    name: "PartnersGrid",
    mixins: [axiosManager],
    components: {
      PartnersRow: () => import('./PartnersRow'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    },
    computed: {
      ...mapGetters('application', ['getEntityByYearFromVUEX', 'getCategoriesBySlugFromVUEX']),
      partnersFromVUEX() {
        return this.getEntityByYearFromVUEX({ entity: 'partners', year: this.year })
      },
      /**
       * @todo
       * @description Not a clear fn() but due to sharing categories
       * from WP we have to filter them.
       * Multiple methods are required for order.
       * @return {Array}
       */
      rowsCategories() {
        return this.getCategoriesBySlugFromVUEX('partners')
          .filter(cat => isNaN(cat.slug))
          .map(cat => ({ ...cat, priority: parseInt(cat.description, 10) }))
          .sort((a, b) => a.priority - b.priority)
      },
      computedPartners() {
        return this.rowsCategories &&
          this.rowsCategories.reduce(
            (acc, curr) => {
              acc[curr.slug] = this.partnersFromVUEX.filter(
                partner => partner['partners-category'].some( cat => cat === curr.id )
              )
              return acc
            }, {}
          )
      }
    },
    methods: {
      ...mapMutations('application', ['SET_PARTNERS'])
    },
    mounted() {
      !this.partnersFromVUEX &&
        this.AXIOS_getEntityByYear({
          entity: 'partners',
          year: this.year,
          mutation: this.SET_PARTNERS
        })
    }
  }
</script>

