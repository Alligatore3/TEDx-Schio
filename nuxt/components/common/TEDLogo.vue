<template>
  <n-link @click.native="SET_MENU_MOBILE_STATUS(false)" to="/">
    <svg id="SVG_Logo" class="w-100" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 876.1 259.28">
      <title>Logo TEDxSchio</title>
      <path class="cls-1" d="M53,202.6,45.4,191.69h7.21l4,6,4-6h7l-7.57,10.77,8.5,12.24H61.38l-4.81-7.25-4.81,7.25H44.69Z"/>
      <path :style="computedStyle" d="M98.54,201.08H76.06v-4.76H98.54Zm0,9.53H76.06v-4.77H98.54Z"/>
      <path :style="computedStyle" d="M115.77,188.13h-6.32v-5.21h6.32Zm-6.32,3.56h6.32v23h-6.32Z"/>
      <path :style="computedStyle" d="M119.86,191.69h6v3.21H126a8.18,8.18,0,0,1,7-3.83c6.73,0,8.42,3.78,8.42,9.48V214.7h-6.32v-13c0-3.79-1.12-5.66-4-5.66-3.43,0-4.9,1.92-4.9,6.59V214.7h-6.32Z"/>
      <path :style="computedStyle" d="M161.79,211.76h-.09c-1.47,2.5-4,3.57-7,3.57-6.94,0-10.33-6-10.33-12.33,0-6.19,3.43-11.93,10.2-11.93a8,8,0,0,1,6.85,3.42h0V182.92h6.32V214.7h-6Zm-5.52-15.93c-4.14,0-5.57,3.56-5.57,7.34,0,3.61,1.65,7.39,5.57,7.39,4.18,0,5.43-3.65,5.43-7.43S160.36,195.83,156.27,195.83Z"/>
      <path :style="computedStyle" d="M176.87,204.73c.18,4,2.14,5.83,5.66,5.83,2.53,0,4.58-1.55,5-3h5.56c-1.78,5.43-5.56,7.75-10.77,7.75-7.25,0-11.75-5-11.75-12.11,0-6.9,4.76-12.15,11.75-12.15,7.84,0,11.62,6.58,11.17,13.66Zm10.28-4c-.57-3.21-2-4.9-5-4.9a5,5,0,0,0-5.25,4.9Z"/>
      <path :style="computedStyle" d="M196.32,191.69h6v2.94h.09a7.65,7.65,0,0,1,6.85-3.56c7.21,0,10.46,5.83,10.46,12.37,0,6.14-3.38,11.89-10.1,11.89a8.17,8.17,0,0,1-6.9-3.48h-.09v11h-6.32Zm17.09,11.57c0-3.65-1.47-7.43-5.52-7.43s-5.47,3.69-5.47,7.43,1.42,7.3,5.52,7.3S213.41,207,213.41,203.26Z"/>
      <path :style="computedStyle" d="M227.83,204.73c.18,4,2.14,5.83,5.66,5.83,2.53,0,4.58-1.55,5-3H244c-1.78,5.43-5.56,7.75-10.77,7.75-7.25,0-11.75-5-11.75-12.11,0-6.9,4.76-12.15,11.75-12.15,7.84,0,11.62,6.58,11.17,13.66Zm10.28-4c-.57-3.21-2-4.9-5-4.9a5,5,0,0,0-5.25,4.9Z"/>
      <path :style="computedStyle" d="M247.28,191.69h6v3.21h.13a8.21,8.21,0,0,1,7-3.83c6.72,0,8.41,3.78,8.41,9.48V214.7h-6.32v-13c0-3.79-1.11-5.66-4.05-5.66-3.43,0-4.9,1.92-4.9,6.59V214.7h-6.32Z"/>
      <path :style="computedStyle" d="M289.21,211.76h-.09c-1.47,2.5-4.05,3.57-7,3.57-6.94,0-10.33-6-10.33-12.33,0-6.19,3.43-11.93,10.2-11.93a8,8,0,0,1,6.85,3.42h0V182.92h6.32V214.7h-6Zm-5.52-15.93c-4.14,0-5.57,3.56-5.57,7.34,0,3.61,1.65,7.39,5.57,7.39,4.18,0,5.43-3.65,5.43-7.43S287.78,195.83,283.69,195.83Z"/>
      <path :style="computedStyle" d="M304.29,204.73c.18,4,2.14,5.83,5.66,5.83,2.53,0,4.58-1.55,5-3h5.57c-1.78,5.43-5.57,7.75-10.78,7.75-7.25,0-11.75-5-11.75-12.11,0-6.9,4.77-12.15,11.75-12.15,7.84,0,11.62,6.58,11.18,13.66Zm10.29-4c-.58-3.21-2-4.9-5-4.9a5,5,0,0,0-5.26,4.9Z"/>
      <path :style="computedStyle" d="M323.74,191.69h6v3.21h.14a8.18,8.18,0,0,1,7-3.83c6.72,0,8.41,3.78,8.41,9.48V214.7H339v-13c0-3.79-1.11-5.66-4.05-5.66-3.43,0-4.9,1.92-4.9,6.59V214.7h-6.32Z"/>
      <path :style="computedStyle" d="M357.26,191.69h4.63v4.23h-4.63v11.39c0,2.14.53,2.67,2.67,2.67a10,10,0,0,0,2-.17v4.94a25.39,25.39,0,0,1-3.7.22c-3.87,0-7.25-.89-7.25-5.48V195.92h-3.83v-4.23h3.83v-6.9h6.32Z"/>
      <path :style="computedStyle" d="M364.2,182.92h6.32V214.7H364.2Z"/>
      <path :style="computedStyle" d="M386,217.6c-1.38,3.69-3.56,5.2-7.92,5.2a38.61,38.61,0,0,1-3.87-.22v-5.21a34.48,34.48,0,0,0,3.69.23c2.18-.23,2.9-2.5,2.18-4.32l-8.1-21.59h6.77l5.21,15.76H384l5-15.76h6.54Z"/>
      <path :style="computedStyle" d="M419.48,191.07c7.25,0,11.93,4.8,11.93,12.15s-4.68,12.11-11.93,12.11-11.89-4.81-11.89-12.11S412.27,191.07,419.48,191.07Zm0,19.49c4.32,0,5.61-3.69,5.61-7.34s-1.29-7.39-5.61-7.39-5.57,3.69-5.57,7.39S415.21,210.56,419.48,210.56Z"/>
      <path :style="computedStyle" d="M433.72,191.69h6V196h.09a8.12,8.12,0,0,1,7.34-4.89,4.8,4.8,0,0,1,1.38.22v5.88a11,11,0,0,0-2.27-.23c-4.63,0-6.23,3.34-6.23,7.39V214.7h-6.32Z"/>
      <path :style="computedStyle" d="M472.26,213.23c0,3.79-1.33,10.2-11.93,10.2-4.54,0-9.83-2.14-10.14-7.39h6.27c.58,2.36,2.49,3.16,4.72,3.16,3.52,0,5.12-2.41,5.07-5.7v-3h-.08a7.76,7.76,0,0,1-6.9,3.56c-6.9,0-9.84-5.25-9.84-11.57,0-6,3.43-11.39,9.88-11.39,3,0,5.34,1,6.86,3.69h.08v-3.07h6Zm-6-10.32c0-3.74-1.29-7.08-5.38-7.08-3.56,0-5.12,3.12-5.12,6.54s1.25,6.9,5.12,6.9C464.47,209.27,466.25,206.2,466.25,202.91Z"/>
      <path :style="computedStyle" d="M475.29,198.77c.35-5.92,5.65-7.7,10.81-7.7,4.59,0,10.11,1,10.11,6.54v12c0,2.1.22,4.19.8,5.12H490.6a9.83,9.83,0,0,1-.45-2.22,10.55,10.55,0,0,1-7.74,2.85c-4.36,0-7.83-2.19-7.83-6.9,0-5.21,3.91-6.46,7.83-7s7.48-.45,7.48-3-1.87-3.11-4.1-3.11c-2.4,0-4,1-4.18,3.47Zm14.6,4.67c-1.07.94-3.3,1-5.25,1.34s-3.74,1.06-3.74,3.38,1.82,2.94,3.87,2.94c4.94,0,5.12-3.92,5.12-5.3Z"/>
      <path :style="computedStyle" d="M500.21,191.69h6v3.21h.13a8.21,8.21,0,0,1,7-3.83c6.72,0,8.41,3.78,8.41,9.48V214.7h-6.32v-13c0-3.79-1.11-5.66-4.05-5.66-3.43,0-4.9,1.92-4.9,6.59V214.7h-6.32Z"/>
      <path :style="computedStyle" d="M531.32,188.13H525v-5.21h6.32ZM525,191.69h6.32v23H525Z"/>
      <path :style="computedStyle" d="M534,209.94l12-13.49H534.88v-4.76h19.41v4.76l-12,13.49h12.81v4.76H534Z"/>
      <path :style="computedStyle" d="M562.83,204.73c.18,4,2.14,5.83,5.66,5.83,2.53,0,4.58-1.55,5-3H579c-1.78,5.43-5.56,7.75-10.77,7.75-7.25,0-11.75-5-11.75-12.11,0-6.9,4.77-12.15,11.75-12.15,7.84,0,11.62,6.58,11.18,13.66Zm10.28-4c-.57-3.21-2-4.9-5-4.9a5,5,0,0,0-5.26,4.9Z"/>
      <path :style="computedStyle" d="M598.71,211.76h-.09c-1.47,2.5-4,3.57-7,3.57-6.94,0-10.33-6-10.33-12.33,0-6.19,3.43-11.93,10.2-11.93a8,8,0,0,1,6.85,3.42h0V182.92h6.33V214.7h-6Zm-5.52-15.93c-4.14,0-5.57,3.56-5.57,7.34,0,3.61,1.65,7.39,5.57,7.39,4.18,0,5.43-3.65,5.43-7.43S597.28,195.83,593.19,195.83Z"/>
      <path :style="computedStyle" d="M627.77,188.8h-9.53v-5.88h26v5.88h-9.52v25.9h-7Z"/>
      <path :style="computedStyle" d="M647,182.92h23.77v5.88H654v6.81h15.4V201H654v7.79h17.13v5.87H647Z"/>
      <path :style="computedStyle" d="M674.1,182.92h13.71c8.23,0,14.42,5.17,14.42,15.71,0,9.22-4.72,16.07-14.42,16.07H674.1Zm7,25.91h6.23c4,0,7.92-2.5,7.92-9.53,0-6.41-2.22-10.5-9.17-10.5h-5Z"/>
      <path :style="computedStyle" d="M722.21,204.73c.18,4,2.14,5.83,5.65,5.83,2.54,0,4.59-1.55,5-3h5.56c-1.78,5.43-5.56,7.75-10.77,7.75-7.25,0-11.75-5-11.75-12.11,0-6.9,4.76-12.15,11.75-12.15,7.84,0,11.62,6.58,11.17,13.66Zm10.28-4c-.57-3.21-2-4.9-5-4.9a5,5,0,0,0-5.25,4.9Z"/>
      <path :style="computedStyle" d="M753.5,214.7h-7l-7.88-23h6.63l4.85,15.71h.09L755,191.69h6.28Z"/>
      <path :style="computedStyle" d="M767.34,204.73c.18,4,2.14,5.83,5.65,5.83,2.54,0,4.59-1.55,5-3h5.56c-1.78,5.43-5.56,7.75-10.77,7.75-7.25,0-11.75-5-11.75-12.11,0-6.9,4.76-12.15,11.75-12.15,7.84,0,11.62,6.58,11.17,13.66Zm10.28-4c-.57-3.21-2-4.9-5-4.9a5,5,0,0,0-5.25,4.9Z"/>
      <path :style="computedStyle" d="M786.79,191.69h6v3.21h.13a8.21,8.21,0,0,1,7-3.83c6.72,0,8.41,3.78,8.41,9.48V214.7h-6.32v-13c0-3.79-1.11-5.66-4-5.66-3.43,0-4.9,1.92-4.9,6.59V214.7h-6.32Z"/>
      <path :style="computedStyle" d="M820.3,191.69h4.63v4.23H820.3v11.39c0,2.14.54,2.67,2.68,2.67a9.89,9.89,0,0,0,1.95-.17v4.94a25.16,25.16,0,0,1-3.69.22c-3.87,0-7.26-.89-7.26-5.48V195.92h-3.82v-4.23H814v-6.9h6.32Z"/>
      <path class="cls-1" d="M72,77.78H42.36V50.66h91.88V77.78H104.6v78.7H72Z"/>
      <path class="cls-1" d="M139.31,50.66H228.5V77.78H171.91V91H228.5v25.2H171.91v13.19h56.6v27.12h-89.2Z"/>
      <path class="cls-1" d="M234,50.66h53.5c35.27,0,47.73,26.08,47.73,52.75,0,32.47-17.19,53.07-54.09,53.07H234Zm32.6,78.7h12.75c20.31,0,23.28-16.46,23.28-26.4,0-6.66-2.08-25.18-25.65-25.18H266.58Z"/>
      <path class="cls-1" d="M382.06,115.7l-9.95-16.49-9.69,16.49H338.53l22.68-33.35L339.37,50.46h23.9l8.84,15.76,9.11-15.76h23.89L383.28,82.35,406,115.7Z"/>
      <text :style="computedStyle" class="cls-2" transform="translate(419.92 156.3)">Schio</text>
    </svg>
  </n-link>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: "TEDLogo",
    methods: {
      ...mapMutations('application', ['SET_MENU_MOBILE_STATUS']),
    },
    computed: {
      computedStyle() {
        return { fill: this.color }
      }
    },
    props: {
      color: {
        type: String,
        default: '#ff2b06'
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SVG_Logo {
    max-width: 280px;
    height: auto;

    .cls-1 {
      fill: $ted-red;
    }
    .cls-2 {
      font-size:146.9px;font-family:Helvetica, Helvetica;
    }
  }

</style>
