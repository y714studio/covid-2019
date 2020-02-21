<template>
  <svg id="date-graph">
    <!-- Side Graph -->
    <text class="age" v-for="n in 5" :x="margin - offsetx - 15" :y="graphy + yaxish*0.2*(n - 1)" v-text="100 - (n - 1)*20" :key="'side-age-' + n" />
    <rect class="stripe" v-for="n in 5" :x="margin - offsetx" :y="graphy + yaxish*0.2*(n - 1)" :width="sidegraphw" :height="yaxish*0.1" :key="'side-stripe-' + n" />
    <line class="age-line" v-for="n in 5" :x1="margin - offsetx - 10" :y1="graphy + yaxish*0.2*(n - 1)" :x2="sidegraphw + margin - offsetx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'side-age-line-' + n" />
    <line class="x-axis" :x1="margin - offsetx" :y1="graphy + yaxish" :x2="sidegraphw + margin - offsetx" :y2="graphy + yaxish" />
    <template v-for="(patient, i) in cases" >
      <path class="case" v-if="patient.gender == 'male'" :d="drawDiamond(sideMalex - offsetx, (1-(patient.age/100))*yaxish + margin)" :fill="patient.origin.substring(0, 5) == 'local' ? '#e83d96' : '#1e52a4'" :key="'side-case-' + i" />
      <circle class="case" v-if="patient.gender == 'female'" :cx="sideFemalex - offsetx" :cy="(1-(patient.age/100))*yaxish + margin" :r="8" :fill="patient.origin.substring(0, 5) == 'local' ? '#e83d96' : '#1e52a4'" :key="'side-case-' + i" />
    </template>
    <text class="gender" :x="sideMalex - offsetx" :y="graphy + yaxish + 10" :key="'date-' + i">男</text>
    <text class="gender" :x="sideFemalex - offsetx" :y="graphy + yaxish + 10" :key="'date-' + i">女</text>

    <!-- Main Graph -->
    <text class="age" v-for="n in 5" :x="datesx[0] + graphx - offsetx - 15" :y="graphy + yaxish*0.2*(n - 1)" v-text="100 - (n - 1)*20" :key="'age-' + n" />
    <rect class="stripe" v-for="n in 5" :x="graphx - offsetx" :y="graphy + yaxish*0.2*(n - 1)" :width="graphw" :height="yaxish*0.1" :key="'stripe-' + n" />    
    <line class="age-line" v-for="n in 5" :x1="graphx - offsetx - 10" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-' + n" />
    <line class="x-axis" :x1="graphx - offsetx" :y1="graphy + yaxish" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish" />
    <line class="date-line" :class="{ 'first': i == 0 }" v-for="(date, i) in dates" :x1="datesx[i] + graphx - offsetx" :y1="margin" :x2="datesx[i] + graphx - offsetx" :y2="graphy + yaxish" :key="'date-line-' + i" />
    <text class="date" v-for="(sunday, i) in sundays" :x="datesx[firstSundayi + 7*i] + graphx - offsetx" :y="graphy + yaxish + 10" v-text="sundaysName[i]" :key="'date-' + i" />
    <path class="case" v-for="(patient, i) in cases" :d="drawPath(patient.gender, datesxIndex[patient.start] + graphx - offsetx, datesxIndex[patient.confirmed] + graphx - offsetx, (1-(patient.age/100))*yaxish + margin)" :fill="patient.origin.substring(0, 5) == 'local' ? '#e83d96' : '#1e52a4'" :key="'case-' + i" />
  </svg>
</template>

<script>
/* eslint-disable no-unused-vars, no-unused-labels */

import { SVG } from '@svgdotjs/svg.js'
import svgPath from '../scripts/svg.path.js'

const margin = 50;
const graphx = 250;
const graphy = 50;
const xaxisi = 29; // i = increment
const yaxish = 480;
const sidegraphw = 150;
const sideMalex = 100;
const sideFemalex = 150;

const dates = [
  20200117,
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

const cases = [
  {
    caseNo: 1,
    confirmed: 20200123,
    start: 20200121,
    gender: 'male',
    age: 39,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 2,
    confirmed: 20200123,
    start: 20200118,
    gender: 'male',
    age: 56,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign'
  },
  {
    caseNo: 3,
    confirmed: 20200124,
    start: 20200120,
    gender: 'female',
    age: 62,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 4,
    confirmed: 20200124,
    start: 20200123,
    gender: 'female',
    age: 62,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 5,
    confirmed: 20200124,
    start: 20200124,
    gender: 'male',
    age: 63,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 6,
    confirmed: 20200126,
    start: 20200121,
    gender: 'male',
    age: 47,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign'
  },
  {
    caseNo: 7,
    confirmed: 20200126,
    start: 20200121,
    gender: 'female',
    age: 68,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign'
  },
  {
    caseNo: 8,
    confirmed: 20200126,
    start: 20200125,
    gender: 'male',
    age: 64,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 9,
    confirmed: 20200129,
    start: 20200125,
    gender: 'female',
    age: 73,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 10,
    confirmed: 20200129,
    start: 20200125,
    gender: 'male',
    age: 72,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'foreign'
  },
  {
    caseNo: 11,
    confirmed: 20200130,
    start: 20200128,
    gender: 'female',
    age: 37,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign/contact'
  },
  {
    caseNo: 12,
    confirmed: 20200130,
    start: 20200122,
    gender: 'male',
    age: 75,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible'
  },
  {
    caseNo: 13,
    confirmed: 20200131,
    start: 20200129,
    gender: 'male',
    age: 39,
    hospital: 'PMH',
    status: 'dead',
    resident: 'HKR',
    origin: 'foreign'
  },
  {
    caseNo: 14,
    confirmed: 20200201,
    start: 20200123,
    gender: 'male',
    age: 80,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible'
  },
  {
    caseNo: 15,
    confirmed: 20200202,
    start: 20200201,
    gender: 'female',
    age: 72,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign/contact'
  },
  {
    caseNo: 16,
    confirmed: 20200204,
    start: 20200123,
    gender: 'female',
    age: 64,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 17,
    confirmed: 20200204,
    start: 20200122,
    gender: 'male',
    age: 60,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 18,
    confirmed: 20200204,
    start: 20200128,
    gender: 'male',
    age: 25,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 19,
    confirmed: 20200205,
    start: 20200130,
    gender: 'female',
    age: 28,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 20,
    confirmed: 20200205,
    start: 20200204,
    gender: 'female',
    age: 56,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 21,
    confirmed: 20200205,
    start: 20200130,
    gender: 'male',
    age: 56,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible'
  },
  {
    caseNo: 22,
    confirmed: 20200206,
    start: 20200201,
    gender: 'female',
    age: 55,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 23,
    confirmed: 20200206,
    start: 20200126,
    gender: 'female',
    age: 63,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 24,
    confirmed: 20200206,
    start: 20200128,
    gender: 'female',
    age: 65,
    hospital: 'PWH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 25,
    confirmed: 20200207,
    start: 20200204,
    gender: 'male',
    age: 58,
    hospital: 'NDH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign'
  },
  {
    caseNo: 26,
    confirmed: 20200207,
    start: 20200203,
    gender: 'male',
    age: 42,
    hospital: 'PWH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign'
  },
  {
    caseNo: 27,
    confirmed: 20200209,
    start: 20200130,
    gender: 'male',
    age: 24,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible'
  },
  {
    caseNo: 28,
    confirmed: 20200209,
    start: 20200130,
    gender: 'male',
    age: 70,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 29,
    confirmed: 20200209,
    start: 20200201,
    gender: 'female',
    age: 91,
    hospital: 'PYN' ,
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 30,
    confirmed: 20200209,
    start: 20200129,
    gender: 'male',
    age: 68,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 31,
    confirmed: 20200209,
    start: 20200128,
    gender: 'female',
    age: 57,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 32,
    confirmed: 20200209,
    start: 20200204,
    gender: 'male',
    age: 22,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 33,
    confirmed: 20200209,
    start: 20200202,
    gender: 'female',
    age: 50,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 34,
    confirmed: 20200209,
    start: 20200130,
    gender: 'female',
    age: 25,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 35,
    confirmed: 20200209,
    start: 20200204,
    gender: 'female',
    age: 51,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 36,
    confirmed: 20200209,
    start: 20200207,
    gender: 'male',
    age: 23,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 41,
    confirmed: 20200210,
    start: 20200208,
    gender: 'male',
    age: 52,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 37,
    confirmed: 20200210,
    start: 20200130,
    gender: 'female',
    age: 55,
    hospital: 'PWH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 42,
    confirmed: 20200210,
    start: 20200203,
    gender: 'female',
    age: 62,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 39,
    confirmed: 20200210,
    start: 20200130,
    gender: 'female',
    age: 63,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 38,
    confirmed: 20200210,
    start: 20200130,
    gender: 'male',
    age: 69,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 40,
    confirmed: 20200210,
    start: 20200128,
    gender: 'female',
    age: 86,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 48,
    confirmed: 20200211,
    start: 20200202,
    gender: 'female',
    age: 37,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 49,
    confirmed: 20200211,
    start: 20200130,
    gender: 'male',
    age: 37,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 43,
    confirmed: 20200211,
    start: 20200202,
    gender: 'male',
    age: 59,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 44,
    confirmed: 20200211,
    start: 20200201,
    gender: 'female',
    age: 60,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 47,
    confirmed: 20200211,
    start: 20200131,
    gender: 'male',
    age: 66,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 45,
    confirmed: 20200211,
    start: 20200205,
    gender: 'male',
    age: 71,
    hospital: 'TKO',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 46,
    confirmed: 20200211,
    start: 20200203,
    gender: 'male',
    age: 75,
    hospital: 'QMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 50,
    confirmed: 20200212,
    start: 20200203,
    gender: 'male',
    age:  51,
    hospital: 'QEH'   ,
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 51,
    confirmed: 20200213,
    start: 20200129,
    gender: 'male',
    age: 43,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 52,
    confirmed: 20200213,
    start: 20200131,
    gender: 'female',
    age: 67,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 53,
    confirmed: 20200213,
    start: 20200208,
    gender: 'male',
    age: 37,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 54,
    confirmed: 20200214,
    start: 20200203,
    gender: 'female',
    age: 41,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 55,
    confirmed: 20200214,
    start: 20200202,
    gender: 'male',
    age: 70,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible'
  },
  {
    caseNo: 56,
    confirmed: 20200214,
    start: 20200212,
    gender: 'female',
    age: 61,
    hospital: 'QMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 57,
    confirmed: 20200216,
    start: 20200207,
    gender: 'male',
    age: 54,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 58,
    confirmed: 20200217,
    start: 20200208,
    gender: 'male',
    age: 69,
    hospital: 'CMC',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 59,
    confirmed: 20200217,
    start: 20200212,
    gender: 'male',
    age: 45,
    hospital: 'QEH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 60,
    confirmed: 20200217,
    start: 20200208,
    gender: 'female',
    age: 46,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 61,
    confirmed: 20200218,
    start: 20200202,
    gender: 'female',
    age: 32,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'local/contact'
  },
  {
    caseNo: 62,
    confirmed: 20200218,
    start: 20200211,
    gender: 'male',
    age: 58,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'foreign/contact'
  },
  {
    caseNo: 63,
    confirmed: 20200219,
    start: 20200214,
    gender: 'female',
    age: 83,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible/contact'
  },
  {
    caseNo: 64,
    confirmed: 20200219,
    start: 20200212,
    gender: 'male',
    age: 68,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 65,
    confirmed: 20200219,
    start: 20200212,
    gender: 'female',
    age: 70,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/contact'
  },
  {
    caseNo: 66,
    confirmed: 20200220,
    start: 20200125,
    gender: 'male',
    age: 75,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/possible'
  },
  {
    caseNo: 67,
    confirmed: 20200220,
    start: 20200210,
    gender: 'female',
    age: 38,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 68,
    confirmed: 20200220,
    start: 20200208,
    gender: 'male',
    age: 58,
    hospital: 'NDH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  },
  {
    caseNo: 69,
    confirmed: 20200220,
    start: 20200218,
    gender: 'male',
    age: 48,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local/unknown'
  }
];

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
      sidegraphw: sidegraphw,
      mousex: null,
      offsetx: 0,
      sideMalex: sideMalex,
      sideFemalex: sideFemalex,
      isdragging: false,
      dates: dates,
      cases: cases
    }
  },
  computed: {
    datesx () {
      return this.dates.map((date, i) => {
        return i * xaxisi;
      })
    },
    datesxIndex () {
      let map = {};

      for (let i = 0; i < dates.length; i++) {
        map[this.dates[i]] = this.datesx[i];
      }

      return map;
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
    },
    graphw () { // graph width
      return this.datesx[this.datesx.length - 1];
    }
  },
  mounted () {
    const datagraph = document.querySelector('#date-graph');

    datagraph.addEventListener('mousedown', () => {
      this.isdragging = true;
      this.mousex = event.clientX;
    });

    const dragRange = this.graphw + graphx - datagraph.getBoundingClientRect().width + margin;

    datagraph.addEventListener('mousemove', (event) => {
      if (this.isdragging == true) {
        this.offsetx = Math.min(dragRange ,Math.max(0, this.offsetx + this.mousex - event.clientX));
        this.mousex = event.clientX;
      }
    });

    datagraph.addEventListener('mouseup', () => {
      this.isdragging = false;
    });

    datagraph.addEventListener('mouseleave', () => {
      this.isdragging = false;
    });
  },
  methods: {
    drawPath (gender, startx, endx, y) {
      if (gender == 'male') {
        return (
          'M ' + startx + ' ' + (y - 1.5) + ' ' +
          'H ' + (endx - 9) + ' ' +
          'L ' + (endx ) + ' ' + (y - 10) + ' ' +
          'L ' + (endx + 10) + ' ' + y + ' ' +
          'L ' + (endx ) + ' ' + (y + 10) + ' ' +
          'L ' + (endx - 9) + ' ' + (y + 1.5) + ' ' +
          'H ' + startx + ' ' +
          'Z' 
        );
      } else {
        return (
          'M ' + startx + ' ' + (y - 1.5) + ' ' +
          'H ' + (endx - 8) + ' ' +
          'A 8 8 0 1 1 ' + (endx - 8) + ' ' + (y + 1.5) + ' ' +
          'H ' + startx + ' ' +
          'Z' 
        );
      }
    },
    drawDiamond (x, y) {
      return (
        'M ' + (x - 10) + ' ' + y + ' ' +
        'L ' + x + ' ' + (y - 10) + ' ' +
        'L ' + (x + 10) + ' ' + y + ' ' +
        'L ' + x + ' ' + (y + 10) + ' ' +
        'Z'
      );
    }
  }
}

// const svgDateGraph = SVG('#date-graph').size(100, 100);
</script>

<style lang="scss" scoped>
#date-graph {
  width: 100%;
  height: 580px;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  .stripe {
    fill: #8f8f8c;
    opacity: 0.1;
  }

  .x-axis {
    stroke: #8f8f8c;
    opacity: 0.75;
  }

  .age,
  .date,
  .gender {
    font-size: 12px;
    pointer-events: none;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .age {
    fill: #8f8f8c;
    text-anchor: end;
    dominant-baseline: middle;
  }

  .date {
    fill: red;
    text-anchor: middle;
    dominant-baseline: hanging;
  }

  .gender {
    fill: #8f8f8c;
    text-anchor: middle;
    dominant-baseline: hanging;
  }

  .date-line,
  .age-line {
    stroke: #dcddde;
    opacity: 0.75;
  }

  .date-line.first {
    display: none;
  }

  .case {
    opacity: 0.75;
    mix-blend-mode: multiply;
  }
}
</style>
