<template>
  <div>
    <h4>合魚花長者正打</h4>
    <p>等不山景義記是童金西主麼太雖中排會平聲一色現級營養絕於聲確，體角的四天藝去們此西因型學正情樂英為與，不的知爸分一一</p>
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
      categories: {
        '本地個案': 0,
        '輸入個案': 0,
        '未能確定': 0
      }
    }
  },
  watch: {
    govInfoCases: function() {
      let chart = am4core.create(this.$refs.chartdivring, am4charts.PieChart)

      for (let i = 0; i < this.govInfoCases.length; i++) {
        if (this.govInfoCases[i][8] === '本地個案' || this.govInfoCases[i][8] === '輸入個案的密切接觸者' || this.govInfoCases[i][8] === '本地個案的密切接觸者' || this.govInfoCases[i][8] === '本地個案(源頭不明)') {
          this.categories['本地個案'] += 1
        } else if (this.govInfoCases[i][8] === '輸入個案') {
          this.categories['輸入個案'] += 1
        } else {
          this.categories['未能確定'] += 1
        }
      }

      chart.data = [ {
        "country": "本地個案",
        "litres":  this.categories['本地個案']
      }, {
        "country": "輸入個案",
        "litres":  this.categories['輸入個案']
      }, {
        "country": "未能確定",
        "litres":  this.categories['未能確定']
      }]
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