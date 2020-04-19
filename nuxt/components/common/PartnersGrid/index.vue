<template>
  <div>
    <ButtonSpinner v-if="!partnersFromVUEX" />
    <div v-else class="speakers">
      <h1 class="title is-2 ted-red has-text-centered my-3">
        I Partner di TEDxSchio {{ year }}
      </h1>
      <div class="columns is-mobile is-multiline">
        <PartnerRow
          class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
          v-for="(partner, index) in computedPartners"
          :key="index"
          :partner="partner" />
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
      PartnerRow: () => import('./PartnerRow'),
      ButtonSpinner: () => import('@/components/common/ButtonSpinner')
    },
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      }
    },
    computed: {
      ...mapGetters('application', ['isContextLoading', 'getEntityByYearFromVUEX']),
      partnersFromVUEX() {
        return this.getEntityByYearFromVUEX({ entity: 'partners', year: this.year })
      },
      computedPartners() {
        return this.partnersFromVUEX &&
          this.partnersFromVUEX.map(
            partner => ({
              slug: partner.slug,
              image: partner.image_url,
              name: partner.title.rendered,
              description: partner.acf.descrizione
            })
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

