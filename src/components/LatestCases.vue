<template>
  <div class="latest-case">
    <h4>最新個案</h4>
    <p class="meta">
      <span>性別: {{ lastestCase[3] }}</span>
      <span>年齡: {{ lastestCase[4] }}</span>
      <span>確診日期: {{ lastestCase[1] }}</span>
    </p>
    <p>{{ lastestCase[5] }}</p>
    <p>{{ lastestCase[10] }}</p>
    <a target="_blank" :href="lastestCase[11]">資料來源</a>
  </div>
</template>

<script>
export default {
  name: "latest-cases",
  props: {
    cases: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      lastestCase: []
    }
  },
  watch: {
    cases: function() {
      this.lastestCase = this.cases[this.cases.length - 1]
    }
  }
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