<template>
  <div>
    <h4>病源</h4>
    <p>衞生防護中心將個案分為6類：<br>
「輸入個案」<br>
「輸入個案的密切接觸者」<br>
「本地個案」<br>
「本地個案的密切接觸者」<br>
「可能本地個案」<br>
「可能本地個案的密切接觸者」</p>
    <div class="ring" ref="chartdivring" />
  </div>
</template>

<script>

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "population",
  props: {
    govInfoCases: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      categories: {}
    }
  },
  watch: {
    govInfoCases: function() {
      let chart = am4core.create(this.$refs.chartdivring, am4charts.PieChart)

      for (let i = 0; i < this.govInfoCases.length; i++) {
        if (this.categories[this.govInfoCases[i][8]]) {
          this.categories[this.govInfoCases[i][8]] += 1
        } else {
          this.categories[this.govInfoCases[i][8]] = 1
        }
      }

      let ringArr = []

      for (let cat of Object.keys(this.categories)) {
        ringArr.push({
          "country": cat,
          "litres": this.categories[cat]
        })
      }

      chart.data = ringArr
      // Set inner radius
      chart.innerRadius = am4core.percent(50);

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      pieSeries.clickable = false
      pieSeries.labels.template.text = ''

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    }
  }
};
</script>

<style lang="scss" scoped>
  .ring {
    height: 300px;
  }
</style>