<template>
  <div class="latest-case">
    <h4>最新個案</h4>
    <p class="meta">
      <span>性別: 男</span>
      <span>年齡: 54</span>
      <span>確診日期: 2020-02-16</span>
    </p>
    <p>東區尤德夫人那打素醫院</p>
    <p>居於太古城明宮閣高層、無外遊紀錄。他在 2 月 7 日發燒，向私家醫生求診，之後出現咳嗽，2 月 10 日到東區醫院急症室求醫，當時照 X 光片肺部清晰。2 月 13 日患者再向私家醫生覆診， 2 月15 日他再因發燒到該院急症室求醫，當時因出現肺炎病徵，被送到監察病房，隨後證實對新型冠狀病毒初步呈陽性反應，被送到隔離病房進一步檢驗，情況穩定。患者妻子於 2 月 8 日都有流鼻水、咳嗽等病徵，2 月 16 日已安排她入住東區醫院。2 人病發前後都去過筲箕灣一間小型教堂聚會。</p>
    <a href="#">資料來源</a>
  </div>
</template>

<script>
export default {
  name: "latest-cases"
};
</script>

<style lang="scss" scoped>
  .latest-case {
    opacity: 1;

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
</style>