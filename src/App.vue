<template>
  <div id="app" class="page-wars vue-cli plugin-bootstrap plugin-arcgis">
    <div class="dashboard-container">
      <sidebar />
      <div class="container-fluid">
        <div class="row">

          <section class="col-lg-12">
            <div class="section-inner" style="background: #eee;">
              <web-map />
            </div>
          </section>

          <section class="col-md-12 col-lg-8">
            <div class="section-inner">
              <population />
            </div>
          </section>

          <section class="col-md-12 col-lg-4">
            <div class="section-inner">
              <ring />
            </div>
          </section>

          <section class="col-md-12">
            <div class="section-inner">
              <img src="./assets/some-graph.jpeg">
            </div>
          </section>

          <section class="col-md-12 col-lg-4">
            <div class="section-inner" style="background: #eee; min-height: 260px;" />
          </section>

          <section class="col-md-6 col-lg-4">
            <div class="section-inner" style="background: #eee; min-height: 130px;" />
          </section>

          <section class="col-md-6 col-lg-4">
            <div class="section-inner" style="background: #eee; min-height: 200px;" />
          </section>

          <section class="col-md-6 col-lg-4">
            <div class="section-inner" style="background: #eee; min-height: 200px;" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebMap from './components/WebMap.vue'
import Sidebar from './components/Sidebar.vue'
import Population from './components/Population.vue'
import Ring from './components/Ring.vue'

export default {
  name: 'app',
  components: {
    WebMap,
    Sidebar,
    Population,
    Ring
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .dashboard-container {
    padding-left: 280px;

    .section-inner {
      margin-bottom: 15px;
    }
  }
}
</style>
