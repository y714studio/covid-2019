<template>
  <div class="population" ref="chartdiv" />
</template>

<script>

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "population",
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)

    let data = [{
      "date": new Date(2020, 0, 15),
      "value": 1,
      "value2": 16,
      "value3": 39
    },
    {
      "date": new Date(2020, 0, 16),
      "value": 4,
      "value2": 22,
      "value3": 57
    },
    {
      "date": new Date(2020, 0, 17),
      "value": 6,
      "value2": 27,
      "value3": 60
    },
    {
      "date": new Date(2020, 0, 18),
      "value": 7,
      "value2": 40,
      "value3": 88
    },
    {
      "date": new Date(2020, 0, 19),
      "value": 11,
      "value2": 44,
      "value3": 90
    }]

    chart.data = data

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35

    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 2;
      
      // Set up tooltip
      series.adapter.add("tooltipText", function() {
        var text = "[bold]{dateX}[/]\n"
        chart.series.each(function(item) {
          text += "[" + item.stroke.hex + "]●[/] " + item.name + ": {" + item.dataFields.valueY + "}\n";
        });
        return text;
      });
      
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#fff");
      series.tooltip.label.fill = am4core.color("#00");
      
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color("#fff");
      bullet.circle.strokeWidth = 2;
      
      return series;
    }

    createSeries("value", "確診人數");
    createSeries("value2", "排除感染個案");
    createSeries("value3", "符合呈報準則個案");

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 0;

    this.chart = chart
  }
};
</script>

<style lang="scss">
  .population {
    height: 300px;
  }
</style>