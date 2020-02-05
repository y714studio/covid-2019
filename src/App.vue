<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <web-map />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import WebMap from './components/WebMap.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    WebMap
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  img {
    opacity: 1;

    @include media-breakpoint-down(sm) {
      opacity: 0.8;
    }
  }
}
</style>
