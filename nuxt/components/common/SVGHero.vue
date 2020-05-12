<template>
  <section ref="SVG_container" class="SVG_container is-relative section is-medium red-bg over-hidden extra-p-mobile">
    <svg class="w-h-100 svg-down" ref="svg-down">
      <rect width="100%" height="100%" :fill="TEDxRed"/>
      <text
        fill="white"
        ref="the-title"
        x="10%"
        :y="yCoord"
        class="the-title">
        {{ title }}
      </text>
    </svg>

    <svg class="w-h-100 svg-up" ref="svg-up">
      <defs>
        <clipPath id="mask" ref="mask">
          <circle id="mask-circle" ref="mask-circle" cx="50%" cy="50%" r="8%" style="fill: #ffffff"/>
        </clipPath>
      </defs>
      <g clip-path="url(#mask)">
        <rect width="100%" height="100%" fill="white"/>
        <text
          x="10%"
          :y="yCoord"
          :fill="TEDxRed"
          class="the-title">
          {{ title }}
        </text>
      </g>
      <circle id="circle-shadow" cx="50%" cy="50%" r="8%" style="fill: transparent;" />
    </svg>
  </section>
</template>

<script>
  import { TEDxRed } from '@/assets/style/base/_vars.scss'

  export default {
    name: "SVGHero",
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    data: () => ({
      yCoord: 0,
      navHeight: document.querySelector('nav.navbar').clientHeight,
      svgPoint: null,
      TEDxRed
    }),
    /**
     * @description Move your mouse/finger over the image.
     * @author Noel Delgado | @pixelia_me
     * {@link https://codepen.io/noeldelgado/pen/ByxQjL}
     */
    mounted() {
      this.svgPoint = this.$refs['svg-down'].createSVGPoint()
      this.setTitleAlignment()

      window.addEventListener('mousemove', this.mousemoveHandler, false);
      document.addEventListener('touchmove', this.touchmoveHandler, false);
      window.addEventListener('click', this.clickHandler, false);
      window.addEventListener('resize', this.setTitleAlignment, false);
    },
    destroyed() {
      window.removeEventListener('mousemove', this.mousemoveHandler);
      document.removeEventListener('touchmove', this.touchmoveHandler);
      window.removeEventListener('click', this.clickHandler);
      window.removeEventListener('resize', this.setTitleAlignment);
    },
    methods: {
      cursorPoint(e, svg) {
        if(!svg) return

        this.svgPoint.x = e.clientX;
        this.svgPoint.y = e.clientY;
        return this.svgPoint.matrixTransform(svg.getScreenCTM().inverse());
      },
      update(svgCoords) {
        if(!this.$refs['mask-circle']) return

        this.$refs['mask-circle'].setAttribute('cx', svgCoords.x);
        this.$refs['mask-circle'].setAttribute('cy', svgCoords.y);
      },
      mousemoveHandler(event) {
        this.update(this.cursorPoint(event, this.$refs['svg-down']));
      },
      touchmoveHandler(e) {
        e.preventDefault();
        const touch = e.targetTouches.length && e.targetTouches[0];
        touch && this.update(this.cursorPoint(touch, this.$refs['svg-down']));
      },
      clickHandler(event) {
        const circle = this.$refs['mask-circle'].cloneNode();

        circle.setAttributeNS(null, 'cx', event.clientX);
        circle.setAttributeNS(null, 'cy', event.clientY - this.navHeight);
        this.$refs['mask'].appendChild(circle);
      },
      /**
       * @description SVG get text element width
       * half height PLUS because it's baseline.
       * @see https://stackoverflow.com/a/1637014
       */
      setTitleAlignment() {
        const { height } = this.$refs['the-title'].getBBox()
        this.yCoord = ((this.$refs['SVG_container'].clientHeight / 2) + (height / 2) - 10)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .SVG_container {
    .the-title {
      font-size: 5rem;
      text-transform: capitalize;

      @media all and (max-width: 768px) {
        font-size: 2rem;
      }
    }
    .svg-down,
    .svg-up {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
