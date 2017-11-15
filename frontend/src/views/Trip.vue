<template>
  <div class="full-width">
    <app-nav></app-nav>
    <input type="text" class="text-center title textbox" v-model="tripName" placeholder="The best trip ever!"/>
    <div class="whitespace-top">
      <timeline class="col-sm-5"></timeline>
      <card-detail-view class="col-sm-7"></card-detail-view>
    </div>
  </div>
</template>

<script>
import Timeline from '../components/Timeline';
import AppNav from '../components/appNav';
import CardDetailView from '../components/cardDetailView';

export default {
  name: 'trip',
  components: {
    AppNav,
    Timeline,
    CardDetailView,
  },
  computed: {
    tripName() {
      return this.$store.state.trip.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-width {
  padding: 0 30px;
  width: 100%;
}

.whitespace-top {
  margin-top: 50px;
}

.textbox {
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  width: calc(100% - 25px);
  border: none;
  font-size: 18px;
  min-height: 20px;
}

.title {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
}
</style>
