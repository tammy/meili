<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import AppNav from './components/AppNav';

export default {
  name: 'app',
  components: { AppNav },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
