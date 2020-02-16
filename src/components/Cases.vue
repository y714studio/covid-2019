<template>
  <div class="cases-container">
    <div v-for="(cs, n) in cases.slice().reverse()" :key="n" class="d-flex case">
      <div class="case-no">編號 {{ cs[0] }}</div>
      <div class="case-date">{{ cs[2] }}</div>
      <div class="case-gender">{{ cs[3] }}</div>
      <div class="case-age flex-fill">{{ cs[4] }}歲</div>
      <div class="case-nationality">{{ cs[7] }}</div>
      <div class="case-description flex-fill"></div>
      <div class="case-more">更多資料</div>
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
  mounted() {

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
  }
</style>