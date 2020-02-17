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
  watch: {
    govInfoCases: function() {
      let chart = am4core.create(this.$refs.chartdivring, am4charts.PieChart)

      chart.data = [ {
        "country": "Lithuania",
        "litres": 501.9
      }, {
        "country": "Czech Republic",
        "litres": 301.9
      }, {
        "country": "Ireland",
        "litres": 201.1
      }, {
        "country": "Germany",
        "litres": 165.8
      }, {
        "country": "Australia",
        "litres": 139.9
      }, {
        "country": "Austria",
        "litres": 128.3
      }, {
        "country": "UK",
        "litres": 99
      }, {
        "country": "Belgium",
        "litres": 60
      }, {
        "country": "The Netherlands",
        "litres": 50
      }];

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