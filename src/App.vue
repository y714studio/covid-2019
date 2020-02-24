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
            <div class="section-inner" style="background: #eee;">
              <web-map />
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
                <p>
                  輸入個案：在較短時間被發現（因為有外遊史協助判斷，雖然可能都有隱瞞）本地及可能本地個案：由發病（例如發燒、咳嗽）到確診接受隔離之間所花時間較長。<br>性別及年齡分析：男性病人的年齡分佈大多散落在40至70歲之間；女性病人年齡集中在60歲左右。
                </p>
                <!-- <img src="./assets/2019_ncov_age_gender_time_20200220.jpg"> -->
                <date-graph />
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

            for (let i = 0; i < this.sanityInfoCases.length; i++) {
              const caseNo = this.sanityInfoCases[i].cno

              this.govInfoCases[caseNo - 1].push(this.sanityInfoCases[i].description)
              this.govInfoCases[caseNo - 1].push(this.sanityInfoCases[i].lat)
              this.govInfoCases[caseNo - 1].push(this.sanityInfoCases[i].lng)
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
}
</style>
