<template>
  <aside>
    <section v-if="govInfoDailyStat.length" class="section-main-stat">
      <div class="row header-row">
        <h1>
          <span>眾新聞 - 武漢肺炎本港疫情</span>
          <a title="眾新聞" target="_blank" href="https://www.hkcnews.com">
            <img class="icon-close" src="./../assets/hkcnews_400x400.png">
          </a>
        </h1>
        <div class="title">
          <h2>Covid 2019</h2>
          <p>更新日期: {{ govInfoDailyStat[govInfoDailyStat.length - 1][0] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="d-flex section-main-stat-item section-main-stat-item-half">
          <div class="number">
            <h2 class="color-purple">{{ govInfoDailyStat[govInfoDailyStat.length - 1][6] }}</h2>
          </div>
          <div class="stat-label">
            <p>
              <span class="text-bold">人死亡</span><br>
              <span v-if="govInfoDailyStat[govInfoDailyStat.length - 1][6] - govInfoDailyStat[govInfoDailyStat.length - 2][6] !== 0" class="small color-pink">
                ▲{{ govInfoDailyStat[govInfoDailyStat.length - 1][6] - govInfoDailyStat[govInfoDailyStat.length - 2][6] }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex section-main-stat-item section-main-stat-item-half">
          <div class="number">
            <h2 class="color-purple">{{ govInfoDailyStat[govInfoDailyStat.length - 1][2] }}</h2>
          </div>
          <div class="stat-label">
            <p>
              <span class="text-bold">人感染</span><br>
              <span v-if="govInfoDailyStat[govInfoDailyStat.length - 1][2] - govInfoDailyStat[govInfoDailyStat.length - 2][2] !== 0" class="small color-pink">
                ▲{{ govInfoDailyStat[govInfoDailyStat.length - 1][2] - govInfoDailyStat[govInfoDailyStat.length - 2][2] }}
              </span>
              <span v-else class="small color-grey">
                --
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex section-main-stat-item section-main-stat-item-half">
          <div class="stat-label">
            <p>
              <span class="text-bold">仍住院檢查個案</span>
            </p>
            <h3 class="color-purple">
              {{ govInfoDailyStat[govInfoDailyStat.length - 1][4] }}
              <span v-if="govInfoDailyStat[govInfoDailyStat.length - 1][4] - govInfoDailyStat[govInfoDailyStat.length - 2][4] > 0" class="small color-pink">
                ▲{{ govInfoDailyStat[govInfoDailyStat.length - 1][4] - govInfoDailyStat[govInfoDailyStat.length - 2][4] }}
              </span>
              <span v-else-if="govInfoDailyStat[govInfoDailyStat.length - 1][4] - govInfoDailyStat[govInfoDailyStat.length - 2][4] < 0" class="small color-green">
                ▼{{ govInfoDailyStat[govInfoDailyStat.length - 2][4] - govInfoDailyStat[govInfoDailyStat.length - 1][4] }}
              </span>
            </h3>
          </div>
        </div>

        <div class="d-flex section-main-stat-item section-main-stat-item-half">
          <div class="stat-label">
            <p>
              <span class="text-bold">出院</span>
            </p>
            <h3 class="color-purple">
              {{ govInfoDailyStat[govInfoDailyStat.length - 1][7] }}
              <span v-if="govInfoDailyStat[govInfoDailyStat.length - 1][7] - govInfoDailyStat[govInfoDailyStat.length - 2][7] > 0" class="small color-pink">
                ▲{{ govInfoDailyStat[govInfoDailyStat.length - 1][7] - govInfoDailyStat[govInfoDailyStat.length - 2][7] }}
              </span>
              <span v-else-if="govInfoDailyStat[govInfoDailyStat.length - 1][7] - govInfoDailyStat[govInfoDailyStat.length - 2][7] < 0" class="small color-green">
                ▼{{ govInfoDailyStat[govInfoDailyStat.length - 2][7] - govInfoDailyStat[govInfoDailyStat.length - 1][7] }}
              </span>
            </h3>
          </div>
        </div>

        <div class="section-main-stat-item">
          <div class="stat-label">
            <p>
              <span class="text-bold">確診病人男女比例</span>
            </p>
          </div>
          <div class="ratio-bar-container">
            <div class="male-female-ratio-label">
              <span class="stat-male color-purple text-bold">
                {{ (numberOfMale*100 / govInfoDailyStat[govInfoDailyStat.length - 1][2]).toFixed(1) }}%
              </span>
              <span class="stat-female color-pink text-bold">
                {{ 100 - (numberOfMale*100 / govInfoDailyStat[govInfoDailyStat.length - 1][2]).toFixed(1) }}%
              </span>
              <span class="label-male color-grey small">
                男
              </span>
              <span class="label-female color-grey small">
                女
              </span>
            </div>
            <div class="male-female-ratio-bar">
              <div class="ratio-bar male-bar" :style="{width: (numberOfMale*100 / govInfoDailyStat[govInfoDailyStat.length - 1][2]).toFixed(1) + '%'}" />
            </div>
          </div>
        </div>

        <div class="section-main-stat-item">
          <div class="stat-label">
            <p>
              <span class="text-bold">病源</span>
            </p>
            <p>
              「本地 」 個案指病人過去14日內沒有到過中國大陸、不曾與確診病例緊密接觸，實際病源不明，此處分類包括本地個案密切接觸者。「可能本地 」個案包括可能本地個案的密切接觸者；「輸入 」個案包括輸入個案密切接觸者。
            </p>
          </div>
          <div class="ratio-bar-container">
            <div class="male-female-ratio-label">
              <span class="stat-inland color-purple text-bold">
                {{(infectionCategories['本地個案']*100 / this.govInfoCases.length).toFixed(1)}}%
              </span>
              <span class="stat-overseas color-green text-bold" :style="{left: (infectionCategories['本地個案']*100 / this.govInfoCases.length).toFixed(1) + '%'}">
                {{(infectionCategories['未能確定']*100 / this.govInfoCases.length).toFixed(1)}}%
              </span>
              <span class="stat-unknow color-pink text-bold">
                {{(infectionCategories['輸入個案']*100 / this.govInfoCases.length).toFixed(1)}}%
              </span>
              <span class="label-inland color-grey small">
                本地
              </span>
              <span class="label-oversea color-grey small" :style="{left: (infectionCategories['本地個案']*100 / this.govInfoCases.length).toFixed(1) + '%'}">
                可能本地
              </span>
              <span class="label-unknown color-grey small">
                輸入
              </span>
            </div>
            <div class="male-female-ratio-bar">
              <div class="ratio-bar inland-bar" :style="{width: ((infectionCategories['本地個案'] + infectionCategories['未能確定'])*100 / this.govInfoCases.length).toFixed(1) + '%'}" />
              <div class="ratio-bar oversears-bar" :style="{width: (infectionCategories['本地個案']*100 / this.govInfoCases.length).toFixed(2) + '%'}" />
            </div>
          </div>
        </div>

        <div class="section-main-stat-item section-main-stat-item">
          <div class="stat-label">
            <p>
              <span class="text-bold">確診個案住宅或到訪大廈所在地區</span>
            </p>
            <p class="small">
              綜合過去14天內曾有確診個案居住過的住宅大廈、曾有確診個案於發病前兩天起到訪過的大廈、超過一宗確診個案在潛伏期或發病到到訪過的非住宅大廈名單，以下列出五個涉事大廈最多的地區。
            </p>
          </div>
          <div class="districts">
            <div v-for="(district, n) in infectionDistricts" :key="n" class="d-flex district">
              <label>{{ district[0] }}({{district[1]}})</label>
              <div class="district-bar">
                <div class="district-bar-inner" :style="{width: (district[1]*100/infectionDistricts[0][1]) + '%'}" />
              </div>
            </div>
          </div>
        </div>

        <p>本網資料源自衛生防護中心，每日更新一次，增幅／減幅顯示與前一天數字的比較。</p>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    govInfoCases: {
      type: Array,
      default: () => ({})
    },
    govInfoDailyStat: {
      type: Array,
      default: () => ({})
    },
    govInfoBuildingList: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      infectionCategories: {
        '本地個案': 0,
        '輸入個案': 0,
        '未能確定': 0
      },
      infectionDistricts: {}
    }
  },
  watch: {
    govInfoCases: function() {
      this.infectionCategories = {
        '本地個案': 0,
        '輸入個案': 0,
        '未能確定': 0
      }

      for (let i = 0; i < this.govInfoCases.length; i++) {
        if (this.govInfoCases[i][8] === '本地個案' || this.govInfoCases[i][8] === '輸入個案的密切接觸者' || this.govInfoCases[i][8] === '本地個案的密切接觸者' || this.govInfoCases[i][8] === '本地個案(源頭不明)') {
          this.infectionCategories['本地個案'] += 1
        } else if (this.govInfoCases[i][8] === '輸入個案') {
          this.infectionCategories['輸入個案'] += 1
        } else {
          this.infectionCategories['未能確定'] += 1
        }
      }
    },
    govInfoBuildingList: function() {
      let theList = {}

      for (let i = 0; i < this.govInfoBuildingList.length; i++) {
        if(theList[this.govInfoBuildingList[i][0]]) {
          theList[this.govInfoBuildingList[i][0]] += this.govInfoBuildingList[i][3].split(',').length
        } else {
          theList[this.govInfoBuildingList[i][0]] = 1
        }
      }

      let sortable = [];
      for (let district in theList) {
          sortable.push([district, theList[district]]);
      }

      sortable.sort(function(a, b) {
        return b[1] - a[1];
      })

      this.infectionDistricts = sortable.slice(0, 5)
    }
  },
  computed: {
    numberOfMale () {
      let numberOfMale = 0

      for (let i = 0; i < this.govInfoCases.length; i++) {
        if (this.govInfoCases[i][3] === '男') {
          numberOfMale++
        }
      }

      return numberOfMale
    }
  }
};

</script>

<style lang="scss">
  aside {
    position: fixed;
    height: 100vh;
    width: 280px;
    top: 0;
    left: 0;
    padding: 12px 30px 0 40px;
    overflow: scroll;

    @include media-breakpoint-down(sm) {
      position: relative;
      height: auto;
      width: 100%;
      margin-bottom: 40px;
      padding: 15px 30px 0;
    }

    .header-row {
      margin-bottom: 14px;

      h1 {
        line-height: 1;
        border-radius: 50%;
        margin: 15px 0 0;
        width: 44px;
        height: 44px;
        position: relative;
        overflow: hidden;

        @include media-breakpoint-down(sm) {
          margin: 10px 0 0;
        }

        span {
          display: block;
          height: 0;
          text-indent: -9999px;
        }

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }

      .title {
        position: absolute;
        right: 15px;
        top: 25px;
        opacity: 0.4;
        text-align: right;

        h2,
        p {
          margin: 0;
        }

        p {
          font-size: 12px;
        }
      }
    }

    .updated-date {
      font-size: 12px;
      width: 100%;
    }

    .section-main-stat-item {
      width: 100%;
      margin-bottom: 6px;

      h2 {
        font-size: 44px;
      }

      h2,
      h3,
      p {
        margin: 0;
      }

      .number {
        padding: 0 15px 0 0;
      }

      .stat-label {
        padding: 10px 0 0 0;
      }

      &.section-main-stat-item-half {
        width: 50%;
      }

      .districts {
        margin-top: 16px;

        .district {
          margin: 4px 0;

          label {
            width: 80px;
            float: left;
          }

          .district-bar {
            height: 8px;
            width: calc(100% - 80px);
            float: left;
            margin-top: 6px;

            .district-bar-inner {
              background-color: #1e52a4;
              height: 100%;
            }
          }

          &:after {
            content: '';
            clear: both;
            display: table;
          }
        }
      }

      .ratio-bar-container {
        position: relative;
        padding-top: 24px;
        margin-bottom: 24px;

        .male-female-ratio-label {
          position: absolute;
          top: 2px;
          width: 100%;

          .stat-female,
          .stat-unknow,
          .stat-overseas {
            position: absolute;
            right: 0;
          }

          .label-male,
          .label-inland,
          .label-oversea {
            position: absolute;
            top: 32px;
            left: 0;
          }

          .label-female,
          .label-unknown {
            position: absolute;
            top: 32px;
            right: 0;
          }
        }

        .male-female-ratio-bar {
          height: 8px;
          width: 100%;
          border-radius: 4px;
          background-color: #e73d95;
          overflow: hidden;
          position: relative;

          .ratio-bar {
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }

          .male-bar,
          .oversears-bar {
            background-color: #1e52a4;
          }

          .inland-bar {
            background-color: #7fc379;
          }
        }
      }
    }
  }
</style>