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
        "esri/layers/GraphicsLayer"
      ],
      { css: true }
    ).then(
      ([ArcGISMap, MapView, FeatureLayer, WebMap, Graphic, GraphicsLayer]) => {
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
          zoom: 12
        });

        const featureLayer = new FeatureLayer({
          url:
            "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/ArcGIS/rest/services/Hong_Kong_18_Districts/FeatureServer/0"
        });

        console.log(featureLayer);

        //map.add(featureLayer);

        // Create a point
        // var point = {
        //   type: "point",
        //   longitude: 114.099277,
        //   latitude: 22.350334
        // };

        // var simpleMarkerSymbol = {
        //   type: "simple-marker",
        //   color: [226, 119, 40], // orange
        //   outline: {
        //     color: [255, 255, 255], // white
        //     width: 1
        //   }
        // };

        // var pointGraphic = new Graphic({
        //   geometry: point,
        //   symbol: simpleMarkerSymbol
        // });

        const point = {
          type: "point",
          longitude: 114.099277,
          latitude: 22.350334
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
        // Create popup template
        const popupTemplate = {
          title: "{Name}",
          content:
            "<b>性別:</b> {Gender}<br><b>年齡:</b> {Age}<br><b>住所:</b> {Location}<br> <b>同住家人數字:</b> {NoOfFamilyMember}"
        };

        var pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
          //*** ADD ***//
          attributes: attributes,
          popupTemplate: popupTemplate
        });

        graphicsLayer.add(pointGraphic);

        // const point = {
        //   type: "point",
        //   longitude: -118.80657463861,
        //   latitude: 34.0005930608889
        // };

        // const simpleMarkerSymbol = {
        //   type: "simple-marker",
        //   color: [226, 119, 40], // orange
        //   outline: {
        //     color: [255, 255, 255], // white
        //     width: 1
        //   }
        // };

        // const attributes = {
        //   Name: "My point", // The name of the
        //   Location: " Point Dume State Beach" // The owner of the
        // };
        // // Create popup template
        // const popupTemplate = {
        //   title: "{Name}",
        //   content: "I am located at <b>{Location}</b>."
        // };

        // var pointGraphic = new Graphic({
        //   geometry: point,
        //   symbol: simpleMarkerSymbol,
        //   //*** ADD ***//
        //   attributes: attributes,
        //   popupTemplate: popupTemplate
        // });

        // graphicsLayer.add(pointGraphic);

        // let queryurl =
        //   "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/ArcGIS/rest/services/Hong_Kong_18_Districts/FeatureServer/0/query";

        // let options = {
        //   responseType: "json",
        //   query: {
        //     f: "json",
        //     where: "1=1"
        //   }
        // };
        //       map.layers = [
        //   new FeatureLayer({
        //     portalItem: {
        //       // autocasts as new PortalItem
        //       id: "6784d8300e1b4b08a1b373512786b060"
        //     }
        //   })
        // ];

        // console.log(esriRequest(queryurl, options).then())

        // esriRequest(queryurl, options).then(function(response) {
        //   console.log(response.data);
        // });

        // var trailheadsLayer = new FeatureLayer({
        //   url:
        //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
        // });

        // map.add(trailheadsLayer);

        // // Trails feature layer (lines)
        // var trailsLayer = new FeatureLayer({
        //   url:
        //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
        // });

        // map.add(trailsLayer, 0);

        // // Parks and open spaces (polygons)
        // var parksLayer = new FeatureLayer({
        //   url:
        //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
        // });

        // map.add(parksLayer, 0);

        //Add Clickable Point

        // const point = {
        //   type: "point",
        //   longitude: -118.80657463861,
        //   latitude: 34.0005930608889
        // };

        // const simpleMarkerSymbol = {
        //   type: "simple-marker",
        //   color: [226, 119, 40], // orange
        //   outline: {
        //     color: [255, 255, 255], // white
        //     width: 1
        //   }
        // };

        // const attributes = {
        //   Name: "My point", // The name of the
        //   Location: " Point Dume State Beach" // The owner of the
        // };
        // // Create popup template
        // const popupTemplate = {
        //   title: "{Name}",
        //   content: "I am located at <b>{Location}</b>."
        // };

        // var pointGraphic = new Graphic({
        //   geometry: point,
        //   symbol: simpleMarkerSymbol,
        //   //*** ADD ***//
        //   attributes: attributes,
        //   popupTemplate: popupTemplate
        // });

        // graphicsLayer.add(pointGraphic);

        // //Add Line
        // const simpleLineSymbol = {
        //   type: "simple-line",
        //   color: [226, 119, 40], // orange
        //   width: 2
        // };

        // const polyline = {
        //   type: "polyline",
        //   paths: [
        //     [-118.821527826096, 34.0139576938577],
        //     [-118.814893761649, 34.0080602407843],
        //     [-118.808878330345, 34.0016642996246]
        //   ]
        // };

        // const polylineGraphic = new Graphic({
        //   geometry: polyline,
        //   symbol: simpleLineSymbol
        // });

        // graphicsLayer.add(polylineGraphic);

        // //Add Polygon
        // const polygon = {
        //   type: "polygon",
        //   rings: [
        //     [-118.818984489994, 34.0137559967283],
        //     [-118.806796597377, 34.0215816298725],
        //     [-118.791432890735, 34.0163883241613],
        //     [-118.79596686535, 34.008564864635],
        //     [-118.808558110679, 34.0035027131376]
        //   ]
        // };

        // const simpleFillSymbol = {
        //   type: "simple-fill",
        //   color: [227, 139, 79, 0.8], // orange, opacity 80%
        //   outline: {
        //     color: [255, 255, 255],
        //     width: 1
        //   }
        // };

        // const polygonGraphic = new Graphic({
        //   geometry: polygon,
        //   symbol: simpleFillSymbol
        // });

        // graphicsLayer.add(polygonGraphic);

        // // Add a blue location pin
        // const pictureGraphic = new Graphic({
        //   geometry: {
        //     type: "point",
        //     longitude: -118.80657463861,
        //     latitude: 34.0005930608889
        //   },
        //   symbol: {
        //     type: "picture-marker",
        //     url: "https://developers.arcgis.com/labs/images/bluepin.png",
        //     width: "14px",
        //     height: "26px"
        //   }
        // });

        // graphicsLayer.add(pictureGraphic);

        // // Add text below the pin
        // const textGraphic = new Graphic({
        //   geometry: {
        //     type: "point",
        //     longitude: -118.80657463861,
        //     latitude: 34.0005930608889
        //   },
        //   symbol: {
        //     type: "text",
        //     color: [25, 25, 25],
        //     haloColor: [255, 255, 255],
        //     haloSize: "1px",
        //     text: "This is my location!",
        //     xoffset: 0,
        //     yoffset: -25,
        //     font: {
        //       size: 12
        //     }
        //   }
        // });

        // graphicsLayer.add(textGraphic);
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