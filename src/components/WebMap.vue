<template>
  <div></div>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  name: "web-map",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/WebMap",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/request"
      ],
      { css: true }
    ).then(
      ([
        ArcGISMap,
        MapView,
        FeatureLayer,
        WebMap,
        Graphic,
        GraphicsLayer,
        esriRequest
      ]) => {
        const map = new ArcGISMap({
          basemap: "topo-vector"
        });

        var webmap = new WebMap({
          portalItem: {
            // autocasts as new PortalItem()
            id: "b1097c3b58044795859921c46a933d11"
          }
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        console.log(webmap);

        this.view = new MapView({
          container: this.$el,
          //map: webmap,
          map: map,
          center: [114.1694, 22.3193],
          // center: [-118.805, 34.027],
          zoom: 11,
          popup: {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false
            }
          }
        });

        const featureLayer = new FeatureLayer({
          url:
            "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/ArcGIS/rest/services/Hong_Kong_18_Districts/FeatureServer/0"
        });

        console.log(featureLayer);

        //map.add(featureLayer);

        const point = {
          type: "point",
          longitude: 114.099277,
          latitude: 22.350334
        };

        const point2 = {
          type: "point",
          longitude: 114.128423,
          latitude: 22.367785
        };

        const simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40], // orange
          outline: {
            color: [255, 255, 255], // white
            width: 1
          }
        };

        const attributes = {
          Name: "個案12", // The name of the
          Location: "青衣長康邨康美樓", // The owner of the
          Gender: "M",
          NoOfFamilyMember: 3,
          Age: 75
        };

        const attributes2 = {
          Name: "個案14", // The name of the
          Location: "葵涌邨綠葵樓", // The owner of the
          Gender: "M",
          NoOfFamilyMember: 1,
          Age: 80
        };

        // Create popup template
        const popupTemplate = {
          title: "{Name}",
          content:
            "<span><b>性別:</b></span> {Gender}<br><b>年齡:</b> {Age}<br><b>住所:</b> {Location}<br> <b>同住家人數字:</b> {NoOfFamilyMember}"
        };


        var pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
          //*** ADD ***//
          attributes: attributes,
          popupTemplate: popupTemplate
        });

        var pointGraphic2 = new Graphic({
          geometry: point2,
          symbol: simpleMarkerSymbol,
          //*** ADD ***//
          attributes: attributes2,
          popupTemplate: popupTemplate
        });

        graphicsLayer.add(pointGraphic);
        graphicsLayer.add(pointGraphic2);

        let url =
          "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/ArcGIS/rest/services/Hong_Kong_18_Districts/FeatureServer/0//query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=";

        let options = {
          responseType: "json",
          query: {
            f: "json",
            where: "1=1"
          }
        };

        esriRequest(url, options).then(response => console.log(response.data));

        // this.view.on("click", event => {
        //   var screenPoint = event.screenPoint;

        //   // the hitTest() checks to see if any graphics in the view
        //   // intersect the given screen point
        //   this.view.hitTest(screenPoint).then(getGraphics);

        //   function getGraphics(response) {
        //     // the topmost graphic from the click location
        //     // and display select attribute values from the
        //     // graphic to the user
        //     console.info(response);
        //   }
        // });

  
      }
    );
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
};
</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 300px;
}
</style>