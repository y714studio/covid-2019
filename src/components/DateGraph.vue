<template>
  <div>
    <div>
      <div class="row align-items-end">
        <div class="col-lg-3 col-xl-2 pl-0">
          <svg id="date-side-graph" class="hide">
            <!-- Side Graph -->
            <template v-if="!isMobile">
              <!-- Side Graph -->
              <text class="age" v-for="n in 5" :x="sidegraphx - 15" :y="graphy + yaxish*0.2*(n - 1)" v-text="100 - (n - 1)*20" :key="'side-age-' + n" />
              <rect class="stripe" v-for="n in 5" :x="sidegraphx" :y="graphy + yaxish*0.2*(n - 1)" :width="sidegraphw" :height="yaxish*0.1" :key="'side-stripe-' + n" />
              <line class="age-line" v-for="n in 5" :x1="sidegraphx - 10" :y1="graphy + yaxish*0.2*(n - 1)" :x2="sidegraphw + 35" :y2="graphy + yaxish*0.2*(n - 1)" :key="'side-age-line-' + n" />
              <line class="x-axis" :x1="sidegraphx" :y1="graphy + yaxish" :x2="sidegraphx + sidegraphw" :y2="graphy + yaxish" />
              <template v-for="(patient, i) in cases" >
                <path class="case" :class="patient.origin" v-if="patient.gender == 'male'" :d="drawDiamond(sideMalex, (1-(patient.age/100))*yaxish + margin)" :key="'side-case-' + i" />
                <circle class="case" :class="patient.origin" v-if="patient.gender == 'female'" :cx="sideFemalex" :cy="(1-(patient.age/100))*yaxish + margin" :r="8" :key="'side-case-' + i" />
              </template>
              <text class="gender" :x="sideMalex" :y="graphy + yaxish + 10">男性</text>
              <text class="gender" :x="sideFemalex" :y="graphy + yaxish + 10">女性</text>
            </template>
          </svg>
        </div>
        <div class="col-lg-9 col-xl-10 pl-0">
          <svg id="date-graph" class="hide">
            <!-- Main Graph -->
            <template v-if="!isMobile">
              <rect class="stripe" v-for="n in 5" :x="graphx - offsetx" :y="graphy + yaxish*0.2*(n - 1)" :width="Math.max(graphw, 0)" :height="yaxish*0.1" :key="'stripe-' + n" />  
              <line class="age-line" v-for="n in 5" :x1="graphx - offsetx" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-' + n" />
              <line class="x-axis" :x1="graphx - offsetx" :y1="graphy + yaxish" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish" />
              <line class="date-line" :class="{ 'first': i == 0 }" v-for="(date, i) in dates" :x1="datesx[i] + graphx - offsetx" :y1="margin" :x2="datesx[i] + graphx - offsetx" :y2="graphy + yaxish" :key="'date-line-' + i" />
              <text class="date sunday" v-for="(sunday, i) in sundays" :x="(datesx[firstSundayi + 7*i] + graphx - offsetx) || 0" :y="graphy + yaxish + 10" v-text="sundaysName[i]" :key="'date-' + i" />
              <path class="case" :class="patient.origin" v-for="(patient, i) in cases" :d="drawPath(patient.gender, datesxIndex[patient.start] + graphx - offsetx, datesxIndex[patient.confirmed] + graphx - offsetx, (1-(patient.age/100))*yaxish + margin)" :key="'case-' + i" />
              <rect class="side-bg" :x="0" :y="0" :width="graphx" :height="margin + yaxish + margin" />
              <text class="age" v-for="n in 5" :x="(datesx[0] + graphx - 15) || 0" :y="graphy + yaxish*0.2*(n - 1)" v-text="100 - (n - 1)*20" :key="'age-' + n" />
              <line class="age-line" v-for="n in 5" :x1="graphx - 10" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-y-axis-' + n" />
              <rect class="button-frame" :x="graphx" :y="margin - 35" :width="35" :height="20" />
              <text class="fit-graph" :x="graphx + 3" :y="margin - 20" v-on:click="fitGraph">縮小</text>
              <rect class="button-frame" :x="graphx + 45" :y="margin - 35" :width="35" :height="20" />
              <text class="expand-graph" :x="graphx + 48" :y="margin - 20" v-on:click="expandGraph">放大</text>
            </template>
          </svg>
        </div>
      </div>
    </div>
    <div id="date-legends" class="d-none d-lg-block">
      <div class="row align-items-end">
        <div class="col-lg-3 offset-xl-2">
          <svg class="tall">
            <!-- <path class="case grey" d="M16,38H198l9-8.5,10,10-10,10L198,41H16Z"/> -->
            <path class="case grey" d="M 21,38 H 125 l 9-8.5,10,10-10,10 L125,41 H21 Z"/>
            <line class="date-line" x1="21.5" y1="19" x2="21.5" y2="41"/>
            <line class="date-line" x1="134" y1="19" x2="134" y2="30"/>
            <text class="legend-text" x="5" y="11.21">發病日</text>
            <text class="legend-text" x="115" y="11.21">確診日</text>
          </svg>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 offset-xl-2">
          <svg class="short">
            <path class="case grey" d="M21,9h12l9-8.5l10,10l-10,10L33,12H21V9z"/>
            <path class="case grey" d="M80.5,9.2H95c0.9-4.5,5.2-7.4,9.6-6.5c4.5,0.9,7.4,5.2,6.5,9.6s-5.2,7.4-9.6,6.5c-3.3-0.6-5.9-3.2-6.5-6.5H80.5V9.2z"/>
            <text class="legend-text" x="55.76" y="15.21">男</text>
            <text class="legend-text" x="115.76" y="15.21">女</text>
          </svg>
        </div>
        <div class="col-lg-6 offset-lg-3 col-xl-4 offset-xl-2">
          <svg class="short">
            <path class="case imported" d="M17,9h12l9-8.5l10,10l-10,10L29,12H17V9z"/>
            <path class="case imported-contact" d="M124,9h12l9-8.5l10,10l-10,10l-9-8.5h-12V9z"/>
            <text class="legend-text" x="51.76" y="14.21">輸入個案</text>            
            <text class="legend-text" x="159.76" y="14.21">輸入個案的密切接觸者</text>
          </svg>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-xl-5 offset-xl-2">
          <svg class="short">
            <path class="case local-possible" d="M22,9H34L43,.5l10,10-10,10L34,12H22Z"/>
            <path class="case local-possible-contact" d="M153,9h12l9-8.5,10,10-10,10L165,12H153Z"/>
            <text class="legend-text" x="56.76" y="14.21">可能本地個案</text>
            <text class="legend-text" x="188.76" y="14.21">可能本地個案的密切接觸者</text>
          </svg>
        </div>
        <div class="col-lg-6 col-xl-5">
          <svg class="short">
            <path class="case local-unknown" d="M17,9H29L38,.5l10,10-10,10L29,12H17Z"/>
            <path class="case local-contact" d="M185,9h12l9-8.5,10,10-10,10L197,12H185Z"/>
            <text class="legend-text" x="51.76" y="14.21">本地個案(源頭不明)</text>            
            <text class="legend-text" x="220.76" y="14.21">本地個案的密切接觸者</text></svg>
        </div>
      </div>
    </div>
    <div id="date-legends-mobile" class="d-lg-none">
      <div class="row align-items-start">
        <div class="col-2">
          <svg class="wide">
            <!-- <path class="case grey" d="M 5,5 H 20 V 140 Z"/> -->
            <path class="case grey" d="M 5,7 H 7 V 130 L 12 135.5 L 6 141.5 L 0.5 135.5 L 5 130 Z"/>
            <line class="date-line" x1="5" y1="7" x2="20" y2="7"/>
            <line class="date-line" x1="5" y1="135.5" x2="20" y2="135.5"/>
            <text class="legend-text" x="25" y="7">發病日</text>
            <text class="legend-text" x="25" y="135.5">確診日</text>
          </svg>
        </div>
        <div class="col-10">
          <svg class="short">
            <path class="case grey" d="M 5,7 H 7 V 15 L 12 20.5 L 6 26.5 L 0.5 20.5 L 5 15 Z"/>
            <path class="case grey" d="M 55,7 H 57 V 16 A 5 5 0 1 1 55 16 Z"/>
            <!-- <path class="case grey" d="M75.5,9.2H90c0.9-4.5,5.2-7.4,9.6-6.5c4.5,0.9,7.4,5.2,6.5,9.6s-5.2,7.4-9.6,6.5c-3.3-0.6-5.9-3.2-6.5-6.5H75.5V9.2z"/> -->
            <text class="legend-text" x="15" y="18">男</text>
            <text class="legend-text" x="65" y="18">女</text>
          </svg>
          <svg class="short">
            <path class="case imported-contact" d="M 5,7 H 7 V 15 L 12 20.5 L 6 26.5 L 0.5 20.5 L 5 15 Z"/>
            <path class="case imported" d="M 85,7 H 87 V 15 L 92 20.5 L 86 26.5 L 80.5 20.5 L 85 15 Z"/>
            <text class="legend-text" x="15" y="18">輸入個案</text>            
            <text class="legend-text" x="96" y="18">輸入個案的密切接觸者</text>
          </svg>
          <svg class="short">
            <path class="case local-possible" d="M 5,7 H 7 V 15 L 12 20.5 L 6 26.5 L 0.5 20.5 L 5 15 Z"/>
            <path class="case local-possible-contact" d="M 105,7 H 107 V 15 L 112 20.5 L 106 26.5 L 100.5 20.5 L 105 15 Z"/>
            <text class="legend-text" x="15" y="18">可能本地個案</text>
            <text class="legend-text" x="116" y="18">可能本地個案的密切接觸者</text>
          </svg>
          <svg class="short">
            <path class="case local-unknown" d="M 5,7 H 7 V 15 L 12 20.5 L 6 26.5 L 0.5 20.5 L 5 15 Z"/>
            <path class="case local-contact" d="M 135,7 H 137 V 15 L 142 20.5 L 136 26.5 L 130.5 20.5 L 135 15 Z"/>
            <text class="legend-text" x="15" y="18">本地個案(源頭不明)</text>            
            <text class="legend-text" x="146" y="18">本地個案的密切接觸者</text></svg>
        </div>
      </div>
    </div>
    <svg id="date-graph-mobile">
      <template v-if="isMobile">
        <!-- Mobile Top Graph -->
        <text class="age" v-for="n in 6" :x="mgraphx + mxaxisw*0.2*(n - 1)" :y="mtopgraphy - 15" v-text="(n - 1)*20" :key="'m-side-age-' + n" />
        <rect class="stripe" v-for="n in 5" :x="mgraphx + mxaxisw*(0.1 + 0.2*(n - 1))" :y="mtopgraphy" :width="mxaxisw * 0.1" :height="mtopgraphh" :key="'m-side-stripe-' + n" />
        <line class="age-line" v-for="n in 5" :x1="mgraphx + mxaxisw*0.2*n" :y1="mtopgraphy - 10" :x2="mgraphx + mxaxisw*0.2*n" :y2="mtopgraphy +mtopgraphh" :key="'m-side-age-line-' + n" />
        <line class="y-axis" :x1="mgraphx" :y1="mtopgraphy - 10" :x2="mgraphx" :y2="mtopgraphy + mtopgraphh" />
        <line class="x-axis" :x1="mgraphx" :y1="mtopgraphy" :x2="mgraphx + mxaxisw" :y2="mtopgraphy" />
        <template v-for="(patient, i) in cases" >
          <path class="case" :class="patient.origin" v-if="patient.gender == 'male'" :d="drawMobileDiamond((patient.age/100)*mxaxisw + mgraphx, mtopMaley)" :key="'m-side-case-' + i" />
          <circle class="case" :class="patient.origin" v-if="patient.gender == 'female'" :cx="(patient.age/100)*mxaxisw + mgraphx" :cy="mtopFemaley" :r="5" :key="'m-side-case-' + i" />
        </template>
        <text class="gender" :x="mgraphx - 10" :y="mtopMaley">男性</text>
        <text class="gender" :x="mgraphx - 10" :y="mtopFemaley">女性</text>

        <!-- Mobile Main Graph -->
        <rect class="stripe" v-for="n in 5" :x="mgraphx + mxaxisw*(0.1 + 0.2*(n - 1))" :y="mgraphy" :width="mxaxisw * 0.1" :height="mgraphh" :key="'m-stripe-' + n" /> 
        <line class="age-line" v-for="n in 5" :x1="mgraphx + mxaxisw*0.2*n" :y1="mgraphy - 10" :x2="mgraphx + mxaxisw*0.2*n" :y2="mgraphy + mgraphh" :key="'m-age-line-' + n" />
        <line class="y-axis" :x1="mgraphx" :y1="mgraphy - 10" :x2="mgraphx" :y2="mgraphy + mgraphh" />
        <line class="date-line" v-for="(date, i) in dates" :x1="mgraphx" :y1="mdatesy[i] + mgraphy" :x2="mgraphx + mxaxisw" :y2="mdatesy[i] + mgraphy" :key="'m-date-line-' + i" />
        <text class="date" :class="{ sunday: i % 7 == firstSundayi }" v-for="(date, i) in dates" :x="mgraphx - 10" :y="mdatesy[i] + mgraphy" v-text="datesName[i]" :key="'m-date-' + i" />
        <path class="case" :class="patient.origin" v-for="(patient, i) in cases" :d="drawMobilePath(patient.gender, (patient.age/100)*mxaxisw + mgraphx, mdatesyIndex[patient.start] + mgraphy, mdatesyIndex[patient.confirmed] + mgraphy)" :key="'m-case-' + i" />
        <text class="age" v-for="n in 6" :x="mgraphx + mxaxisw*0.2*(n - 1)" :y="mgraphy - 20" v-text="(n - 1)*20" :key="'m-age-' + n" />
      </template>
    </svg>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars, no-unused-labels */

import { SVG } from '@svgdotjs/svg.js'
import svgPath from '../scripts/svg.path.js'
import { firstSunday } from '../data/cases.js'

const margin = 50;
const graphx = 36;
const graphy = 50;
const xaxisi = 29; // i = increment
const yaxish = 480;
const sidegraphx = 36;
const sidegraphw = 145;
const sideMalex = 80;
const sideFemalex = 135;

const mmargin = 25;
const mtopgraphy = mmargin;
const mtopgraphh = 85;
const mtopMaley = 53;
const mtopFemaley = 81;
const mgraphx = mmargin + 15;
const mgraphy = mmargin + mtopgraphh + mmargin + mmargin;
const myaxisi = 29; // i = increment


const translations = {
  '男': 'male',
  '女': 'female',
  '住院': 'hospitalized',
  '出院': 'outpatient',
  '死亡': 'dead',
  '香港居民': 'HKR',
  '非香港居民': 'NHKR',
  '輸入個案': 'imported',
  '輸入個案的密切接觸者': 'imported-contact',
  '本地個案': 'local-unknown',
  '本地個案的密切接觸者': 'local-contact',
  '可能本地個案': 'local-possible',
  '可能本地個案的密切接觸者': 'local-possible-contact'
};

export default {
  name: 'date-graph',
  props: ['rawCases', 'rawDates'],
  data () {
    return {
      margin: margin,
      graphx: graphx,
      graphy: graphy,
      xaxisi: xaxisi,
      yaxish: yaxish,
      sidegraphx: sidegraphx,
      sidegraphw: sidegraphw,
      sideMalex: sideMalex,
      sideFemalex: sideFemalex,

      mmargin: mmargin,
      mgraphx: mgraphx,
      mgraphy: mgraphy,
      myaxisi: myaxisi,
      mtopgraphy: mtopgraphy,
      mtopgraphh: mtopgraphh,
      mtopMaley: mtopMaley,
      mtopFemaley: mtopFemaley,
      mxaxisw: 0,

      dategraph: document.querySelector('#date-graph'),
      dategraphMobile: document.querySelector('#date-graph-mobile'),
      expandIntervalId: 0,
      fitIntervalId: 0,
      dragRange: 0,
      fitxaxisi: 0,
      graphvp: 0,
      mousex: 0,
      offsetx: 0,
      isdragging: false,
      isMobile: false,
      isExpanded: false
    }
  },
  computed: {
    datesx () {
      if (typeof this.dates[0] == 'undefined') {
        return [];
      }

      return this.dates.map((date, i) => {
        return i * this.xaxisi;
      })
    },
    mdatesy () {
      return this.dates.map((date, i) => {
        return i * this.myaxisi;
      })
    },
    datesxIndex () {
      let map = {};

      for (let i = 0; i < this.dates.length; i++) {
        map[this.dates[i]] = this.datesx[i];
      }

      return map;
    },
    mdatesyIndex () {
      let map = {};

      for (let i = 0; i < this.dates.length; i++) {
        map[this.dates[i]] = this.mdatesy[i];
      }

      return map;
    },
    datesName () {
      return this.dates.map((date) => {
        return ((date - (~~(date/10000)*10000))/100).toFixed(2);
      })
    },
    firstSundayi () { 
      return this.dates.indexOf(firstSunday);
    },
    sundays () {
      return this.dates.filter((date, i) => i % 7 == this.firstSundayi);
    },
    sundaysName () {
      return this.datesName.filter((date, i) => i % 7 == this.firstSundayi);
    },
    graphw () { // graph width
      if (typeof this.datesx[0] == 'undefined') {
        return 0;
      }

      return this.datesx[this.datesx.length - 1];
    },
    mgraphh () { // graph width
      return this.mdatesy[this.datesx.length - 1];
    },
    cases () {
      return this.rawCases.map(function(patient){
        return {
          caseNo: parseInt(patient[0]),
          confirmed: parseInt(patient[1].split('/').reverse().join('')),
          start: parseInt(patient[2].split('/').reverse().join('')),
          gender: translations[patient[3]],
          age: patient[4],
          hospital: patient[5],
          status: translations[patient[6]],
          resident: translations[patient[7]],
          origin: translations[patient[8]]
        }
      });
    },
    dates () {
      return this.rawDates.map(function(date, i){
        return parseInt(date[0].split('/').reverse().join(''));
      });
    }
  },
  watch: {
    dates () {
      this.calFitxaxisi();
      this.calDragRange();
      this.calOffsetx();
      this.intro();
    }
  },
  mounted () {
    this.dategraph = document.querySelector('#date-graph');
    this.datesidegraph = document.querySelector('#date-side-graph');
    this.dategraphMobile = document.querySelector('#date-graph-mobile');

    /* dragging */

    const dragStart = () => {
      this.isdragging = true;
      this.mousex = (event.clientX || event.touches[0].clientX);
    };

    this.dategraph.addEventListener('mousedown', dragStart);
    this.dategraph.addEventListener('touchstart', dragStart);

    const dragMove = (event) => {
      if (this.isdragging == true) {
        this.offsetx = Math.min(this.dragRange, Math.max(0, this.offsetx + this.mousex - (event.clientX || event.touches[0].clientX)));
        this.mousex = (event.clientX || event.touches[0].clientX);
      }
    };

    this.dategraph.addEventListener('mousemove', dragMove);
    this.dategraph.addEventListener('touchmove', dragMove);

    const dragEnd = () => {
      this.isdragging = false;
    };

    this.dategraph.addEventListener('mouseup', dragEnd);
    this.dategraph.addEventListener('mouseleave', dragEnd);
    this.dategraph.addEventListener('touchend', dragEnd);

    /* mobile or desktop mode */

    const ifMobile = () => {
      this.isMobile = window.innerWidth < 992;
    }

    ifMobile();
    window.addEventListener('resize', ifMobile);

    /* fit interval calculation */

    const calGraphvp = () => { // graph viewport
      if (this.isMobile) {
        return true;
      }

      this.graphvp = this.dategraph.getBoundingClientRect().width - graphx - margin;
    };

    calGraphvp();
    window.addEventListener('resize', calGraphvp);

    /* fitxaxisi calculation */

    window.addEventListener('resize', this.calFitxaxisi);

    /* dragging range calculation */

    window.addEventListener('resize', this.calDragRange);

    /* offsetx calculation */

    window.addEventListener('resize', this.calOffsetx);

    /* side graph position calulation */

    const calSidegraphPos = () => {
      this.sidegraphw = this.datesidegraph.getBoundingClientRect().width - this.sidegraphx;
      this.sideMalex = this.sidegraphx + this.sidegraphw * 0.33;
      this.sideFemalex = this.sidegraphx + this.sidegraphw * 0.66;
    }

    calSidegraphPos();
    window.addEventListener('resize', calSidegraphPos);

    /* intro animation */

    this.xaxisi = this.fitxaxisi;
    window.addEventListener('scroll', this.intro);
    window.setTimeout(this.intro, 1000);

    /* mobile graph width */

    const fitmxaxisw = () => {
      this.mxaxisw = Math.max(0, this.dategraphMobile.getBoundingClientRect().width - this.mgraphx - 15);
    }

    fitmxaxisw();
    window.addEventListener('resize', fitmxaxisw);

    /* mobile svg height */

    const setMobileSvgh = () => {
      this.dategraphMobile.style.height = this.mgraphy + this.mgraphh + this.mmargin + 'px';
    }

    setMobileSvgh();
    window.addEventListener('resize', setMobileSvgh);
  },
  methods: {
    intro () {
      if (
        this.dategraph.getBoundingClientRect().top < window.innerHeight/2 &&
        this.dates[0]
      ) {
        this.dategraph.classList.remove('hide');
        this.datesidegraph.classList.remove('hide');
        window.setTimeout(this.expandGraph, 1000);
        window.removeEventListener('scroll', this.intro); 
      }
    },
    processCases (cases) {
      return cases.map(function(patient, i){
        return {
          caseNo: parseInt(patient[0]),
          confirmed: parseInt(patient[1].split('/').reverse().join('')),
          start: parseInt(patient[2].split('/').reverse().join('')),
          gender: translations[patient[3]],
          age: patient[4],
          hospital: patient[5],
          status: translations[patient[6]],
          resident: translations[patient[7]],
          origin: translations[patient[8]]
        }
      });
    },
    drawPath (gender, startx, endx, y) {
      if (!(gender && startx && endx && y)) {
        return '';
      }

      if (gender == 'male') {
        if (startx == endx) {
          return (
            'M ' + (endx - 9) + ' ' + (y - 1.5) + ' ' +
            'L ' + (endx ) + ' ' + (y - 10) + ' ' +
            'L ' + (endx + 10) + ' ' + y + ' ' +
            'L ' + (endx ) + ' ' + (y + 10) + ' ' +
            'L ' + (endx - 9) + ' ' + (y + 1.5) + ' ' +
            'Z' 
          )
        }

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
        if (startx == endx) {
          return (
            'M ' + (endx - 8) + ' ' + (y - 1.5) + ' ' +
            'A 8 8 0 1 1 ' + (endx - 8) + ' ' + (y + 1.5) + ' ' +
            'Z' 
          )
        }

        return (
          'M ' + startx + ' ' + (y - 1.5) + ' ' +
          'H ' + (endx - 8) + ' ' +
          'A 8 8 0 1 1 ' + (endx - 8) + ' ' + (y + 1.5) + ' ' +
          'H ' + startx + ' ' +
          'Z' 
        );
      }
    },
    drawMobilePath (gender, x, starty, endy) {
      if (!(gender && x && starty && endy)) {
        return '';
      }

      if (gender == 'male') {
        if (starty == endy) {
          return (
            'M ' + (x + 1) + ' ' + (endy - 5.5) + ' ' +
            'L ' + (x + 6) + ' ' + endy + ' ' +
            'L ' + x + ' ' + (endy + 6) + ' ' +
            'L ' + (x - 6) + ' ' + endy + ' ' +
            'L ' + (x - 1) + ' ' + (endy - 5.5) + ' ' +
            'Z' 
          )
        }

        return (
          'M ' + (x + 1) + ' ' + starty + ' ' +
          'V ' + (endy - 5.5) + ' ' +
          'L ' + (x + 6) + ' ' + endy + ' ' +
          'L ' + x + ' ' + (endy + 6) + ' ' +
          'L ' + (x - 6) + ' ' + endy + ' ' +
          'L ' + (x - 1) + ' ' + (endy - 5.5) + ' ' +
          'V ' + starty + ' ' +
          'Z' 
        );
      } else {
        if (starty == endy) {
          return (
            'M '  + (x + 1) + ' ' + (endy - 5) + ' ' +
            'A 5 5 0 1 1 ' + (x - 1) + ' ' + (endy - 5) + ' ' +
            'Z'
          )
        }

        return (
          'M '  + (x + 1) + ' ' + starty + ' ' +
          'V ' + (endy - 5) + ' ' +
          'A 5 5 0 1 1 ' + (x - 1) + ' ' + (endy - 5) + ' ' +
          'V ' + starty + ' ' +
          'Z' 
        );
      }
    },
    drawDiamond (x, y) {
      if (!(x && y)) {
        return '';
      }

      return (
        'M ' + (x - 10) + ' ' + y + ' ' +
        'L ' + x + ' ' + (y - 10) + ' ' +
        'L ' + (x + 10) + ' ' + y + ' ' +
        'L ' + x + ' ' + (y + 10) + ' ' +
        'Z'
      );
    },
    drawMobileDiamond (x, y) {
      if (!(x && y)) {
        return '';
      }

      return (
        'M ' + (x - 6) + ' ' + y + ' ' +
        'L ' + x + ' ' + (y - 6) + ' ' +
        'L ' + (x + 6) + ' ' + y + ' ' +
        'L ' + x + ' ' + (y + 6) + ' ' +
        'Z'
      );
    },
    calOffsetx () {
      this.offsetx = Math.min(this.dragRange, this.offsetx);
    },
    calDragRange () {
      if (this.isMobile) {
        return this.dragRange = 0;
      }

      return this.dragRange = this.graphw + this.graphx - this.dategraph.getBoundingClientRect().width + this.margin;
    },
    calFitxaxisi () {
      if (this.isMobile) {
        return true;
      }

      if (!this.dates.length) {
        return 0;
      }

      this.fitxaxisi = this.graphvp / (this.dates.length - 1);
      
      if (!this.isExpanded) {
        this.xaxisi = this.fitxaxisi;
      }
    },
    expandGraph () {
      window.clearInterval(this.fitIntervalId);
      window.clearInterval(this.expandIntervalId);

      this.expandIntervalId = window.setInterval(()=>{
        if (this.xaxisi + 0.1 < xaxisi) {
          this.xaxisi = this.xaxisi + (xaxisi - this.fitxaxisi)/12;
          this.calDragRange();
          this.offsetx = this.dragRange;
        } else {
          this.xaxisi = xaxisi;
          this.calDragRange();
          this.offsetx = this.dragRange;
          this.isExpanded = true;
          window.clearInterval(this.expandIntervalId);
        }
      }, 10);
    },
    fitGraph () {
      const offsetxDiff = this.offsetx;

      window.clearInterval(this.fitIntervalId);
      window.clearInterval(this.expandIntervalId);

      this.fitIntervalId = window.setInterval(()=>{
        if (this.xaxisi - 0.1 > this.fitxaxisi) {
          this.xaxisi = this.xaxisi - (xaxisi - this.fitxaxisi)/12;
          this.calDragRange();
          this.offsetx = this.offsetx - offsetxDiff/12;
        } else {
          this.xaxisi = this.fitxaxisi;
          this.calDragRange();
          this.offsetx = 0;
          this.isExpanded = false;
          window.clearInterval(this.fitIntervalId);
        }
      }, 10);
    }
  }
}

// const svgDateGraph = SVG('#date-graph').size(100, 100);
</script>

<style lang="scss" scoped>
#date-graph,
#date-side-graph,
#date-graph-mobile,
#date-legends,
#date-legends-mobile {
  .case {
    opacity: 0.8;

    &.imported {
      fill: #ED3A3A;
    }

    &.imported-contact {
      fill: #CF4FCF;
    }

    &.local-unknown {
      fill: #8668DE;
    }

    &.local-contact {
      fill: #2C6BC2;
    }

    &.local-possible {
      fill: #4DB8D4;
    }

    &.local-possible-contact {
      fill: #67C788;
    }
  }

  .date-line,
  .age-line {
    stroke: #dcddde;
    opacity: 0.75;
  }
}

#date-graph,
#date-side-graph,
#date-graph-mobile {
  width: 100%;

  .stripe {
    fill: #8f8f8c;
    opacity: 0.1;
  }

  .side-bg {
    fill: #fff;
  }

  .x-axis{
    stroke: #8f8f8c;
    opacity: 0.75;
  }

  .age,
  .date,
  .gender,
  .fit-graph,
  .expand-graph {
    font-size: 14px;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .age,
  .date,
  .gender {
    pointer-events: none;
  }

  .age {
    fill: #8f8f8c;
  }

  .date {
    fill: #8f8f8c;

    &.sunday {
      fill: red;
    }
  }

  .gender {
    fill: #8f8f8c;
  }

  .fit-graph,
  .expand-graph {
    fill: #8f8f8c;
    cursor: pointer;
    transition: 0.2s fill ease-in-out;

    &:hover {
      fill: #262626;
    }
  }

  .button-frame {
    fill: none;
    stroke: #dcddde;
    opacity: 0.75;
  }

  .date-line.first {
    display: none;
  }

  .case {
    mix-blend-mode: multiply;
  }
}

#date-graph,
#date-side-graph {
  opacity: 1;
  height: 580px;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  transition: 0.5s opacity ease-in-out;

  @include media-breakpoint-down(md) {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }

  &.hide {
    opacity: 0;
  }

  .age {
    text-anchor: end;
    dominant-baseline: middle;
  }

  .date,
  .gender {
    text-anchor: middle;
    dominant-baseline: hanging;
  }
}

#date-graph-mobile {
  display: none;
  height: 2000px;

  @include media-breakpoint-down(md) {
    display: block;
  }

  .x-axis {
    stroke: #dcddde;
    opacity: 0.75;
  }

  .y-axis{
    stroke: #8f8f8c;
    opacity: 0.75;
  }

  .age {
    text-anchor: middle;
    dominant-baseline: baseline;
  }

  .date,
  .gender {
    text-anchor: end;
    dominant-baseline: middle;
  }
}

#date-legends,
#date-legends-mobile {
  svg {
    width: 100%;

    &.tall {
      height: 50px;
    }

    &.short {
      height: 21px;
    }

    .legend-text {
      font-size: 14px;
      fill: #8f8f8c;
      user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
    }

    path.grey {
      fill: #ababab;
    }
  }
}

#date-legends {
  margin-bottom: 40px;
}

#date-legends-mobile {
  margin-top: 20px;

  svg {
    &.wide {
      width: calc(100% + 30px);;
    }

    &.short {
      width: calc(100% - 10px);
      margin-left: 10px;
      height: 26px;
    }

    .legend-text {
      font-size: 12px;
      text-anchor: start;
      dominant-baseline: middle;
    }
  }
}
</style>
