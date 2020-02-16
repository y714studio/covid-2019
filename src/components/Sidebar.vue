<template>
  <aside>
    <section class="section-main-stat">
      <div class="row">
        <div class="d-flex section-main-stat-item">
          <div class="number">
            <h2 class="color-purple">{{ govInfoDailyStat[govInfoDailyStat.length - 1][6] }}</h2>
          </div>
          <div class="stat-label">
            <p>
              <span class="text-bold">人死亡</span>
            </p>
          </div>
        </div>

        <div class="d-flex section-main-stat-item">
          <div class="number">
            <h2 class="color-purple">{{ govInfoDailyStat[govInfoDailyStat.length - 1][2] }}</h2>
          </div>
          <div class="stat-label">
            <p>
              <span class="text-bold">人感染</span><br>
              <span class="small color-grey">3人情況危殆</span>
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
            </h3>
          </div>
        </div>

        <div class="d-flex section-main-stat-item section-main-stat-item-half">
          <div class="stat-label">
            <p>
              <span class="text-bold">排除感染個案</span>
            </p>
            <h3 class="color-purple">
              {{ govInfoDailyStat[govInfoDailyStat.length - 1][3] }}
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
            </h3>
          </div>
        </div>

        <div class="d-flex section-main-stat-item section-main-stat-item-half">
          <div class="stat-label">
            <p>
              <span class="text-bold">符合呈報準則個案</span>
            </p>
            <h3 class="color-purple">
              {{ govInfoDailyStat[govInfoDailyStat.length - 1][5] }}
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
                {{ (numberOfMale*100 / govInfoDailyStat[govInfoDailyStat.length - 1][2]).toFixed(2) }}%
              </span>
              <span class="stat-female color-pink text-bold">
                {{ 100 - (numberOfMale*100 / govInfoDailyStat[govInfoDailyStat.length - 1][2]).toFixed(2) }}%
              </span>
              <span class="label-male color-grey small">
                男
              </span>
              <span class="label-female color-grey small">
                女
              </span>
            </div>
            <div class="male-female-ratio-bar">
              <div class="ratio-bar male-bar" style="width: 66.4%;" />
            </div>
          </div>
        </div>

        <div class="section-main-stat-item">
          <div class="stat-label">
            <p>
              <span class="text-bold">感染地方</span>
            </p>
          </div>
          <div class="ratio-bar-container">
            <div class="male-female-ratio-label">
              <span class="stat-overseas color-purple text-bold">
                77.9%
              </span>
              <span class="stat-unknow color-pink text-bold">
                7.1%
              </span>
              <span class="label-overseas color-grey small">
                境外
              </span>
              <span class="label-unknown color-grey small">
                不明
              </span>
            </div>
            <div class="male-female-ratio-bar">
              <div class="ratio-bar inland-bar" style="width: 92.9%;" />
              <div class="ratio-bar oversears-bar" style="width: 77.9%;" />
            </div>
          </div>
        </div>

        <div class="section-main-stat-item section-main-stat-item">
          <div class="stat-label">
            <p>
              <span class="text-bold">檢疫人士居住地區</span>
            </p>
          </div>
          <div class="districts">
            <div class="d-flex district">
              <label>元朗</label>
              <div class="district-bar">
                <div class="district-bar-inner" style="width: 100%;" />
              </div>
            </div>

            <div class="d-flex district">
              <label>將軍澳</label>
              <div class="district-bar">
                <div class="district-bar-inner" style="width: 80%;" />
              </div>
            </div>

            <div class="d-flex district">
              <label>北區</label>
              <div class="district-bar">
                <div class="district-bar-inner" style="width: 74%;" />
              </div>
            </div>

            <div class="d-flex district">
              <label>荃灣</label>
              <div class="district-bar">
                <div class="district-bar-inner" style="width: 72%;" />
              </div>
            </div>

            <div class="d-flex district">
              <label>黃大仙</label>
              <div class="district-bar">
                <div class="district-bar-inner" style="width: 43%;" />
              </div>
            </div>
          </div>
        </div>
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
    padding: 15px 30px 0 40px;

    @include media-breakpoint-down(sm) {
      position: relative;
      height: auto;
      width: 100%;
      margin-bottom: 40px;
    }

    .section-main-stat-item {
      width: 100%;
      margin-bottom: 6px;

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
              background-color: #c2c2c2;
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
          .stat-unknow {
            position: absolute;
            right: 0;
          }

          .label-male,
          .label-overseas {
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
          background-color: #ee71a9;
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
            background-color: rgb(55, 52, 144);
          }

          .inland-bar {
            background-color: #7fc379;
          }
        }
      }
    }
  }
</style>