<template>
  <div class="full-width">
    <app-nav></app-nav>
    <div class="whitespace-top">
      <timeline class="col-sm-4"></timeline>
      <card-detail-view class="col-sm-8"></card-detail-view>
    </div>
  </div>
</template>

<script>
import AppNav from './appNav';
import Timeline from './Timeline';
import CardDetailView from './cardDetailView';

export default {
  name: 'trip',
  components: {
    AppNav,
    Timeline,
    CardDetailView,
  },
  data() {
  },
  methods: {
    addEvent() {
    },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-width {
  margin: 0 100px;
  width: calc(100% - 200px);
}

.whitespace-top {
  margin-top: 50px;
}
</style>
