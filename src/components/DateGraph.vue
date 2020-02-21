<template>
  <svg id="date-graph">
    <line class="date-line" v-for="(date, i) in dates" :x1="datesx[i] + graphx - offsetx" :y1="margin" :x2="datesx[i] + graphx - offsetx" :y2="margin + yaxish" :key="'date-line-' + i" />
    <text class="date" v-for="(sunday, i) in sundays" :x="datesx[firstSundayi + 7*i] + graphx - offsetx" :y="margin + yaxish + 10" v-text="sundaysName[i]" :key="'date-' + i" />
  </svg>
</template>

<script>
/* eslint-disable no-unused-vars, no-unused-labels */

import { SVG } from '@svgdotjs/svg.js'
import svgPath from '../scripts/svg.path.js'

const margin = 50;
const graphx = 100;
const graphy = 50;
const xaxisi = 29; // i = increment
const yaxish = 400;

const dates = [
  20200118,
  20200119,
  20200120,
  20200121,
  20200122,
  20200123,
  20200124,
  20200125,
  20200126,
  20200127,
  20200128,
  20200129,
  20200130,
  20200131,
  20200201,
  20200202,
  20200203,
  20200204,
  20200205,
  20200206,
  20200207,
  20200208,
  20200209,
  20200210,
  20200211,
  20200212,
  20200213,
  20200214,
  20200215,
  20200216,
  20200217,
  20200218,
  20200219,
  20200220,
  20200221,
  20200222,
  20200223
]

const firstSunday = 20200119;

export default {
  name: 'date-graph',
  data () {
    return {
      margin: margin,
      graphx: graphx,
      graphy: graphy,
      xaxisi: xaxisi, // i = increment
      yaxish: yaxish,
      mousex: null,
      offsetx: 0,
      isdragging: false,
      dates: dates
    }
  },
  computed: {
    datesx () {
      return this.dates.map((date, i) => {
        return i * xaxisi;
      })
    },
    firstSundayi () { 
      return dates.indexOf(firstSunday);
    },
    sundays () {
      return this.dates.filter((date, i) => i % 7 == this.firstSundayi);
    },
    sundaysName () {
      return this.sundays.map((date) => {
        return ((date - (~~(date/10000)*10000))/100).toFixed(2);
      })
    }
  },
  mounted () {
    const datagraph = document.querySelector('#date-graph');

    datagraph.addEventListener('mousedown', () => {
      this.isdragging = true;
      this.mousex = event.clientX;
    });

    const dragRange = this.datesx[this.datesx.length - 1] + graphx - datagraph.getBoundingClientRect().width + margin;

    datagraph.addEventListener('mousemove', (event) => {
      if (this.isdragging == true) {
        this.offsetx = Math.min(dragRange ,Math.max(0, this.offsetx + this.mousex - event.clientX));
        this.mousex = event.clientX;
      }
    });

    datagraph.addEventListener('mouseup', () => {
      this.isdragging = false;
    })

    datagraph.addEventListener('mouseleave', () => {
      this.isdragging = false;
    })
  },
}

// const svgDateGraph = SVG('#date-graph').size(100, 100);
</script>

<style lang="scss" scoped>
#date-graph {
  width: 100%;
  height: 600px;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  .date {
    fill: red;
    font-size: 12px;
    text-anchor: middle;
    dominant-baseline: hanging;
    pointer-events: none;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .date-line {
    stroke: #dcddde;
  }
}
</style>
