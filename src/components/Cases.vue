<template>
  <div class="cases-container" :class="{'details-active': popupActive}">
    <div v-for="(cs, n) in cases.slice().reverse()" :key="n" class="d-flex case">
      <div class="case-no">編號 {{ cs[0] }}</div>
      <div class="case-date">{{ cs[2] }}</div>
      <div class="case-gender">{{ cs[3] }}</div>
      <div class="case-age">{{ cs[4] }}歲</div>
      <div class="case-status">{{ cs[6] }}</div>
      <div class="case-nationality flex-fill">{{ cs[7] }}</div>
      <div class="case-more color-purple" @click="showDetails">更多資料</div>
    </div>
    <div class="case-details">
      <img class="icon-close" src="./../assets/icon-close-dark.png" @click="hideDetails">
      <p class="case-number text-bold">個案#54</p>
      <p class="meta">
        <span>性別: 男</span>
        <span>年齡: 54</span>
        <span>確診日期: 2020-02-16</span>
      </p>
      <p>東區尤德夫人那打素醫院</p>
      <p>居於太古城明宮閣高層、無外遊紀錄。他在 2 月 7 日發燒，向私家醫生求診，之後出現咳嗽，2 月 10 日到東區醫院急症室求醫，當時照 X 光片肺部清晰。2 月 13 日患者再向私家醫生覆診， 2 月15 日他再因發燒到該院急症室求醫，當時因出現肺炎病徵，被送到監察病房，隨後證實對新型冠狀病毒初步呈陽性反應，被送到隔離病房進一步檢驗，情況穩定。患者妻子於 2 月 8 日都有流鼻水、咳嗽等病徵，2 月 16 日已安排她入住東區醫院。2 人病發前後都去過筲箕灣一間小型教堂聚會。</p>
      <a href="#">資料來源</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "cases",
  props: {
    cases: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      popupActive: false
    }
  },
  methods: {
    showDetails() {
      this.popupActive = true
    },
    hideDetails() {
      this.popupActive = false
    }
  }
};
</script>

<style lang="scss" scoped>
  .cases-container {
    height: 360px;
    overflow: scroll;

    .case {
      padding: 6px;

      div {
        padding: 0 8px;

        &.case-more {
          cursor: pointer;
        }
      }
      
      &:nth-child(odd) {
        background-color: #F1F1F1;
      }
    }

    .case-details {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 0 30px;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;

      .icon-close {
        cursor: pointer;
        width: 24px;
        position: absolute;
        right: 30px;
        top: 12px;
      }

      .case-number {
        margin-top: 5px;
      }

      .meta {
        span {
          display: inline-block;
          margin-right: 12px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    &.details-active {
      overflow: hidden;

      .case-details {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
</style>