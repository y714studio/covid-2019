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
                <h4>常寶自母太際的之新異靈品次</h4>
                <p>深春口流投要式關原買如，象發以找回工修去！檢持聯員麼的是成生裡不全兩可打兒覺研河里也子國機個，勢則財實，不了充年讀專。</p>
                <p>沒生年率學結決寫下防。知大一月來可他景道正新她路面方日，的規電口度現驚便請該爸交低，士決面獨，直心計正不言。</p>
                <div class="row">
                  <div class="col-md-2 age-vs-gender">
                    <img src="./assets/2019_ncov_age_vs_gender_20200220.jpg">
                  </div>
                  <div class="col-md-10">
                    <img src="./assets/2019_ncov_age_vs_time_20200220.jpg">
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="col-md-12 col-lg-4">
            <div class="section-inner">
              <latest-cases />
            </div>
          </section>

          <section class="col-md-6 col-lg-8">
            <div class="section-inner">
              <cases
                :cases="govInfoCases"
              />
            </div>
          </section>

          <section class="col-md-6 col-lg-8">
            <div class="section-inner" style="background: #eee; min-height: 200px;" />
          </section>

          <section class="col-md-6 col-lg-4">
            <div class="section-inner" style="background: #eee; min-height: 200px;" />
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

export default {
  name: 'app',
  components: {
    WebMap,
    Sidebar,
    Dailystat,
    Ring,
    Cases,
    LatestCases
  },
  data() {
    return {
      govInfoCases: [],
      govInfoDailyStat: [],
      govInfoBuildingList: []
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
      padding: 15px;
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
