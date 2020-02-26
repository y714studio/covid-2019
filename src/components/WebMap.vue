<template>
  <div></div>
</template>

<script>
import { loadModules } from "esri-loader";
import * as mapstyle from "../assets/map-style.json";

export default {
  name: "web-map",
  props: {
    cases: {
      type: Array,
      default: () => ({})
    }
  },
  watch: {
    cases: function() {
      if (this.cases.length && this.cases[0].length > 10) {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/Basemap",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/request",
            "esri/layers/VectorTileLayer"
          ],
          { css: true }
        ).then(
          ([
            ArcGISMap,
            MapView,
            Basemap,
            Graphic,
            GraphicsLayer,
            esriRequest,
            VectorTileLayer
          ]) => {
            const basemap = new Basemap({
              baseLayers: [
                new VectorTileLayer({
                  style: mapstyle.default
                })
              ]
            });

            const map = new ArcGISMap({
              basemap: basemap
            });

            // var webmap = new WebMap({
            //   portalItem: {
            //     // autocasts as new PortalItem()
            //     id: "b1097c3b58044795859921c46a933d11"
            //   }
            // });

            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            this.view = new MapView({
              container: this.$el,
              //map: webmap,
              map: map,
              center: [114.1694, 22.3193],
              // center: [-118.805, 34.027],
              zoom: 10,
              popup: {
                dockEnabled: true,
                dockOptions: {
                  buttonEnabled: false,
                  breakpoint: false
                }
              }
            });

            // const featureLayer = new FeatureLayer({
            //   url:
            //     "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/ArcGIS/rest/services/Hong_Kong_18_Districts/FeatureServer/0"
            // });

            //map.add(featureLayer);

            // if(this.sanityInfoCases){
            //   const point = {};

            // }

            //         this.sanityInfoCases.map(case =>
            //   console.log(case)
            //   // point.longitude = case.lng;
            //   // point.latitude = case.lat;
            // )

            const simpleMarkerSymbol = {
              type: "simple-marker",
              color: [30, 82, 164], // orange
              outline: {
                color: [255, 255, 255], // white
                width: 1
              }
            }

            let popupTemplate = {}, pointGraphic = {}, casePoints = []

            for (let i = 0; i < this.cases.length; i++) {
              if (this.cases[i][11].length) {
                casePoints = JSON.parse(this.cases[i][11])

                for(let y = 0; y < casePoints.length; y++) {
                  popupTemplate = {
                    title: "{Name}",
                    content: "<span><b>更多資料:</b></span> {Description}"
                  }

                  pointGraphic = new Graphic({
                    geometry: {
                      type: "point",
                      longitude: casePoints[y].lng,
                      latitude: casePoints[y].lat
                    },
                    symbol: simpleMarkerSymbol,
                    attributes: {
                      Name: casePoints[y].label,
                      Description: this.cases[i].description
                    },
                    popupTemplate: popupTemplate
                  })

                  console.log(pointGraphic)

                  graphicsLayer.add(pointGraphic);
                }
              }
            }

            let url =
              "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/ArcGIS/rest/services/Hong_Kong_18_Districts/FeatureServer/0//query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=";

            let options = {
              responseType: "json",
              query: {
                f: "json",
                where: "1=1"
              }
            };

            esriRequest(url, options);

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
      }
    }
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
  height: 380px;
}
</style>