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
                    輸入個案：在較短時間被發現（因為有外遊史協助判斷，雖然可能都有隱瞞）本地及可能本地個案：由發病（例如發燒、咳嗽）到確診接受隔離之間所花時間較長。<br>性別及年齡分析：男性病人的年齡分佈大多散落在40至70歲之間；女性病人年齡集中在60歲左右。
                  </p>
                </div>
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
          .then(() => {
            // console.log(JSON.stringify(response.data.result.cases))
            // this.sanityInfoCases = response.data.result.cases
            this.sanityInfoCases = [{"_createdAt":"2020-02-24T15:52:11Z","_id":"07925066-cd22-4120-8501-a72261c7f4f9","_rev":"MFsuEw274tWs1CegS0RmGn","_type":"covidcase","_updatedAt":"2020-02-25T03:52:19Z","cno":37,"lat":"22.389176","lng":"114.195278","locations":"[{\"lng\": 114.195278, \"lat\": 22.389176, \"label\": \"禾輋邨泰和樓\"},{\"lng\": 114.172330, \"lat\": 22.323402, \"label\": \"新世紀廣場\"}]","name":"Case 37"},{"_createdAt":"2020-02-26T18:35:40Z","_id":"0fd2355f-414f-4b99-9664-ed02434173c3","_rev":"mq31xbLYwNIx29usrvPKWy","_type":"covidcase","_updatedAt":"2020-02-26T18:35:40Z","cno":91,"description":"患者是第 76 宗患者的兒子，與母親同住於大潭紅山半島第一期，他2月20日發燒和咳，21日到養和醫院門診部求醫。男患者的母親於2月24日確診後，他同日到律敦治醫院急症室求診及入院。男病人沒去過北角「福慧精舍」佛堂。他平日在家工作，1月底曾與家人一同到日本大阪旅遊，潛伏期內則沒有外遊。","name":"Case 91"},{"_createdAt":"2020-02-24T17:16:52Z","_id":"100e6f3d-8689-4ef6-a5fa-b1b478c20af8","_rev":"QMUDpEcZGbc2mExEoatcRg","_type":"covidcase","_updatedAt":"2020-02-25T04:31:25Z","cno":68,"description":"安慈路4號昌運中心商場","lat":"22.452458","lng":"114.168026 ","locations":"[{\"lng\": 114.168026, \"lat\": 22.452458, \"label\": \"昌運中心商場\"},{\"lng\": 114.071025, \"lat\": 22.493992, \"label\": \"新田石湖圍\"}]","name":"Case 68"},{"_createdAt":"2020-02-24T17:08:46Z","_id":"120ec588-259c-4796-bfb7-753ba64db746","_rev":"NdJ4GTSuYtbKr6Nf7hklyF","_type":"covidcase","_updatedAt":"2020-02-25T04:35:53Z","cno":59,"lat":"22.292259","lng":"114.206633 ","locations":"[{\"lng\": 114.206633, \"lat\": 22.292259, \"label\": \"英皇道633號\"},{\"lng\": 114.201260, \"lat\": 22.347184, \"label\": \"慈雲山毓華街42號\"},{\"lng\": 114.199088, \"lat\": 22.351884, \"label\": \"慈愛苑愛華閣\"}]","name":"Case 59"},{"_createdAt":"2020-02-24T17:19:30Z","_id":"15c2a8f2-b696-4948-a94b-867a1f248c31","_rev":"cmVu3wsUMKKWfaawlSBqbq","_type":"covidcase","_updatedAt":"2020-02-25T04:37:57Z","cno":63,"lat":"22.380177","lng":"113.978870 ","locations":"[{\"lng\": 113.978870 , \"lat\": 22.380177, \"label\": \"三聖街5號\"},{\"lng\": 113.983782 , \"lat\": 22.378612, \"label\": \"海景花園1座\"}]","name":"Case 63"},{"_createdAt":"2020-02-24T15:50:39Z","_id":"2a123881-d0fc-48de-8816-f1db75820f2d","_rev":"MFsuEw274tWs1CegS0RhLx","_type":"covidcase","_updatedAt":"2020-02-25T03:51:31Z","cno":36,"lat":"22.277134","lng":"114.175517","locations":"[{\"lng\": 114.175517, \"lat\": 22.277134, \"label\": \"中滙大樓\"}]","name":"Case 36"},{"_createdAt":"2020-02-24T16:39:13Z","_id":"354b6158-637a-414e-aff8-07350bc99e2c","_rev":"2RporFGnh6dlneLFlBkQxh","_type":"covidcase","_updatedAt":"2020-02-25T04:33:07Z","cno":51,"description":"紫田村","lat":" 22.417064","lng":"113.975531 ","locations":"[{\"lng\": 113.975531, \"lat\": 22.417064, \"label\": \"紫田村\"}]","name":"Case 51"},{"_createdAt":"2020-02-24T16:55:51Z","_id":"373cd6ec-2d96-47ed-8fa0-393a209327c3","_rev":"u2ZRAjmXs4bGDnAxy7wxNk","_type":"covidcase","_updatedAt":"2020-02-25T04:31:07Z","cno":69,"lat":" 22.298394","lng":"114.238767 ","locations":"[{\"lng\": 114.238767, \"lat\": 22.298394, \"label\": \"油美苑潤美閣\"},{\"lng\": 114.140680, \"lat\": 22.288160, \"label\": \"均益大廈\"},{\"lng\": 114.225843, \"lat\": 22.314754, \"label\": \"觀塘社區健康中心\"}]","name":"Case 69"},{"_createdAt":"2020-02-24T17:02:37Z","_id":"44284c61-58b4-494d-a4e0-4896f3a971f9","_rev":"DK7D6LOFQIBaXPVDSJZmEG","_type":"covidcase","_updatedAt":"2020-02-25T04:36:09Z","cno":60,"lat":"22.279814","lng":"114.224248 ","locations":"[{\"lng\": 114.224248, \"lat\": 22.279814, \"label\": \"富欣閣\"},{\"lng\": 114.219406, \"lat\": 22.285315, \"label\": \"太古城寶山閣\"},{\"lng\": 114.215995, \"lat\": 22.286475, \"label\": \"太古城明宫閣\"}]","name":"Case 60"},{"_createdAt":"2020-02-24T16:56:42Z","_id":"44ba2395-7244-46fe-ac6b-7708921884b1","_rev":"QMUDpEcZGbc2mExEoatbSg","_type":"covidcase","_updatedAt":"2020-02-25T04:30:41Z","cno":70,"lat":"114.193565 ","lng":"22.283615","locations":"[{\"lng\": 114.193565, \"lat\": 22.283615, \"label\": \"飛龍臺\"},{\"lng\": 114.1980272, \"lat\": 22.2908688, \"label\": \"美輪大廈\"}]","name":"Case 70"},{"_createdAt":"2020-02-24T17:01:42Z","_id":"4bd228ef-ba12-431b-a39b-6044a6e88a89","_rev":"cmVu3wsUMKKWfaawlSBgyG","_type":"covidcase","_updatedAt":"2020-02-25T04:35:05Z","cno":57,"lat":"22.279814","lng":"114.224248 ","locations":"[{\"lng\": 114.224248, \"lat\": 22.279814, \"label\": \"富欣閣\"},{\"lng\": 114.206633, \"lat\": 22.292259, \"label\": \"英皇道633號\"},{\"lng\": 114.215995, \"lat\": 22.286475, \"label\": \"太古城明宫閣\"},{\"lng\": 114.216339, \"lat\": 22.286505, \"label\": \"太古城元宮閣\"}]","name":"Case 57"},{"_createdAt":"2020-02-24T16:57:33Z","_id":"4e57dc7d-021d-4531-92f8-c7b626633176","_rev":"u2ZRAjmXs4bGDnAxy7wqgq","_type":"covidcase","_updatedAt":"2020-02-25T04:29:37Z","cno":72,"lat":"22.313233","lng":"114.239325 ","locations":"[{\"lng\": 114.239325 , \"lat\": 22.313233, \"label\": \"興田邨彩田樓\"}]","name":"Case 72"},{"_createdAt":"2020-02-24T17:01:26Z","_id":"4ef62eee-7ba1-49b4-b6f6-b5433b0d3324","_rev":"2RporFGnh6dlneLFlBkN2T","_type":"covidcase","_updatedAt":"2020-02-25T04:32:18Z","cno":50,"description":"新世紀廣場","lat":"22.323402","lng":"114.172330 ","locations":"[{\"lng\": 114.172330, \"lat\": 22.323402, \"label\": \"新世紀廣場\"},{\"lng\": 114.102400, \"lat\": 22.360736, \"label\": \"長安邨安濤樓\"}]","name":"Case 50"},{"_createdAt":"2020-02-24T06:21:36Z","_id":"5181f47a-9629-438e-ae9d-54dba211f21f","_rev":"2RporFGnh6dlneLFlBfoSj","_type":"covidcase","_updatedAt":"2020-02-25T03:56:23Z","cno":74,"description":"患者居於美輪大廈，也曾到北角福慧精舍（即第 70 宗患者曾到的地方），據報她每天早上會到佛堂「幾分鐘」。她於 2 月 13 日因肌肉痛，曾向 2 名私家醫求診，2 月 22 日到東區醫院，2 月 23 日確診。","lat":"22.2908688","lng":"114.1980272","locations":"[{\"lng\": 114.1980272, \"lat\": 22.2908688, \"label\": \"美輪大廈\"}]","name":"Case 74"},{"_createdAt":"2020-02-24T16:34:24Z","_id":"5a53d24d-b2bb-4b95-99a1-545611fa1f45","_rev":"QMUDpEcZGbc2mExEoasJTg","_type":"covidcase","_updatedAt":"2020-02-25T03:55:21Z","cno":46,"lat":"22.252446","lng":"114.150941","locations":"[{\"lng\": 114.150941, \"lat\": 22.252446, \"label\": \"田灣邨田澤樓\"}]","name":"Case 46"},{"_createdAt":"2020-02-24T16:25:46Z","_id":"5af5e92c-d018-4803-b850-000e72550089","_rev":"SeiFRGL5blw1FrzeRmMX5k","_type":"covidcase","_updatedAt":"2020-02-25T03:54:46Z","cno":40,"lat":"22.281662","lng":"114.221882","locations":"[{\"lng\": 114.221882, \"lat\": 22.281662, \"label\": \"西灣河街110號長興大廈\"}]","name":"Case 40"},{"_createdAt":"2020-02-24T16:24:48Z","_id":"6292f08d-3c6b-4337-8087-fc9d35e1183a","_rev":"MFsuEw274tWs1CegS0RoJF","_type":"covidcase","_updatedAt":"2020-02-25T03:52:44Z","cno":38,"lat":"22.281662","lng":"114.221882","locations":"[{\"lng\": 114.221882, \"lat\": 22.281662, \"label\": \"長興大廈\"}]","name":"Case 38"},{"_createdAt":"2020-02-24T15:51:19Z","_id":"636e5c15-8eec-436e-ba14-dc6a89b9685d","_rev":"DK7D6LOFQIBaXPVDSJRKBQ","_type":"covidcase","_updatedAt":"2020-02-25T03:51:08Z","cno":33,"lat":"22.277134","lng":"114.175517","locations":"[{\"lng\": 114.175517, \"lat\": 22.277134, \"label\": \"中滙大樓\"}]","name":"Case 33"},{"_createdAt":"2020-02-24T16:46:18Z","_id":"6389a1a9-35a0-469b-ae90-e9afb33f7cf5","_rev":"u2ZRAjmXs4bGDnAxy7xJU4","_type":"covidcase","_updatedAt":"2020-02-25T04:36:26Z","cno":61,"lat":" 22.281811","lng":"114.212734 ","locations":"[{\"lng\": 114.212734, \"lat\": 22.281811, \"label\": \"康景花園D座\"}]","name":"Case 61"},{"_createdAt":"2020-02-24T17:06:15Z","_id":"645db0fb-df37-463a-99f9-3b85250bb7af","_rev":"NdJ4GTSuYtbKr6Nf7hkeJZ","_type":"covidcase","_updatedAt":"2020-02-25T04:31:48Z","cno":67,"lat":"22.296502","lng":"114.238668 ","locations":"[{\"lng\": 114.238668, \"lat\": 22.296502, \"label\": \"大本型\"},{\"lng\": 114.229466, \"lat\": 22.320795, \"label\": \"曉麗苑商場\"},{\"lng\": 114.228884, \"lat\": 22.320520, \"label\": \"曉麗苑曉暉閣\"}]","name":"Case 67"},{"_createdAt":"2020-02-24T16:42:16Z","_id":"6e1f2baf-6064-4cee-a671-bdffa5372677","_rev":"0rujxCI50fqx32EndPbek7","_type":"covidcase","_updatedAt":"2020-02-26T18:15:49Z","cno":55,"description":"石籬二邨石怡樓","lat":"22.365248","lng":"114.139989 ","locations":"[{\"lng\": 114.139989, \"lat\": 22.365248, \"label\": \"石籬二邨石怡樓\"}]","name":"Case 55"},{"_createdAt":"2020-02-24T16:28:58Z","_id":"702adfe6-cc63-480c-afbb-575a3335a1ed","_rev":"SeiFRGL5blw1FrzeRmMVIC","_type":"covidcase","_updatedAt":"2020-02-25T03:54:35Z","cno":42,"lat":"22.350421","lng":"114.099254","locations":"[{\"lng\": 114.099254, \"lat\": 22.350421, \"label\": \"長康邨康美樓\"}]","name":"Case 42"},{"_createdAt":"2020-02-24T16:28:18Z","_id":"759fefb2-a523-4787-a361-a6e35121b280","_rev":"u2ZRAjmXs4bGDnAxy7qonY","_type":"covidcase","_updatedAt":"2020-02-25T03:50:22Z","cno":12,"description":"長康邨康美樓","lat":"22.350421","lng":"114.099254","locations":"[{\"lng\": 114.099254, \"lat\": 22.350421, \"label\": \"長康邨康美樓\"}]","name":"Case 12"},{"_createdAt":"2020-02-24T16:41:28Z","_id":"7bf7ac99-5178-4312-873e-453a99aed626","_rev":"cmVu3wsUMKKWfaawlSBdE0","_type":"covidcase","_updatedAt":"2020-02-25T04:33:45Z","cno":53,"description":"柯布連道28-32號香海大廈","lat":"22.278812","lng":"114.172892","locations":"[{\"lng\": 114.172892, \"lat\": 22.278812, \"label\": \"香海大廈\"}]","name":"Case 53"},{"_createdAt":"2020-02-24T17:05:07Z","_id":"7db055fb-8124-4e6d-a7ea-7a1a9b4b3d0a","_rev":"u2ZRAjmXs4bGDnAxy7rXN2","_type":"covidcase","_updatedAt":"2020-02-25T03:54:25Z","cno":44,"lat":"22.279293","lng":"114.178112","locations":"[{\"lng\": 114.178112, \"lat\": 22.279293, \"label\": \"群策大廈\"},{\"lng\": 114.157573, \"lat\": 22.242153, \"label\": \"利東邨東平樓\"}]","name":"Case 44"},{"_createdAt":"2020-02-24T16:44:16Z","_id":"8324c100-9870-426b-b7fa-518386c1cc9a","_rev":"57GPyLHW2AIQZcGrP5G24O","_type":"covidcase","_updatedAt":"2020-02-26T18:15:26Z","cno":56,"description":"永樂街233號","lat":" 22.287722","lng":"114.148269 ","locations":"[{\"lng\": 114.148269, \"lat\": 22.287722, \"label\": \"永樂街233號\"}]","name":"Case 56"},{"_createdAt":"2020-02-24T16:51:50Z","_id":"891f2c13-5878-4cbd-b53e-7d3b3d513b66","_rev":"qBQv7S8dxQ66KlXWy3SyoW","_type":"covidcase","_updatedAt":"2020-02-25T04:42:30Z","cno":65,"lat":"22.262292","lng":"114.249152 ","locations":"[{\"lng\": 114.249152, \"lat\": 22.262292, \"label\": \"小西灣邨瑞滿樓\"},{\"lng\": 114.196486, \"lat\": 22.290638, \"label\": \"皇冠大廈\"},{\"lng\": 114.200221, \"lat\": 22.290883, \"label\": \"美輪大廈\"}]","name":"Case 65"},{"_createdAt":"2020-02-24T16:35:17Z","_id":"89f74449-cbd6-450c-9f1b-ee28ed672ddb","_rev":"u2ZRAjmXs4bGDnAxy7roC0","_type":"covidcase","_updatedAt":"2020-02-25T03:55:43Z","cno":47,"lat":"22.399265","lng":"113.978085","locations":"[{\"lng\": 113.978085, \"lat\": 22.399265, \"label\": \"良田村\"}]","name":"Case 47"},{"_createdAt":"2020-02-24T16:43:30Z","_id":"96dcff73-f6a2-4d15-a532-05bc129c2470","_rev":"NdJ4GTSuYtbKr6Nf7hkjln","_type":"covidcase","_updatedAt":"2020-02-25T04:34:41Z","cno":54,"lat":"22.222063","lng":"113.883344","locations":"[{\"lng\": 113.883344, \"lat\": 22.222063, \"label\": \"大浪灣村廈\"}]","name":"Case 54"},{"_createdAt":"2020-02-24T16:33:03Z","_id":"a5a1a1e4-12ee-4548-919b-e7d2f8514e70","_rev":"u2ZRAjmXs4bGDnAxy7rWCi","_type":"covidcase","_updatedAt":"2020-02-25T03:54:20Z","cno":45,"lat":"22.326086","lng":"114.252866","locations":"[{\"lng\": 114.252866, \"lat\": 22.326086, \"label\": \"寶林邨寶仁樓\"}]","name":"Case 45"},{"_createdAt":"2020-02-24T16:40:56Z","_id":"a7055810-08cc-48d9-bcc9-09d403bc49b0","_rev":"qBQv7S8dxQ66KlXWy3SfTY","_type":"covidcase","_updatedAt":"2020-02-25T04:33:27Z","cno":52,"description":"柯布連道28-32號香海大廈","lat":"22.278812","lng":"114.172892","locations":"[{\"lng\": 114.172892, \"lat\": 22.278812, \"label\": \"香海大廈\"},{\"lng\": 114.212734, \"lat\": 22.281811, \"label\": \"康景花園D座\"}]","name":"Case 52"},{"_createdAt":"2020-02-24T16:51:24Z","_id":"aea868c7-19fd-419d-b3dc-2d652f57c089","_rev":"NdJ4GTSuYtbKr6Nf7hkvmT","_type":"covidcase","_updatedAt":"2020-02-25T04:40:36Z","cno":64,"lat":"22.262292","lng":"114.249152 ","locations":"[{\"lng\": 114.249152 , \"lat\": 22.262292, \"label\": \"小西灣邨瑞滿樓\"},{\"lng\": 114.196486 , \"lat\": 22.290638, \"label\": \"皇冠大廈\"}]","name":"Case 64"},{"_createdAt":"2020-02-24T17:13:22Z","_id":"b855af1d-cd06-4e69-bcad-ff5e1e4f2243","_rev":"u2ZRAjmXs4bGDnAxy7xFng","_type":"covidcase","_updatedAt":"2020-02-25T04:35:35Z","cno":58,"lat":"22.340642","lng":"114.158533 ","locations":"[{\"lng\": 114.158533, \"lat\": 22.340642, \"label\": \"長沙灣賽馬會普通科門診診所\"},{\"lng\": 114.263222, \"lat\": 22.307050, \"label\": \"怡明邨怡情樓\"},{\"lng\": 114.159012, \"lat\": 22.335886, \"label\": \"元州街298號D\"}]","name":"Case 58"},{"_createdAt":"2020-02-24T16:58:24Z","_id":"bca4cab9-9099-418f-82cc-ef87770a16d1","_rev":"MFsuEw274tWs1CegS0VOgz","_type":"covidcase","_updatedAt":"2020-02-25T04:29:59Z","cno":73,"lat":"22.2622542","lng":"114.2308421","locations":"[{\"lng\": 114.233031, \"lat\": 22.262280, \"label\": \"興華(二)邨展興樓\"},{\"lng\": 114.200221, \"lat\": 22.290883, \"label\": \"美輪大廈\"}]","name":"Case 73"},{"_createdAt":"2020-02-24T16:30:46Z","_id":"c30c2e14-77ec-4ab0-b139-49a26d2ab255","_rev":"DK7D6LOFQIBaXPVDSJRsmM","_type":"covidcase","_updatedAt":"2020-02-25T03:54:30Z","cno":43,"lat":"22.266494","lng":"114.250882","locations":"[{\"lng\": 114.250882, \"lat\": 22.266494, \"label\": \"藍灣半島第三座\"}]","name":"Case 43"},{"_createdAt":"2020-02-24T16:50:38Z","_id":"cd33f240-09f6-4998-975d-bc7801c64e1b","_rev":"u2ZRAjmXs4bGDnAxy7xKtc","_type":"covidcase","_updatedAt":"2020-02-25T04:36:44Z","cno":62,"lat":"22.314909","lng":"114.223351 ","locations":"[{\"lng\": 114.223351, \"lat\": 22.314909, \"label\": \"金僑華廈\"},{\"lng\": 114.220108, \"lat\": 22.321891, \"label\": \"樂華北邨商場\"}]","name":"Case 62"},{"_createdAt":"2020-02-24T16:25:23Z","_id":"d16a9bb2-4a1d-4f01-8f0f-9dce53f099f7","_rev":"SeiFRGL5blw1FrzeRmMXhu","_type":"covidcase","_updatedAt":"2020-02-25T03:54:51Z","cno":39,"lat":"22.281662","lng":"114.221882","locations":"[{\"lng\": 114.221882, \"lat\": 22.281662, \"label\": \"西灣河街110號長興大廈\"}]","name":"Case 39"},{"_createdAt":"2020-02-24T17:19:56Z","_id":"d512661f-94fa-40b7-8b57-f3d22a422d7c","_rev":"SeiFRGL5blw1FrzeRmSWZY","_type":"covidcase","_updatedAt":"2020-02-25T04:39:18Z","cno":66,"lat":"22.380177","lng":"113.978870 ","locations":"[{\"lng\": 113.978870, \"lat\": 22.380177, \"label\": \"三聖街5號\"},{\"lng\": 113.983782, \"lat\": 22.378612, \"label\": \"海景花園1座\"}]","name":"Case 66"},{"_createdAt":"2020-02-24T16:29:45Z","_id":"d7a861db-7d99-4437-a2de-bee89dab5e65","_rev":"2RporFGnh6dlneLFlBkOUH","_type":"covidcase","_updatedAt":"2020-02-25T04:32:36Z","cno":49,"description":"長康邨康美樓","lat":"22.350421","lng":"114.099254","locations":"[{\"lng\": 114.099254, \"lat\": 22.350421, \"label\": \"長康邨康美樓\"}]","name":"Case 49"},{"_createdAt":"2020-02-24T16:29:24Z","_id":"ecfdfbca-7649-4956-a477-8929fbf7484f","_rev":"u2ZRAjmXs4bGDnAxy7rs00","_type":"covidcase","_updatedAt":"2020-02-25T03:55:59Z","cno":48,"lat":"22.350421","lng":"114.099254","locations":"[{\"lng\": 114.099254, \"lat\": 22.350421, \"label\": \"長康邨康美樓\"}]","name":"Case 48"},{"_createdAt":"2020-02-24T17:04:00Z","_id":"fa1e37a3-bc6f-49ee-8ba2-03f84996fd58","_rev":"DK7D6LOFQIBaXPVDSJRHKq","_type":"covidcase","_updatedAt":"2020-02-25T03:50:46Z","cno":30,"lat":"22.279293","lng":"114.178112 ","locations":"[{\"lng\": 114.178112, \"lat\": 22.279293, \"label\": \"群策大廈\"}]","name":"Case 30"}]

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
