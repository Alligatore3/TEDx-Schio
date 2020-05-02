<template>
  <section class="SVG_container section">
    <svg class="w-h-100" ref="svg-down">
      <rect width="100%" height="100%" :fill="TEDxRed"/>
      <rect width="100%" height="100%" fill="transparent"/>
      <text ref="the-title" class="the-title">{{ title }}</text>
    </svg>

    <svg class="w-h-100" ref="svg-up">
      <defs>
        <clipPath id="mask" ref="mask">
          <circle id="mask-circle" ref="mask-circle" cx="50%" cy="50%" r="8%" style="fill: #ffffff"/>
        </clipPath>
      </defs>
      <g clip-path="url(#mask)">
        <rect width="100%" height="100%" fill="white"/>
        <text :fill="TEDxRed" class="the-title">{{ title }}</text>
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
    data: () => ({ svgPoint: null, TEDxRed }),
    mounted() {
      this.svgPoint = this.$refs['svg-down'].createSVGPoint()
      const meda = this.$refs['the-title'].getBBox();
      console.log(meda)

      window.addEventListener('mousemove', this.mousemoveHandler, false);
      document.addEventListener('touchmove', this.touchmoveHandler, false);
      window.addEventListener('click', this.clickHandler, false);
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
        circle.setAttributeNS(null, 'cy', event.clientY);
        this.$refs['mask'].appendChild(circle);
      }
    }
  }
  //
  //
  // /**
  //    * @function
  //    * @description Move your mouse/finger over the image.
  //    * @author Noel Delgado | @pixelia_me
  //    * {@link https://codepen.io/noeldelgado/pen/ByxQjL}
  //    */
  //   const SVGContainer = jQuery('#svg-singularity');
  //
  //   const is_homepage = () => svgElement && maskedElement && svgMask && SVGContainer.length;
  //
  //   if (!is_homepage()) return;
  //   const menuHeight = jQuery('#wrapper-navbar') && jQuery('#wrapper-navbar').innerHeight();
  //   const footerHeight = jQuery('#wrapper-footer') && jQuery('#wrapper-footer').innerHeight();
  //   /**
  //    * @function
  //    * @name setSVGContainerHeight
  //    * @description Setting SVG Height due to center-align text.
  //    */
  //
  //   const setSVGContainerHeight = () => SVGContainer.css('height', `${window.innerHeight - menuHeight - footerHeight}px`);
  //
  //   setSVGContainerHeight();
  //   window.addEventListener("resize", setSVGContainerHeight);
  // });
</script>

<style scoped>
.the-title {
  font-size: 3rem;
}
</style>
