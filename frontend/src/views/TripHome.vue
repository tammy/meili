<template>
  <div class="full-width">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNav from '../components/AppNav';

export default {
  name: 'home',
  components: { AppNav },
};
</script>

<style scoped>
</style>
