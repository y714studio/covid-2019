<template>
  <div>
    <svg id="date-graph" class="hide">
      <!-- Main Graph -->
      <rect class="stripe" v-for="n in 5" :x="graphx - offsetx" :y="graphy + yaxish*0.2*(n - 1)" :width="graphw" :height="yaxish*0.1" :key="'stripe-' + n" />  
      <line class="age-line" v-for="n in 5" :x1="graphx - offsetx" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-' + n" />
      <line class="x-axis" :x1="graphx - offsetx" :y1="graphy + yaxish" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish" />
      <line class="date-line" :class="{ 'first': i == 0 }" v-for="(date, i) in dates" :x1="datesx[i] + graphx - offsetx" :y1="margin" :x2="datesx[i] + graphx - offsetx" :y2="graphy + yaxish" :key="'date-line-' + i" />
      <text class="date" v-for="(sunday, i) in sundays" :x="datesx[firstSundayi + 7*i] + graphx - offsetx" :y="graphy + yaxish + 10" v-text="sundaysName[i]" :key="'date-' + i" />
      <path class="case" :class="patient.origin" v-for="(patient, i) in cases" :d="drawPath(patient.gender, datesxIndex[patient.start] + graphx - offsetx, datesxIndex[patient.confirmed] + graphx - offsetx, (1-(patient.age/100))*yaxish + margin)" :key="'case-' + i" />
      <rect class="side-bg" :x="0" :y="0" :width="graphx" :height="margin + yaxish + margin" />
      <text class="age" v-for="n in 5" :x="datesx[0] + graphx - 15" :y="graphy + yaxish*0.2*(n - 1)" v-text="100 - (n - 1)*20" :key="'age-' + n" />
      <line class="age-line" v-for="n in 5" :x1="graphx - 10" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-y-axis-' + n" />
      <text class="fit-graph" :x="graphx" :y="margin - 20">縮小</text>
      <text class="expand-graph" :x="graphx + 40" :y="margin - 20">放大</text>


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
    </svg>
    <div id="date-legends">
      <div class="row align-items-end">
        <div class="col-md-3">
          <svg class="tall">
            <path class="case grey" d="M16,38H198l9-8.5,10,10-10,10L198,41H16Z"/>
            <line class="date-line" x1="16.5" y1="19" x2="16.5" y2="41"/>
            <line class="date-line" x1="206.5" y1="19" x2="206.5" y2="41"/>
            <text class="legend-text" transform="translate(0.76 11.21)">發病日</text>
            <text class="legend-text" transform="translate(190.76 11.21)">確診日</text>
          </svg>
        </div>
        <div class="col-md-2">
          <svg class="short">
            <path class="case grey" d="M16,9h12l9-8.5l10,10l-10,10L28,12H16V9z"/>
            <path class="case grey" d="M75.5,9.2H90c0.9-4.5,5.2-7.4,9.6-6.5c4.5,0.9,7.4,5.2,6.5,9.6s-5.2,7.4-9.6,6.5c-3.3-0.6-5.9-3.2-6.5-6.5H75.5V9.2z"/>
            <text class="legend-text" x="50.76" y="15.21">男</text>
            <text class="legend-text" x="110.76" y="15.21">女</text>
          </svg>
        </div>
        <div class="col-md-4 offset-md-2">
          <svg class="short">
            <path class="case imported" d="M112,9h12l9-8.5l10,10l-10,10l-9-8.5h-12V9z"/>
            <path class="case imported-contact" d="M17,9h12l9-8.5l10,10l-10,10L29,12H17V9z"/>
            <text class="legend-text" x="51.76" y="14.21">輸入個案</text>            
            <text class="legend-text" x="147.76" y="14.21">輸入個案的密切接觸者</text>
          </svg>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 offset-md-3">
          <svg class="short">
            <path class="case local-possible" d="M17,9H29L38,.5l10,10-10,10L29,12H17Z"/>
            <path class="case local-possible-contact" d="M136,9h12l9-8.5,10,10-10,10L148,12H136Z"/>
            <text class="legend-text" x="51.76" y="14.21">可能本地個案</text>
            <text class="legend-text" x="171.76" y="14.21">可能本地個案的密切接觸者</text>
          </svg>
        </div>
        <div class="col-md-4">
          <svg class="short">
            <path class="case local-unknown" d="M17,9H29L38,.5l10,10-10,10L29,12H17Z"/>
            <path class="case local-contact" d="M165,9h12l9-8.5,10,10-10,10L177,12H165Z"/>
            <text class="legend-text" x="51.76" y="14.21">本地個案(源頭不明)</text>            
            <text class="legend-text" x="200.76" y="14.21">本地個案的密切接觸者</text></svg>
        </div>
      </div>
    </div>
    <svg id="date-graph-mobile">
      <!-- Main Graph -->
      <rect class="stripe" v-for="n in 5" :x="graphx - offsetx" :y="graphy + yaxish*0.2*(n - 1)" :width="graphw" :height="yaxish*0.1" :key="'stripe-' + n" />  
      <line class="age-line" v-for="n in 5" :x1="graphx - offsetx" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-' + n" />
      <line class="x-axis" :x1="graphx - offsetx" :y1="graphy + yaxish" :x2="graphw + graphx - offsetx" :y2="graphy + yaxish" />
      <line class="date-line" :class="{ 'first': i == 0 }" v-for="(date, i) in dates" :x1="datesx[i] + graphx - offsetx" :y1="margin" :x2="datesx[i] + graphx - offsetx" :y2="graphy + yaxish" :key="'date-line-' + i" />
      <text class="date" v-for="(sunday, i) in sundays" :x="datesx[firstSundayi + 7*i] + graphx - offsetx" :y="graphy + yaxish + 10" v-text="sundaysName[i]" :key="'date-' + i" />
      <path class="case" :class="patient.origin" v-for="(patient, i) in cases" :d="drawPath(patient.gender, datesxIndex[patient.start] + graphx - offsetx, datesxIndex[patient.confirmed] + graphx - offsetx, (1-(patient.age/100))*yaxish + margin)" :key="'case-' + i" />
      <rect class="side-bg" :x="0" :y="0" :width="graphx" :height="margin + yaxish + margin" />
      <text class="age" v-for="n in 5" :x="datesx[0] + graphx - 15" :y="graphy + yaxish*0.2*(n - 1)" v-text="100 - (n - 1)*20" :key="'age-' + n" />
      <line class="age-line" v-for="n in 5" :x1="graphx - 10" :y1="graphy + yaxish*0.2*(n - 1)" :x2="graphx" :y2="graphy + yaxish*0.2*(n - 1)" :key="'age-line-y-axis-' + n" />
      <text class="fit-graph" :x="graphx" :y="margin - 20">縮小</text>
      <text class="expand-graph" :x="graphx + 40" :y="margin - 20">放大</text>


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
    </svg>
  </div>
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
const sidegraphx = margin - 15;
const sidegraphw = 145;
const sideMalex = 80;
const sideFemalex = 135;

const mmargin = 50;
const mgraphx = 250;
const mgraphy = 50;
const mxaxisi = 29; // i = increment
const myaxish = 480;
const msidegraphx = margin - 15;
const msidegraphw = 145;
const msideMalex = 80;
const msideFemalex = 135;

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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'imported-contact'
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
    origin: 'local-possible'
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
    origin: 'imported'
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
    origin: 'local-possible'
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
    origin: 'imported-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-unknown'
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
    origin: 'local-unknown'
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
    origin: 'local-contact'
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
    origin: 'local-contact'
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
    origin: 'local-possible'
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
    origin: 'local-possible-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-unknown'
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
    origin: 'imported'
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
    origin: 'imported'
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
    origin: 'local-possible'
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
    origin: 'local-unknown'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-contact'
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
    origin: 'local-contact'
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
    origin: 'local-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-possible-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-unknown'
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
    origin: 'local-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-contact'
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
    origin: 'local-contact'
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
    origin: 'local-contact'
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
    origin: 'local-possible'
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
    origin: 'local-unknown'
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
    origin: 'local-possible-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-possible-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-contact'
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
    origin: 'imported-contact'
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
    origin: 'local-possible-contact'
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
    origin: 'local-unknown'
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
    origin: 'local-contact'
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
    origin: 'local-possible'
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
    origin: 'local-unknown'
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
    origin: 'local-unknown'
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
    origin: 'local-unknown'
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
      sideMalex: sideMalex,
      sideFemalex: sideFemalex,
      sidegraphx: sidegraphx,
      sidegraphw: sidegraphw,
      datagraph: document.querySelector('#date-graph'),
      dategraphMobile: document.querySelector('#date-graph-mobile'),
      expandIntervalId: 0,
      fitIntervalId: 0,
      mousex: null,
      offsetx: 0,
      isdragging: false,
      dates: dates,
      cases: cases
    }
  },
  computed: {
    datesx () {
      return this.dates.map((date, i) => {
        return i * this.xaxisi;
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
    },
    dragRange () {
      return this.graphw + this.graphx - this.datagraph.getBoundingClientRect().width + this.margin;
    },
    graphvp () {
      return this.datagraph.getBoundingClientRect().width - graphx - margin;
    },
    fitxaxisi () {
      return this.graphvp / (this.datesx.length - 1);
    }
  },
  mounted () {
    this.datagraph = document.querySelector('#date-graph');
    this.dategraphMobile = document.querySelector('#date-graph-mobile');

    /* dragging */

    this.datagraph.addEventListener('mousedown', () => {
      this.isdragging = true;
      this.mousex = event.clientX;
    });

    this.datagraph.addEventListener('mousemove', (event) => {
      if (this.isdragging == true) {
        this.offsetx = Math.min(this.dragRange ,Math.max(0, this.offsetx + this.mousex - event.clientX));
        this.mousex = event.clientX;
      }
    });

    this.datagraph.addEventListener('mouseup', () => {
      this.isdragging = false;
    });

    this.datagraph.addEventListener('mouseleave', () => {
      this.isdragging = false;
    });

    /* intro animation */

    this.xaxisi = this.fitxaxisi;

    function intro () {
      if (this.datagraph.getBoundingClientRect().top < window.innerHeight/2) {
        this.datagraph.classList.remove('hide');
        window.setTimeout(this.expandGraph, 1000);
        window.removeEventListener('scroll', intro); 
      }
    }

    window.addEventListener('scroll', intro.bind(this));
    window.setTimeout(intro.bind(this), 1000);

    /* fit and expand graph */
    document.querySelector('.fit-graph').addEventListener('click', this.fitGraph);
    document.querySelector('.expand-graph').addEventListener('click', this.expandGraph);

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
    },
    expandGraph () {
      window.clearInterval(this.fitIntervalId);
      window.clearInterval(this.expandIntervalId);

      this.expandIntervalId = window.setInterval(()=>{
        if (this.xaxisi < xaxisi) {
          this.xaxisi = this.xaxisi + (xaxisi - this.fitxaxisi)/12;
          this.offsetx = this.dragRange;
        } else {
          window.clearInterval(this.expandIntervalId);
        }
      }, 10);
    },
    fitGraph () {
      const offsetxDiff = this.offsetx;

      window.clearInterval(this.fitIntervalId);
      window.clearInterval(this.expandIntervalId);

      this.fitIntervalId = window.setInterval(()=>{
        if (this.xaxisi > this.fitxaxisi) {
          this.xaxisi = this.xaxisi - (xaxisi - this.fitxaxisi)/12;
          this.offsetx = this.offsetx - offsetxDiff/12;
        } else {
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
#date-graph-mobile,
#date-legends {
  .case {
    opacity: 0.8;

    &.imported {
      fill: #E7384C;
    }

    &.imported-contact {
      fill: #E0439F;
    }

    &.local-unknown {
      fill: #905FD4;
    }

    &.local-contact {
      fill: #2E65C9;
    }

    &.local-possible {
      fill: #4DB8D4;
    }

    &.local-possible-contact {
      fill: #42C79B;
    }
  }

  .date-line,
  .age-line {
    stroke: #dcddde;
    opacity: 0.75;
  }
}

#date-graph,
#date-graph-mobile {
  width: 100%;

  .stripe {
    fill: #8f8f8c;
    opacity: 0.1;
  }

  .side-bg {
    fill: #fff;
  }

  .x-axis {
    stroke: #8f8f8c;
    opacity: 0.75;
  }

  .age,
  .date,
  .gender,
  .fit-graph,
  .expand-graph {
    font-size: 12px;
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
    fill: red;
  }

  .gender {
    fill: #8f8f8c;
  }

  .fit-graph,
  .expand-graph {
    fill: #8f8f8c;
    cursor: pointer;
  }

  .date-line.first {
    display: none;
  }

  .case {
    mix-blend-mode: multiply;
  }
}

#date-graph {
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

  .date {
    text-anchor: middle;
    dominant-baseline: hanging;
  }

  .gender {
    text-anchor: middle;
    dominant-baseline: hanging;
  }
}

#date-graph-mobile {
  display: none;

  @include media-breakpoint-down(md) {
    display: block;
  }  
}

#date-legends {
  svg {
    width: 100%;

    &.tall {
      height: 50px;
    }

    &.short {
      height: 21px;
    }

    .legend-text {
      font-size: 12px;
      fill: #8f8f8c;
      user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
    }

    path.grey {
      fill: #dcddde;
    }
  }
}
</style>
