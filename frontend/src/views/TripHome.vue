<template>
  <div class="full-width">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import appNav from '../components/appNav';

export default {
  name: 'home',
  components: { appNav },
};
</script>

<style scoped>
</style>
