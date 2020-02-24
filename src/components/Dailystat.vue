<template>
  <div>
    <h4>本港確診個案統計</h4>
    <p>本港於1月23日出現首宗武漢肺炎確診個案，當日累計確診兩例。確診數字隨後按日上升，2月9日錄得單日最大升幅，共有10宗，染疾一家（俗稱「邊爐家族」）懷疑因為在年初二（1月26日）打邊爐聚餐，導致集體感染。</p>
    <div class="daily-stat" ref="chartdiv" />
  </div>
</template>

<script>

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "dailystat",
  props: {
    govInfoDailyStat: {
      type: Array,
      default: () => ({})
    }
  },
  watch: {
    govInfoDailyStat: function(newVal) {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)

      let data = []

      for (let i = 0; i < newVal.length; i++) {
        data.push({
          "date": new Date(this.govInfoDailyStat[i][0].split('/')[2], this.govInfoDailyStat[i][0].split('/')[1] - 1, this.govInfoDailyStat[i][0].split('/')[0]),
          "value": this.govInfoDailyStat[i][6],
          "value2": this.govInfoDailyStat[i][4],
          "value3": this.govInfoDailyStat[i][2]
        })
      }

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

      createSeries("value", "死亡人數");
      createSeries("value2", "仍住院檢查個案");
      createSeries("value3", "感染人數");

      chart.legend = new am4charts.Legend();
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.maxTooltipDistance = 0;

      this.chart = chart
    }
  }
};
</script>

<style lang="scss">
  .daily-stat {
    height: 300px;
  }
</style>