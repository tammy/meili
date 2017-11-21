<template>
  <div class="full-width">
    <!-- Section for all trips -->
    <div class="whitespace-top">
      <div v-for="trip in tripsList">
          <div class="col-xs-3 box">
            <div class="item" v-on:click="goToTrip(trip.id)">
            <img class="photo" v-bind:class="{ 'default-picture': !trip.picture }" :src="trip.picture"/>
            {{ trip.name }}
            </div>
          </div>
      </div>
      <div class="col-xs-3 box">
        <div class="item add hidden-hover" v-on:click="addTrip()">
          <div class="glyphicon glyphicon-plus"></div>
          Your next adventure!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trips-list',
  data() {
    return {
      defaultPicture: '',
    };
  },
  computed: {
    tripsList() {
      this.$store.dispatch('getTripsList');
      return this.$store.state.tripsList;
    },
  },
  methods: {
    goToTrip(tripID) {
      this.$router.push({
        name: 'TripDetail',
        params: { id: tripID },
      });
    },
    addTrip() {
      console.log('new trip');
      // TODO: open modal?
    },
  },
};
</script>

<style scoped>
.full-width {
  padding: 0 30px;
  width: 100%;
}

.photo {
  height: 85%;
  width: calc(100% - 10px);
  margin-bottom: 20px;
  border: 1px solid #bce8f1;
}

.item {
  margin: 10px 0;
  padding: 20px;
  height: 400px;
  color: #31708f;
  background-color: transparent;
  border: 1px solid #bce8f1;
  cursor: pointer;
}

.item:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

.hidden-hover {
  border: none;
  color: transparent;
}

.hidden-hover:hover {
  color: green;
  border: 1px solid green;
}

.glyphicon-plus {
  margin: 20% 0;
  font-size: 20px;
}

.box {
  font-size: 13pt;
  font-weight: 500;
}

/* Source: http://lea.verou.me/css3patterns/#madras */
.default-picture {
  background-color: #bce8f1;
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 35px, 
    rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px);
  border-color: #bce8f1;
}
</style>
