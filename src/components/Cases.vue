<template>
  <div v-if="cases && cases.length" class="cases-container" :class="{'details-active': popupActive}">
    <table>
      <tr v-for="(cs, n) in cases.slice().reverse()" :key="n" class="case">
        <td class="case-no">編號 {{ cs[0] }}</td>
        <td class="case-date">{{ cs[2] }}</td>
        <td class="case-gender">{{ cs[3] }}</td>
        <td class="case-age">{{ cs[4] }}歲</td>
        <td class="case-status">{{ cs[6] }}</td>
        <td class="case-nationality flex-fill">{{ cs[7] }}</td>
        <td class="case-more color-purple" @click="showDetails(cs[0])">更多資料</td>
      </tr>
    </table>
    <div class="case-details">
      <img class="icon-close" src="./../assets/icon-close-dark.png" @click="hideDetails">
      <p class="case-number text-bold">個案#{{ cases[selectedCase - 1][0] }}</p>
      <p class="meta">
        <span>性別: {{ cases[selectedCase - 1][3] }}</span>
        <span>年齡: {{ cases[selectedCase - 1][4] }}</span>
        <span>發病日期: {{ cases[selectedCase - 1][2] }}</span>
      </p>
      <p>{{ cases[selectedCase - 1][5] }}</p>
      <p>{{ cases[selectedCase - 1][10] }}</p>
      <a v-if="cases[selectedCase - 1][14]" :href="cases[selectedCase - 1][14]">資料來源</a>
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
      popupActive: false,
      selectedCase: 1
    }
  },
  methods: {
    showDetails(id) {
      this.popupActive = true
      this.selectedCase = id
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

    table {
      width: 100%;
      border-collapse:collapse;

      .case {
        padding: 6px;

        td {
          padding: 8px 10px;

          &.case-more {
            cursor: pointer;
          }
        }
        
        &:nth-child(odd) {
          background-color: #F1F1F1;
        }
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
        width: 16px;
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