<template>
  <div class="full-width">
    <input type="text" class="text-center title textbox" v-model="trip.name" placeholder="The best trip ever!"/>
    <div class="whitespace-top">
      <timeline :trip="trip" class="col-sm-5"></timeline>
      <card-detail-view class="col-sm-7"></card-detail-view>
    </div>
  </div>
</template>

<script>
import timeline from '../components/timeline';
import cardDetailView from '../components/cardDetailView';

export default {
  name: 'trip-detail',
  components: {
    timeline,
    cardDetailView,
  },
  computed: {
    trip() {
      return this.$store.state.trip;
    },
    tripID() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.$store.dispatch('getTrip', this.tripID);
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
