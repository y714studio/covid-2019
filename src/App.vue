<template>
  <div id="app" class="page-wars vue-cli plugin-bootstrap plugin-arcgis">
    <div class="dashboard-container">
      <sidebar
        :govInfoCases="govInfoCases"
        :govInfoDailyStat="govInfoDailyStat"
        :govInfoBuildingList="govInfoBuildingList"
      />
      <div class="container-fluid">
        <div class="row">

          <section class="col-lg-12">
            <div class="section-inner">
              <web-map
                :cases="govInfoCases"
              />
              <div class="legands text-right">
                <div class="legand">
                  <span class="dot-blue" />
                  疑似/確診個案大廈名單
                </div>
              </div>
            </div>
          </section>

          <section class="col-md-12 col-lg-8">
            <div class="section-inner">
              <dailystat
                :govInfoDailyStat="govInfoDailyStat"
              />
            </div>
          </section>

          <section class="col-md-12 col-lg-4">
            <div class="section-inner">
              <ring
                :govInfoCases="govInfoCases"
              />
            </div>
          </section>

          <section class="col-md-12">
            <div class="section-inner">
              <div>
                <h4>確診個案分析</h4>
                <div class="row">
                  <p class="col-md-9">
                    下圖以藍色代表輸入個案及其密切接觸者；紅色代表本地個案／可能本地個案及其密切接觸者。菱形代表男性、圓形代表女性。每一條線條顯示由病人發病到確診之間的時間長度。圖表可見，輸入個案一般在較短時間被發現；男性病人的年齡分佈集中在70歲左右；女性病人則集中在60多歲。
                  </p>
                </div>
                <!-- <img src="./assets/2019_ncov_age_gender_time_20200220.jpg"> -->
                <date-graph :raw-cases="govInfoCases" :raw-dates="govInfoDailyStat" />
              </div>
            </div>
          </section>

          <section class="col-md-12 col-lg-4">
            <div class="section-inner">
              <latest-cases
                :cases="govInfoCases"
              />
            </div>
          </section>

          <section class="col-md-6 col-lg-8">
            <div class="section-inner">
              <cases
                :cases="govInfoCases"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

import WebMap from './components/WebMap.vue'
import Sidebar from './components/Sidebar.vue'
import Dailystat from './components/Dailystat.vue'
import Ring from './components/Ring.vue'
import Cases from './components/Cases.vue'
import LatestCases from './components/LatestCases.vue'
import DateGraph from './components/DateGraph.vue'

export default {
  name: 'app',
  components: {
    WebMap,
    Sidebar,
    Dailystat,
    Ring,
    Cases,
    LatestCases,
    DateGraph
  },
  data() {
    return {
      govInfoCases: [],
      govInfoDailyStat: [],
      govInfoBuildingList: [],
      sanityInfoCases: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get('https://api.data.gov.hk/v1/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Fenhanced_sur_pneumonia_wuhan_chi.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D')
      .then((response) => {
        this.govInfoCases = response.data.rows

          axios.get('https://ilssqevq.apicdn.sanity.io/v1/data/query/production?query={%22cases%22:*[_type==%22covidcase%22]}')
          .then((response) => {
            this.sanityInfoCases = response.data.result.cases

            for (let i = 0; i < this.govInfoCases.length; i++) {
              const sanityCase = this.sanityInfoCases.find((element) => {
                return element.cno == this.govInfoCases[i][0]
              })

              if(sanityCase) {
                this.govInfoCases[i].push(sanityCase.description? sanityCase.description: '')
                this.govInfoCases[i].push(sanityCase.locations? sanityCase.locations: '')
                this.govInfoCases[i].push(sanityCase.lat)
                this.govInfoCases[i].push(sanityCase.lng)
              } else {
                this.govInfoCases[i].push('')
                this.govInfoCases[i].push('')
                this.govInfoCases[i].push('')
                this.govInfoCases[i].push('')
              }
            }
          })
      })

      axios.get('https://api.data.gov.hk/v1/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Flatest_situation_of_reported_cases_wuhan_chi.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D')
        .then((response) => {
          this.govInfoDailyStat = response.data.rows
        })

      axios.get('https://api.data.gov.hk/v1/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Fbuilding_list_chi.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D')
      .then((response) => {
        this.govInfoBuildingList = response.data.rows
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .dashboard-container {
    padding-left: 280px;

    @include media-breakpoint-down(sm) {
      padding: 15px 0;
    }

    .section-inner {
      margin-bottom: 15px;
    }
  }

  .age-vs-gender {
    padding-right: 20px;
  }

  .legands {
    margin-top: 12px;
    text-align: right;

    .legand {
      display: inline-block;
      font-size: 12px;

      .dot-blue {
        display: block;
        width: 17px;
        height: 17px;
        background: #1e52a4;
        border-radius: 50%;
        float: left;
        margin-right: 8px;
      }
    }
  }
}
</style>
